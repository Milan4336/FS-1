import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import api from '../api/axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { ShoppingCart } from 'lucide-react';

const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products');
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load products from server.');
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return (
        <div className="text-center mt-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3 text-muted">Retrieving Cyber-Goods...</p>
        </div>
    );

    if (error) return (
        <Container className="mt-5">
            <Alert variant="danger">
                <Alert.Heading>Connection Error</Alert.Heading>
                <p>{error}</p>
            </Alert>
        </Container>
    );

    return (
        <Container className="animate-fade">
            <h2 className="mb-4 fw-bold">Experiment 7.1 & 7.2: <span style={{ color: 'var(--secondary)' }}>Product Hub</span></h2>
            <Row>
                {products.map(product => (
                    <Col key={product.id} md={6} lg={4} className="mb-4">
                        <Card className="glass-card shadow-lg h-100 border-0 overflow-hidden">
                            <Card.Img variant="top" src={product.image} style={{ height: '200px', objectFit: 'cover', opacity: 0.8 }} />
                            <Card.Body className="p-4 d-flex flex-column">
                                <Card.Title className="fw-bold mb-1">{product.name}</Card.Title>
                                <Card.Text className="text-muted h3 mt-2">${product.price}</Card.Text>
                                <Button 
                                    variant="indigo" 
                                    className="mt-auto d-flex align-items-center justify-content-center gap-2"
                                    onClick={() => dispatch(addToCart(product))}
                                >
                                    <ShoppingCart size={18} /> Add to Cart
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Catalog;
