import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, ShieldCheck, User as UserIcon, LogOut, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const { user, logout } = useAuth();
    const [apiFeedback, setApiFeedback] = useState(null);

    const testEndpoint = async (url) => {
        try {
            const res = await axios.get(url);
            setApiFeedback({ success: true, message: res.data.message });
        } catch (err) {
            setApiFeedback({ success: false, message: err.response?.data?.message || 'API Access Blocked.' });
        }
    };

    return (
        <Container className="mt-5 animate-fade">
            <header className="d-flex justify-content-between align-items-center mb-5 nav-glass p-4 rounded-4 shadow">
                <div className="d-flex align-items-center gap-3">
                    <div className="bg-primary p-2 rounded-3 text-white">
                        <Terminal size={24} />
                    </div>
                    <div>
                        <h4 className="fw-bold mb-0">Secure <span style={{ color: 'var(--primary)' }}>Hub</span></h4>
                        <small className="text-muted opacity-75">Authenticated Session Active</small>
                    </div>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <span className={`role-badge role-${user.role}`}>{user.role}</span>
                    <Button variant="outline-danger" onClick={logout} className="d-flex align-items-center gap-2">
                        <LogOut size={16} /> Logout
                    </Button>
                </div>
            </header>

            <Row className="g-4">
                <Col md={12}>
                    <div className="glass-card mb-4">
                        <h2 className="fw-bold mb-1">Welcome, {user.name}</h2>
                        <p className="text-muted">Experiment 8.2 & 8.3: Role-Based Routing & API Enforcement</p>
                    </div>
                </Col>

                {/* API Tester (Sub 8.3) */}
                <Col md={12}>
                    {apiFeedback && (
                        <Alert 
                            variant={apiFeedback.success ? 'success' : 'danger'} 
                            onClose={() => setApiFeedback(null)} 
                            dismissible
                            className="glass-card border-0 animate-fade"
                        >
                            <div className="d-flex align-items-center gap-2 h5 mb-0">
                                <ShieldCheck size={20} /> {apiFeedback.message}
                            </div>
                        </Alert>
                    )}
                </Col>

                {/* Role Specific Cards */}
                <Col md={4}>
                    <Card className="glass-card text-center h-100 border-0">
                        <Card.Body className="d-flex flex-column align-items-center py-5">
                            <UserIcon size={48} className="text-primary mb-4" />
                            <h4 className="fw-bold mb-3">User Profile</h4>
                            <p className="text-muted small mb-4">Basic authenticated data access.</p>
                            <Button variant="indigo" className="w-100 mt-auto" onClick={() => testEndpoint('http://localhost:3008/api/auth/user-data')}>
                                Test User API
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="glass-card text-center h-100 border-0">
                        <Card.Body className="d-flex flex-column align-items-center py-5">
                            <LayoutDashboard size={48} className="text-info mb-4" />
                            <h4 className="fw-bold mb-3">Mod Panel</h4>
                            <p className="text-muted small mb-4">Requires Moderator or Admin clearance.</p>
                            <div className="d-flex flex-column gap-2 w-100 mt-auto">
                                <Link to="/moderator" className="btn btn-indigo">Visit Panel</Link>
                                <Button variant="outline-light" onClick={() => testEndpoint('http://localhost:3008/api/auth/moderator-panel')}>
                                    Test Mod API
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="glass-card text-center h-100 border-0">
                        <Card.Body className="d-flex flex-column align-items-center py-5">
                            <ShieldCheck size={48} className="text-secondary mb-4" />
                            <h4 className="fw-bold mb-3">Admin Dashboard</h4>
                            <p className="text-muted small mb-4">Highest security tier only.</p>
                            <div className="d-flex flex-column gap-2 w-100 mt-auto">
                                <Link to="/admin" className="btn btn-indigo">Open Vault</Link>
                                <Button variant="outline-light" onClick={() => testEndpoint('http://localhost:3008/api/auth/admin-dashboard')}>
                                    Test Admin API
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
