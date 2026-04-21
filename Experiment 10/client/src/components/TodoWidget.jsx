import React, { useState } from 'react';
import { Form, Button, ListGroup, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo } from '../store';
import { Plus, Check, Trash2, ListChecks } from 'lucide-react';

const TodoWidget = () => {
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        dispatch(addTodo(text.trim()));
        setText('');
    };

    return (
        <div className="glass-card p-4 h-100">
            <div className="d-flex align-items-center gap-2 mb-4">
                <ListChecks className="text-secondary" size={24} />
                <h4 className="fw-bold mb-0">Mission <span style={{ color: 'var(--secondary)' }}>Control</span></h4>
            </div>

            <Form onSubmit={handleSubmit} className="mb-4">
                <InputGroup>
                    <Form.Control 
                        className="auth-input"
                        placeholder="Assign new objective..." 
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <Button variant="indigo" type="submit">
                        <Plus size={20} />
                    </Button>
                </InputGroup>
            </Form>

            <ListGroup variant="flush" className="bg-transparent">
                {user?.todos?.map(todo => (
                    <ListGroup.Item 
                        key={todo._id} 
                        className="bg-transparent border-0 d-flex justify-content-between align-items-center px-0 mb-2 animate-fade"
                    >
                        <div 
                            className={`d-flex align-items-center gap-3 cursor-pointer ${todo.completed ? 'opacity-50 text-decoration-line-through' : ''}`}
                            onClick={() => dispatch(toggleTodo(todo._id))}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className={`p-1 rounded-circle border ${todo.completed ? 'bg-success border-success' : 'border-secondary'}`}>
                                <Check size={12} className={todo.completed ? 'text-white' : 'text-transparent'} />
                            </div>
                            <span>{todo.text}</span>
                        </div>
                        <Button 
                            variant="link" 
                            className="text-muted p-0 hover-danger"
                            onClick={() => dispatch(deleteTodo(todo._id))}
                        >
                            <Trash2 size={16} />
                        </Button>
                    </ListGroup.Item>
                ))}
                {user?.todos?.length === 0 && <p className="text-muted text-center py-4 small">No objectives assigned.</p>}
            </ListGroup>
        </div>
    );
};

export default TodoWidget;
