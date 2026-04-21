import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { ShieldAlert, Home as HomeIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Unauthorised = () => {
    const navigate = useNavigate();
    return (
        <Container className="d-flex flex-column justify-content-center align-items-center vh-100 text-center animate-fade">
            <div className="glass-card py-5 px-4" style={{ maxWidth: '500px' }}>
                <ShieldAlert size={80} className="text-danger mb-4" />
                <h1 className="fw-bold mb-3">Access Denied</h1>
                <p className="text-muted mb-4">
                    Your security clearance does not permit access to this module. 
                    Please return to the main hub or contact an administrator.
                </p>
                <Button variant="indigo" onClick={() => navigate('/')} className="d-flex align-items-center gap-2 mx-auto">
                    <HomeIcon size={18} /> Return Home
                </Button>
            </div>
        </Container>
    );
};

export default Unauthorised;
