import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) return alert('All fields required');
        try {
            const res = await API.post('/auth/register', { name, email, password });
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            alert(err.response?.data?.msg || 'Registration failed');
        }
    };

    return (
        <div className="container py-5" style={{ maxWidth: 480 }}>
            <h2 className="mb-4">Register</h2>
            <form onSubmit={submit}>
                <div className="mb-3"><input className="form-control" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} /></div>
                <div className="mb-3"><input className="form-control" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /></div>
                <div className="mb-3"><input type="password" className="form-control" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /></div>
                <button className="btn btn-primary w-100">Register</button>
            </form>
            <div className="mt-3">Already registered? <Link to="/login">Login</Link></div>
        </div>
    );
}
