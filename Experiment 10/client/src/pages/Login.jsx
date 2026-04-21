import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Card, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, ShieldCheck } from 'lucide-react';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const dispatch = useDispatch();
    const { user, error } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (user) {
            const from = location.state?.from?.pathname || '/';
            navigate(from, { replace: true });
        }
    }, [user, navigate, location]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(credentials));
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100 animate-fade">
            <Card className="glass-card shadow-2xl w-100" style={{ maxWidth: '420px', borderRadius: '40px' }}>
                <div className="text-center mb-5">
                    <div className="bg-primary d-inline-flex p-3 rounded-4 text-white mb-4 shadow-primary">
                        <ShieldCheck size={32} />
                    </div>
                    <h2 className="fw-bold fs-1">Nexus<span style={{ color: 'var(--primary)' }}>Hub</span></h2>
                    <p className="text-muted">Enter the secure social dimension.</p>
                </div>

                {error && <Alert variant="danger" className="py-2 small text-center">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label className="small fw-bold text-muted px-2">IDENTITY (EMAIL)</Form.Label>
                        <div className="position-relative">
                            <Mail className="position-absolute translate-middle-y top-50 ms-3 text-muted" size={18} />
                            <Form.Control 
                                type="email" 
                                className="auth-input ps-5"
                                placeholder="commander@nexus.io"
                                value={credentials.email}
                                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                                required
                            />
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label className="small fw-bold text-muted px-2">SECURITY KEY</Form.Label>
                        <div className="position-relative">
                            <Lock className="position-absolute translate-middle-y top-50 ms-3 text-muted" size={18} />
                            <Form.Control 
                                type="password" 
                                className="auth-input ps-5"
                                placeholder="••••••••"
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                required
                            />
                        </div>
                    </Form.Group>

                    <Button variant="indigo" type="submit" className="w-100 py-3 fs-5 fw-bold shadow-lg">
                        Access Nexus
                    </Button>

                    <div className="text-center mt-4">
                        <div className="p-3 rounded-3 mb-2" style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)' }}>
                            <p className="small fw-bold mb-1" style={{ color: 'var(--primary)' }}>🎭 DEMO ACCOUNTS</p>
                            <p className="small text-muted mb-1"><code>shepard@nexus.io</code> — Admin</p>
                            <p className="small text-muted mb-1"><code>garrus@nexus.io</code> — User</p>
                            <p className="small text-muted mb-0">Password: <code>demo123</code></p>
                        </div>
                        <p className="small text-muted opacity-50">Data persists in your browser via localStorage.</p>
                    </div>
                </Form>
            </Card>
        </Container>
    );
};

export default Login;
