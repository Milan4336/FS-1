import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLike } from '../store';
import { Heart, MessageSquare, Share2, MoreHorizontal } from 'lucide-react';

const PostCard = ({ post }) => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const isLiked = post.likes.includes(user?._id);

    return (
        <Card className="glass-card mb-4 border-0 shadow-lg animate-fade">
            <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center gap-2">
                        <div className="bg-primary rounded-circle p-2 text-white d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px', fontWeight: '800' }}>
                            {post.author?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h6 className="mb-0 fw-bold">{post.author?.name}</h6>
                            <small className="text-muted opacity-75">
                                {new Date(post.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </small>
                        </div>
                    </div>
                    <Button variant="link" className="text-muted"><MoreHorizontal size={20} /></Button>
                </div>

                <Card.Text className="fs-5 mb-4 px-1" style={{ whiteSpace: 'pre-wrap' }}>
                    {post.content}
                </Card.Text>

                <div className="d-flex align-items-center gap-4 py-2 border-top border-secondary opacity-75">
                    <Button 
                        variant="link" 
                        className={`d-flex align-items-center gap-2 p-0 text-decoration-none transition-transform ${isLiked ? 'text-secondary' : 'text-muted'}`}
                        onClick={() => dispatch(toggleLike(post._id))}
                    >
                        <Heart size={20} fill={isLiked ? 'var(--secondary)' : 'none'} className={isLiked ? 'animate-pulse' : ''} />
                        <span className="fw-bold">{post.likes.length}</span>
                    </Button>
                    <div className="d-flex align-items-center gap-2 text-muted">
                        <MessageSquare size={20} />
                        <span className="fw-bold">{post.comments?.length || 0}</span>
                    </div>
                    <div className="text-muted ms-auto">
                        <Share2 size={20} />
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default PostCard;
