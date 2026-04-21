import React from 'react';
import { Navbar, Container, Nav, Badge, Button } from 'react-bootstrap';
import { ShoppingCart, MessageSquare, Users } from 'lucide-react';
import { useSelector } from 'react-redux';

const Header = ({ onlineUsers, onShowCart, onShowChat }) => {
    const cartItems = useSelector(state => state.cart.items);
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <Navbar expand="lg" className="nav-glass mb-4" sticky="top" variant="dark">
            <Container>
                <Navbar.Brand href="#home" className="fw-bold">
                    React<span style={{ color: 'var(--primary)' }}>Hub</span>
                </Navbar.Brand>
                
                <Nav className="ms-auto flex-row gap-3">
                    <Nav.Item className="d-flex align-items-center text-muted small me-2">
                        <Users size={16} className="me-1" />
                        <span className="fw-bold">{onlineUsers} Online</span>
                    </Nav.Item>
                    
                    <Button variant="outline-light" className="position-relative" onClick={onShowCart}>
                        <ShoppingCart size={20} />
                        {cartCount > 0 && (
                            <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle badge-pink">
                                {cartCount}
                            </Badge>
                        )}
                    </Button>

                    <Button variant="indigo" onClick={onShowChat}>
                        <MessageSquare size={20} />
                    </Button>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
