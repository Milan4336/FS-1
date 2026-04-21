import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './store';
import ProtectedRoute from './guards/ProtectedRoute';
import Login from './pages/Login';
import Feed from './pages/Feed';

function App() {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    return (
        <Router>
            <div className="background-blobs">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
            </div>

            <Routes>
                <Route path="/login" element={<Login />} />
                
                <Route path="/" element={
                    <ProtectedRoute>
                        <Feed />
                    </ProtectedRoute>
                } />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
