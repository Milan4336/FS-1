const express = require('express');
const Redis = require('ioredis');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config({ override: true });

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

const PORT = 3001;

// Redis Connection
let redis;
if (process.env.REDIS_URL && process.env.REDIS_URL !== 'PASTE_YOUR_REDIS_URL_HERE') {
    redis = new Redis(process.env.REDIS_URL, {
        connectTimeout: 5000,
        commandTimeout: 5000,
        maxRetriesPerRequest: 1
    });
    
    redis.on('connect', () => console.log('--- Connecting to Redis... ---'));
    redis.on('ready', () => console.log('--- Redis Ready ---'));
    redis.on('error', (err) => console.error('!!! Redis Error:', err.message));
} else {
    console.warn('!!! Redis URL missing. Concurrent booking will use in-memory simulation !!!');
    // Fallback Mock for local development without credentials
    const mockStorage = new Map();
    redis = {
        get: async (key) => mockStorage.get(key),
        set: async (key, val, mode, type, time) => {
            if (mode === 'NX' && mockStorage.has(key)) return null;
            mockStorage.set(key, val);
            if (time) setTimeout(() => mockStorage.delete(key), time * 1000);
            return 'OK';
        },
        del: async (key) => mockStorage.delete(key),
        keys: async (pattern) => Array.from(mockStorage.keys()).filter(k => k.startsWith(pattern.replace('*', '')))
    };
}

// --- Sub-Experiment 4.2: Playing Card API ---
// Array storage for card collection
let playingCards = [
    { id: uuidv4(), name: 'Ace of Spades', suit: 'Spades', value: 11 },
    { id: uuidv4(), name: 'Jack of Hearts', suit: 'Hearts', value: 10 }
];

app.get('/api/cards', (req, res) => res.json(playingCards));

app.post('/api/cards', (req, res) => {
    const { name, suit, value } = req.body;
    const newCard = { id: uuidv4(), name, suit, value };
    playingCards.push(newCard);
    res.status(201).json(newCard);
});

app.delete('/api/cards/:id', (req, res) => {
    playingCards = playingCards.filter(c => c.id !== req.params.id);
    res.status(204).send();
});

// --- Sub-Experiment 4.3: Concurrent Ticket Booking ---
// We use Redis "SET NX EX" for atomic seat locking
app.post('/api/booking/lock', async (req, res) => {
    try {
        const { seatId, userId } = req.body;
        const lockKey = `lock:seat:${seatId}`;

        // NX = Set if Not Exists, EX = Expire in 60 seconds
        const acquired = await redis.set(lockKey, userId, 'NX', 'EX', 60);

        if (acquired === 'OK') {
            // Track the locked seat in a set
            await redis.sadd('current_locks', seatId);
            res.json({ success: true, message: `Seat ${seatId} locked for 60s` });
        } else {
            res.status(409).json({ 
                success: false, 
                message: `Seat already being booked by another user.` 
            });
        }
    } catch (err) {
        console.error('Locking error:', err);
        res.status(500).json({ success: false, message: "Redis operation failed" });
    }
});

app.post('/api/booking/confirm', async (req, res) => {
    try {
        const { seatId, userId } = req.body;
        const lockKey = `lock:seat:${seatId}`;
        const holder = await redis.get(lockKey);

        if (holder === userId) {
            // Confirm the booking
            await redis.del(lockKey);
            await redis.srem('current_locks', seatId);
            await redis.sadd('booked_seats_list', seatId);
            res.json({ success: true, message: `Seat ${seatId} successfully booked!` });
        } else {
            res.status(403).json({ success: false, message: "Lock expired or not owned by you." });
        }
    } catch (err) {
        console.error('Confirmation error:', err);
        res.status(500).json({ success: false, message: "Redis operation failed" });
    }
});

app.get('/api/booking/status', async (req, res) => {
    try {
        // Use SMEMBERS instead of KEYS for durability and speed
        const lockedSeats = await redis.smembers('current_locks');
        const bookedSeats = await redis.smembers('booked_seats_list');
        
        // Clean up expired locks from the set (optional but good practice)
        const validLocks = [];
        for (const seatId of lockedSeats) {
            const stillActive = await redis.get(`lock:seat:${seatId}`);
            if (stillActive) {
                validLocks.push(seatId);
            } else {
                await redis.srem('current_locks', seatId);
            }
        }

        res.json({ 
            lockedSeats: validLocks,
            bookedSeats: bookedSeats
        });
    } catch (err) {
        console.error('Status error:', err);
        res.status(500).json({ success: false, message: "Could not fetch seat status" });
    }
});

app.post('/api/booking/unbook', async (req, res) => {
    try {
        const { seatId } = req.body;
        // Remove from the booked list
        const removed = await redis.srem('booked_seats_list', seatId);
        if (removed) {
            res.json({ success: true, message: `Seat ${seatId} is now available again.` });
        } else {
            res.status(404).json({ success: false, message: "Seat was not booked." });
        }
    } catch (err) {
        console.error('Unbook error:', err);
        res.status(500).json({ success: false, message: "Redis operation failed" });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
