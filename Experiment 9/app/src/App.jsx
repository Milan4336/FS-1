import React from 'react';
import { Container, Row, Col, Card, Badge, Table } from 'react-bootstrap';
import { Package as Box, GitBranch, Cloud, Server, ShieldCheck, Activity } from 'lucide-react';

function App() {
  return (
    <div className="App min-vh-100 pb-5">
      <div className="background-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <Container className="mt-5 animate-fade text-white">
        <header className="d-flex justify-content-between align-items-center mb-5 nav-glass p-4 rounded-4 shadow">
          <div className="d-flex align-items-center gap-3">
            <div className="bg-primary p-2 rounded-3 text-white">
              <Cloud size={24} />
            </div>
            <div>
              <h4 className="fw-bold mb-0">DevOps<span style={{ color: 'var(--primary)' }}>Hub</span></h4>
              <small className="text-muted opacity-75">Cloud Architecture Laboratory</small>
            </div>
          </div>
          <Badge bg="success" className="p-2 px-3 rounded-pill d-flex align-items-center gap-1">
            <ShieldCheck size={14} /> Production Ready
          </Badge>
        </header>

        <h2 className="fw-bold mb-4">Experiment 9: <span style={{ color: 'var(--secondary)' }}>Deployment Pipeline</span></h2>

        <Row className="g-4 mb-5">
          <Col md={4}>
            <Card className="glass-card h-100 border-0">
              <Card.Body className="text-center p-4">
                <Box size={48} className="text-primary mb-3" />
                <h5 className="fw-bold">Optimized Docker</h5>
                <p className="text-muted small">Multi-stage build reduced image from 900MB to ~40MB using Alpine Nginx.</p>
                <div className="d-flex justify-content-center gap-2 mt-3">
                  <Badge className="bg-dark border border-secondary text-secondary">Alpine</Badge>
                  <Badge className="bg-dark border border-secondary text-secondary">Nginx</Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="glass-card h-100 border-0">
              <Card.Body className="text-center p-4">
                <GitBranch size={48} className="text-info mb-3" />
                <h5 className="fw-bold">CI/CD Pipeline</h5>
                <p className="text-muted small">GitHub Actions automated linting, testing, and deployment notifications.</p>
                <div className="d-flex justify-content-center gap-2 mt-3">
                  <Badge className="bg-dark border border-secondary text-secondary">Actions</Badge>
                  <Badge className="bg-dark border border-secondary text-secondary">YAML</Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="glass-card h-100 border-0">
              <Card.Body className="text-center p-4">
                <Server size={48} className="text-secondary mb-3" />
                <h5 className="fw-bold">AWS ECS & ALB</h5>
                <p className="text-muted small">Terraform IaC for Fargate orchestration and Application Load Balancing.</p>
                <div className="d-flex justify-content-center gap-2 mt-3">
                  <Badge className="bg-dark border border-secondary text-secondary">ECS</Badge>
                  <Badge className="bg-dark border border-secondary text-secondary">Terraform</Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <section className="glass-card p-4">
          <div className="d-flex align-items-center gap-2 mb-4">
            <Activity size={20} className="text-primary" />
            <h5 className="fw-bold mb-0">System Deployment Metrics</h5>
          </div>
          <Table responsive variant="dark" className="bg-transparent mb-0">
            <thead>
              <tr>
                <th className="border-secondary text-muted small">ENVIRONMENT</th>
                <th className="border-secondary text-muted small">STATUS</th>
                <th className="border-secondary text-muted small">IMAGE SIZE</th>
                <th className="border-secondary text-muted small">LOAD BALANCER</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-secondary">Production</td>
                <td className="border-secondary text-success fw-bold">Scaffolding...</td>
                <td className="border-secondary">~42 MB</td>
                <td className="border-secondary text-info">AWS ALB Ready</td>
              </tr>
            </tbody>
          </Table>
        </section>
      </Container>
    </div>
  );
}

export default App;
