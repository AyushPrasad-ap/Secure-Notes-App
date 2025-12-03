// src/pages/Login.jsx
import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        if (!email || !password) return alert('enter email and password');
        try {
            const res = await API.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            alert(err.response?.data?.msg || 'Login failed');
        }
    };

    return (
        <div className="center-screen">
            <div className="glass auth-card">
                <div className="p-4">
                    <h2 className="mb-3">Welcome back</h2>
                    <p className="text-muted mb-4">Sign in to access your secure notes</p>

                    <form onSubmit={submit}>
                        <div className="mb-3">
                            <input className="form-control" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                        </div>

                        <button className="btn btn-primary w-100">Login</button>
                    </form>

                    <div className="mt-3 text-center text-muted">
                        Don't have an account? <Link to="/register">Register</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
