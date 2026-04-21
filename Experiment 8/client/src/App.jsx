import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, RoleGate } from './guards/Guards';
import Login from './pages/Login';
import Home from './pages/Home';
import Unauthorised from './pages/Unauthorised';
import { AdminDashboard, ModeratorPanel } from './pages/Dashboards';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="background-blobs">
                    <div className="blob blob-1"></div>
                    <div className="blob blob-2"></div>
                </div>

                <Routes>
                    {/* Public */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/unauthorised" element={<Unauthorised />} />

                    {/* Authenticated (Protected) */}
                    <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />

                    {/* Role Restricted (Admin Only) */}
                    <Route path="/admin" element={
                        <ProtectedRoute>
                            <RoleGate allowedRoles={['admin']}>
                                <AdminDashboard />
                            </RoleGate>
                        </ProtectedRoute>
                    } />

                    {/* Role Restricted (Mod + Admin) */}
                    <Route path="/moderator" element={
                        <ProtectedRoute>
                            <RoleGate allowedRoles={['moderator', 'admin']}>
                                <ModeratorPanel />
                            </RoleGate>
                        </ProtectedRoute>
                    } />

                    {/* Redirect 404 */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
