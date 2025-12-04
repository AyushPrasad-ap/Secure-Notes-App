import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            return alert("Please enter both email and password.");
        }

        try {
            setLoading(true);
            const res = await API.post("/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            // on success navigate (component will unmount)
            navigate("/dashboard");
        } catch (err) {
            const api = err.response?.data;

            if (api?.errors?.length) {
                alert(api.errors.map(e => e.msg).join("\n"));
                return;
            }

            if (api?.msg) {
                alert(api.msg);
                return;
            }

            alert("Login failed. Please try again.");
        } finally {
            setLoading(false);
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
                    <h2 className="mb-3">Welcome back</h2>
                    <p className="mb-4">Sign in to access your secure notes.</p>

                    <form onSubmit={submit}>
                        <div className="mb-3">
                            <input
                                className="form-control"
                                placeholder="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                disabled={loading}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                disabled={loading}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    Logging in...
                                </>
                            ) : (
                                'Login'
                            )}
                        </button>
                    </form>

                    <div className="mt-3 text-center">
                        Don't have an account? <Link to="/register">Register</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
