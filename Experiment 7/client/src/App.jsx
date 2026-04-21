import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Catalog from './pages/Catalog';
import Cart from './components/Cart';
import Chat from './components/Chat';
import mockSocket from './api/mockSocket';

const socket = mockSocket;


function App() {
    const [showCart, setShowCart] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState(0);

    useEffect(() => {
        socket.on('user_count', (count) => {
            setOnlineUsers(count);
        });

        return () => socket.off('user_count');
    }, []);

    return (
        <div className="App pb-5">
            <div className="background-blobs">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
            </div>
            <Header 
                onlineUsers={onlineUsers} 
                onShowCart={() => setShowCart(true)} 
                onShowChat={() => setShowChat(true)} 
            />
            
            <Catalog />
            
            <Cart show={showCart} onHide={() => setShowCart(false)} />
            
            <Chat 
                show={showChat} 
                onHide={() => setShowChat(false)} 
                socket={socket} 
            />

            {/* Sub 7.1/7.3 Achievement Banner */}
            <div className="container mt-5">
                <div className="glass-card p-4 text-center">
                    <h5 className="mb-0 text-muted">🚀 Experiment 7: React + Express + Axios + Redux + Socket.io Active</h5>
                </div>
            </div>
        </div>
    );
}

export default App;
