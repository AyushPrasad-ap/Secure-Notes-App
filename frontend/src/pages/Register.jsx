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
        if (!name || !email || !password)
            return alert('All fields required');

        try {
            const res = await API.post('/auth/register', { name, email, password });
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            const api = err.response?.data;

            if (api?.errors?.length) {
                return alert(api.errors.map(e => e.msg).join("\n"));
            }

            alert(api?.msg || "Registration failed");
        }
    };

    return (
        <div className="center-screen d-flex flex-column ">

            <div className="text-center mb-4 header-logo-text">
                <div className="d-flex justify-content-center align-items-center">
                    <img src="/logo.png" width="35" className="me-2" alt="logo" />
                    <h3 className="mb-0" style={{ color: "white" }}>Secure Notes</h3>
                </div>
            </div>

            <div className="glass auth-card">
                <div className="p-4">
                    <h2 className="mb-3">Create account</h2>
                    <p className="mb-4">Sign up to securely store your notes.</p>

                    <form onSubmit={submit}>
                        <div className="mb-3">
                            <input className="form-control" placeholder="Full name"
                                value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <input className="form-control" placeholder="Email"
                                value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" placeholder="Password"
                                value={password} onChange={e => setPassword(e.target.value)} />
                        </div>

                        <button className="btn btn-primary w-100">Register</button>
                    </form>

                    <div className="mt-3 text-center">
                        Already have an account? <Link to="/login">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
