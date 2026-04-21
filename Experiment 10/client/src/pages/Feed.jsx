import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, createPost, logoutUser } from '../store';
import PostCard from '../components/PostCard';
import TodoWidget from '../components/TodoWidget';
import { Send, LogOut, Terminal, Layout, UserCircle } from 'lucide-react';

const Feed = () => {
    const dispatch = useDispatch();
    const { items, loading } = useSelector(state => state.posts);
    const { user } = useSelector(state => state.auth);
    const [content, setContent] = useState('');

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const handlePostSubmit = (e) => {
        e.preventDefault();
        if (!content.trim()) return;
        dispatch(createPost(content.trim()));
        setContent('');
    };

    return (
        <Container className="py-5 animate-fade">
            {/* Top Navigation */}
            <header className="d-flex justify-content-between align-items-center mb-5 nav-glass p-4 rounded-4 shadow">
                <div className="d-flex align-items-center gap-3">
                    <div className="bg-primary p-2 rounded-3 text-white">
                        <Terminal size={24} />
                    </div>
                    <div className="d-none d-md-block">
                        <h4 className="fw-bold mb-0">Nexus<span style={{ color: 'var(--primary)' }}>Social</span></h4>
                        <small className="text-muted opacity-75">Authenticated Secure Zone</small>
                    </div>
                </div>
                
                <div className="d-flex align-items-center gap-4">
                    <div className="d-flex align-items-center gap-2">
                        <span className={`role-badge role-${user?.role}`}>{user?.role}</span>
                        <h6 className="mb-0 fw-bold d-none d-lg-block">{user?.name}</h6>
                    </div>
                    <Button variant="outline-danger" onClick={() => dispatch(logoutUser())} className="d-flex align-items-center gap-2 rounded-3">
                        <LogOut size={16} /> <span className="d-none d-md-inline">Logout</span>
                    </Button>
                </div>
            </header>

            <Row className="g-4">
                {/* Left Sidebar: Controls */}
                <Col lg={4}>
                    <div className="sticky-top" style={{ top: '120px' }}>
                        <TodoWidget />
                        
                        <div className="glass-card mt-4 p-4 text-center">
                            <h5 className="fw-bold mb-3">Nexus Metrics</h5>
                            <Row className="g-2 text-center">
                                <Col xs={6}>
                                    <div className="p-3 bg-dark bg-opacity-25 rounded-3">
                                        <h3 className="mb-0 fw-bold">{items.length}</h3>
                                        <small className="text-muted">POSTS</small>
                                    </div>
                                </Col>
                                <Col xs={6}>
                                    <div className="p-3 bg-dark bg-opacity-25 rounded-3">
                                        <h3 className="mb-0 fw-bold text-secondary">{user?.todos?.length || 0}</h3>
                                        <small className="text-muted">TASKS</small>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>

                {/* Center: Social Feed */}
                <Col lg={8}>
                    {/* Post Composer */}
                    <div className="glass-card p-4 mb-5 shadow-lg" style={{ borderLeft: '5px solid var(--primary)' }}>
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <Layout size={20} className="text-primary" />
                            <h5 className="fw-bold mb-0">Broadcast Signal</h5>
                        </div>
                        <Form onSubmit={handlePostSubmit}>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                className="auth-input mb-3" 
                                placeholder="What's transmitting in the Nexus?"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                style={{ resize: 'none' }}
                                required
                            />
                            <div className="d-flex justify-content-end">
                                <Button variant="indigo" type="submit" className="d-flex align-items-center gap-2 px-4 py-2">
                                    <Send size={18} /> Transmit
                                </Button>
                            </div>
                        </Form>
                    </div>

                    {/* Posts List */}
                    <div className="social-feed">
                        {loading && <p className="text-center text-muted py-5">Scanning Nexus for signals...</p>}
                        {items.map(post => (
                            <PostCard key={post._id} post={post} />
                        ))}
                        {!loading && items.length === 0 && (
                            <div className="glass-card text-center py-5 opacity-50">
                                <UserCircle size={60} className="mb-3" />
                                <h5>The Nexus is silent.</h5>
                                <p>Be the first to transmit a signal.</p>
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Feed;
