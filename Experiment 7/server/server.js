const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "http://localhost:5174"],
        methods: ["GET", "POST"]
    }
});

// Mock Products for Sub 7.1
const products = [
    { id: 1, name: "Indigo Nebula Lamp", price: 59.99, image: "https://images.unsplash.com/photo-1542736667-069246bdf6d7?w=400&h=400&fit=crop" },
    { id: 2, name: "Pink Horizon Keyboard", price: 129.99, image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&h=400&fit=crop" },
    { id: 3, name: "Cyberpunk Desk Pad", price: 34.50, image: "https://images.unsplash.com/photo-1593642532400-2682810df593?w=400&h=400&fit=crop" },
    { id: 4, name: "Glassmorphism Monitor Stand", price: 89.00, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop" }
];

// --- Sub 7.1: REST API ---
app.get('/api/products', (req, res) => {
    // Artificial delay to demonstrate loading state
    setTimeout(() => {
        res.json(products);
    }, 1500);
});

// --- Sub 7.3: Socket.IO Real-time Logic ---
let onlineUsers = 0;

io.on('connection', (socket) => {
    onlineUsers++;
    console.log(`User connected. Total: ${onlineUsers}`);
    
    // Broadcast updated user count to all, and send to the joining socket specifically
    io.emit('user_count', onlineUsers);

    socket.on('send_message', (data) => {
        // Broadcast message to everyone including sender
        io.emit('receive_message', {
            ...data,
            timestamp: new Date().toLocaleTimeString()
        });
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('user_typing', data);
    });

    socket.on('disconnect', () => {
        onlineUsers--;
        io.emit('user_count', onlineUsers);
        console.log(`User disconnected. Total: ${onlineUsers}`);
    });
});

const PORT = 3007;
server.listen(PORT, () => {
    console.log(`\n--- Experiment 7: React Hub Backend ---`);
    console.log(`API running: http://localhost:${PORT}`);
    console.log(`Socket service active`);
    console.log(`---------------------------------------\n`);
});
