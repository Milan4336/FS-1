import React, { useState, useEffect, useRef } from 'react';
import { Offcanvas, Form, Button, ListGroup, Card } from 'react-bootstrap';
import { Send, User as UserIcon } from 'lucide-react';

const Chat = ({ show, onHide, socket }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (!socket) return;

        socket.on('receive_message', (data) => {
            setMessages(prev => [...prev, data]);
        });

        socket.on('user_typing', (data) => {
            setTyping(data.user);
            setTimeout(() => setTyping(null), 3000);
        });

        return () => {
            socket.off('receive_message');
            socket.off('user_typing');
        };
    }, [socket]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        socket.emit('send_message', {
            user: 'You',
            text: input
        });
        setInput('');
    };

    const handleTyping = () => {
        socket.emit('typing', { user: 'An anonymous explorer' });
    };

    return (
        <Offcanvas show={show} onHide={onHide} placement="bottom" style={{ height: '60vh' }} className="bg-dark text-white rounded-top-4">
            <Offcanvas.Header closeButton closeVariant="white">
                <Offcanvas.Title className="fw-bold fs-4">Hub Chat</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="d-flex flex-column p-4">
                <div className="flex-grow-1 overflow-auto mb-3 pr-2" style={{ maxHeight: 'calc(60vh - 150px)' }}>
                    {messages.length === 0 ? (
                        <div className="text-center text-muted mt-4">
                            <p>No messages yet. Start the conversation!</p>
                        </div>
                    ) : (
                        messages.map((m, i) => (
                            <div key={i} className={`mb-3 d-flex ${m.user === 'You' ? 'justify-content-end' : ''}`}>
                                <Card className={`border-0 ${m.user === 'You' ? 'bg-primary text-white' : 'bg-secondary text-white'}`} style={{ maxWidth: '75%', borderRadius: '15px' }}>
                                    <Card.Body className="py-2 px-3">
                                        <div className="small fw-bold mb-1 d-flex align-items-center gap-1">
                                            <UserIcon size={12} /> {m.user} <span className="ms-2 opacity-50" style={{ fontSize: '0.6rem' }}>{m.timestamp}</span>
                                        </div>
                                        <div>{m.text}</div>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))
                    )}
                    <div ref={scrollRef}></div>
                </div>

                <div className="mt-auto">
                    {typing && <div className="text-muted small mb-2 fst-italic animate-pulse">{typing} is typing...</div>}
                    <Form onSubmit={handleSend} className="d-flex gap-2">
                        <Form.Control 
                            type="text" 
                            className="bg-transparent text-white border-secondary rounded-3"
                            placeholder="Type a message..."
                            value={input}
                            onChange={(e) => { setInput(e.target.value); handleTyping(); }}
                        />
                        <Button variant="indigo" type="submit">
                            <Send size={18} />
                        </Button>
                    </Form>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default Chat;
