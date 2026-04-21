import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { ShieldCheck, ArrowLeft, Database, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard = () => {
    const navigate = useNavigate();
    return (
        <Container className="mt-5 animate-fade">
            <div className="glass-card shadow-lg py-5 px-4 text-center">
                <ShieldCheck size={80} className="text-secondary mb-4" />
                <h1 className="fw-bold mb-4">Master Security Console</h1>
                <p className="text-muted fs-5 mb-5 mx-auto" style={{ maxWidth: '600px' }}>
                    Welcome, Administrator. You have full oversight of the Experiment 8 RBAC Hub. 
                    System audits and database logs are accessible below.
                </p>
                <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
                    <Button variant="outline-light" className="d-flex align-items-center gap-2"><Database size={18} /> User Database</Button>
                    <Button variant="outline-light" className="d-flex align-items-center gap-2"><Activity size={18} /> System Monitoring</Button>
                </div>
                <Button variant="indigo" onClick={() => navigate('/')} className="d-flex align-items-center gap-2 mx-auto">
                    <ArrowLeft size={18} /> Return to Hub
                </Button>
            </div>
        </Container>
    );
};

export const ModeratorPanel = () => {
    const navigate = useNavigate();
    return (
        <Container className="mt-5 animate-fade">
            <div className="glass-card shadow-lg py-5 px-4 text-center">
                <Activity size={80} className="text-info mb-4" />
                <h1 className="fw-bold mb-4">Moderation Panel</h1>
                <p className="text-muted fs-5 mb-5 mx-auto" style={{ maxWidth: '600px' }}>
                    Access granted. You are authorised to monitor traffic and review security reports for this experiment.
                </p>
                <Button variant="indigo" onClick={() => navigate('/')} className="d-flex align-items-center gap-2 mx-auto">
                    <ArrowLeft size={18} /> Return to Hub
                </Button>
            </div>
        </Container>
    );
};
