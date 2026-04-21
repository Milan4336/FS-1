// Mock Socket — replaces Socket.IO with a local event emitter.
// Chat messages are local-only (demo mode). No server required.

const BOT_RESPONSES = [
    "Hey! Nice to see you in the Nexus! 👋",
    "The Indigo Nebula Lamp is amazing, right? 😄",
    "Have you checked out the Redux cart functionality?",
    "The glassmorphism theme is absolutely fire 🔥",
    "Welcome to the Hub! Everything runs in demo mode here.",
    "Try adding items to your cart — Redux state management in action!",
    "This chat is powered by a mock socket. No server needed!",
];

class MockSocket {
    constructor() {
        this._listeners = {};
        // Simulate second user joining after 2s
        setTimeout(() => {
            this._emit('user_count', 2);
        }, 2000);
    }

    on(event, handler) {
        if (!this._listeners[event]) this._listeners[event] = [];
        this._listeners[event].push(handler);
    }

    off(event) {
        delete this._listeners[event];
    }

    _emit(event, data) {
        (this._listeners[event] || []).forEach(fn => fn(data));
    }

    emit(event, data) {
        if (event === 'send_message') {
            // Echo message back immediately (as if from server)
            const msg = { ...data, timestamp: new Date().toLocaleTimeString() };
            setTimeout(() => this._emit('receive_message', msg), 50);

            // Simulate NexusBot typing + reply
            setTimeout(() => {
                this._emit('user_typing', { user: 'NexusBot' });
            }, 900);
            setTimeout(() => {
                const reply = BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)];
                this._emit('receive_message', {
                    user: 'NexusBot',
                    text: reply,
                    timestamp: new Date().toLocaleTimeString()
                });
            }, 2400);
        }
    }
}

const mockSocket = new MockSocket();
export default mockSocket;
