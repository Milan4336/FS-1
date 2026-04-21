import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, AlertCircle } from 'lucide-react';

const Login = () => {
    const { login } = useAuth();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState(null);
    
    const navigate = useNavigate();
    const location = useLocation();

    // Validation Logic (Sub 8.1)
    const validate = () => {
        const newErrors = {};
        const emailRegex = /^\S+@\S+\.\S+$/;
        
        if (!credentials.email) newErrors.email = 'Email restricted to valid formats.';
        else if (!emailRegex.test(credentials.email)) newErrors.email = 'Please enter a valid banking email.';
        
        if (!credentials.password) newErrors.password = 'Password is required.';
        else if (credentials.password.length < 6) newErrors.password = 'Password must be at least 6 characters.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError(null);
        
        if (!validate()) return;

        try {
            const res = await login(credentials.email, credentials.password);
            if (res.success) {
                const from = location.state?.from?.pathname || '/';
                navigate(from, { replace: true });
            } else {
                setApiError(res.message);
            }
        } catch (err) {
            setApiError('Authentication failed.');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="glass-card w-100" style={{ maxWidth: '450px' }}>
                <h2 className="text-center mb-4 fw-bold">Secure <span style={{ color: 'var(--primary)' }}>Access</span></h2>
                
                {apiError && <Alert variant="danger" className="py-2 small"><AlertCircle size={16} /> {apiError}</Alert>}
                
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label className="small fw-bold text-muted">EMAIL ADDRESS</Form.Label>
                        <div className="position-relative">
                            <Mail className="position-absolute translate-middle-y top-50 ms-3 text-muted" size={18} />
                            <Form.Control 
                                type="email" 
                                className={`auth-input ps-5 ${errors.email ? 'border-danger' : ''}`}
                                placeholder="name@company.com"
                                value={credentials.email}
                                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                            />
                        </div>
                        {errors.email && <div className="text-danger small mt-1">{errors.email}</div>}
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label className="small fw-bold text-muted">PASSWORD</Form.Label>
                        <div className="position-relative">
                            <Lock className="position-absolute translate-middle-y top-50 ms-3 text-muted" size={18} />
                            <Form.Control 
                                type="password" 
                                className={`auth-input ps-5 ${errors.password ? 'border-danger' : ''}`}
                                placeholder="••••••••"
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            />
                        </div>
                        {errors.password && <div className="text-danger small mt-1">{errors.password}</div>}
                    </Form.Group>

                    <Button variant="indigo" type="submit" className="w-100 py-2">
                        Verify Identity
                    </Button>
                    
                    <div className="mt-4 p-3 rounded-3 text-center" style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)' }}>
                        <p className="small fw-bold mb-1" style={{ color: 'var(--primary)' }}>🎭 DEMO ACCOUNTS</p>
                        <p className="small text-muted mb-1"><code>admin@nexus.io</code> — Admin</p>
                        <p className="small text-muted mb-1"><code>editor@nexus.io</code> — Editor</p>
                        <p className="small text-muted mb-0"><code>user@nexus.io</code> — User &nbsp;|&nbsp; Password: <code>demo123</code></p>
                    </div>
                </Form>
            </Card>
        </Container>
    );
};

export default Login;
