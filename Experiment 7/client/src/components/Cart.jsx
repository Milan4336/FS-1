import React from 'react';
import { Offcanvas, ListGroup, Button, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/cartSlice';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

const Cart = ({ show, onHide }) => {
    const items = useSelector(state => state.cart.items);
    const dispatch = useDispatch();
    const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <Offcanvas show={show} onHide={onHide} placement="end" className="bg-dark text-white">
            <Offcanvas.Header closeButton closeVariant="white">
                <Offcanvas.Title className="fw-bold d-flex align-items-center gap-2">
                    <ShoppingBag /> Your Cart
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {items.length === 0 ? (
                    <div className="text-center mt-5 text-muted">
                        <p>Your cart is empty.</p>
                    </div>
                ) : (
                    <>
                        <ListGroup variant="flush">
                            {items.map(item => (
                                <ListGroup.Item key={item.id} className="bg-transparent text-white border-bottom border-secondary py-3 px-0">
                                    <div className="d-flex gap-3">
                                        <Image src={item.image} rounded style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                                        <div className="flex-grow-1">
                                            <div className="fw-bold">{item.name}</div>
                                            <div className="text-muted small">${item.price}</div>
                                            <div className="d-flex align-items-center gap-2 mt-2">
                                                <Button size="sm" variant="outline-light" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}><Minus size={12} /></Button>
                                                <span>{item.quantity}</span>
                                                <Button size="sm" variant="outline-light" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}><Plus size={12} /></Button>
                                                <Button size="sm" variant="outline-danger" className="ms-auto" onClick={() => dispatch(removeFromCart(item.id))}><Trash2 size={12} /></Button>
                                            </div>
                                        </div>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                        <div className="mt-4 pt-3 border-top">
                            <div className="d-flex justify-content-between h4 fw-bold">
                                <span>Total:</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <Button variant="indigo" className="w-100 mt-3 py-2 fw-bold">Proceed to Checkout</Button>
                        </div>
                    </>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default Cart;
