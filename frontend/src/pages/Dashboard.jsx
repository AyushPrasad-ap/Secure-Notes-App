import React, { useState, useEffect } from 'react';
import API from '../api/api';
import NoteForm from '../components/NoteForm';

export default function Dashboard() {
    const [profile, setProfile] = useState(null);
    const [notes, setNotes] = useState([]);
    const [q, setQ] = useState('');

    const fetchProfile = async () => {
        try {
            const res = await API.get('/profile');
            setProfile(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchNotes = async (query = '') => {
        try {
            const res = await API.get('/notes', { params: { q: query } });
            setNotes(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => { fetchProfile(); fetchNotes(); }, []);

    useEffect(() => {
        const timeout = setTimeout(() => fetchNotes(q), 300);
        return () => clearTimeout(timeout);
    }, [q]);

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    const removeNote = async (id) => {
        if (!confirm('Delete this note?')) return;
        await API.delete(`/notes/${id}`);
        fetchNotes(q);
    };

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center">
                <h4>Welcome, {profile?.name}</h4>
                <div>
                    <button className="btn btn-secondary me-2" onClick={() => alert(JSON.stringify(profile, null, 2))}>Profile</button>
                    <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-md-6">
                    <NoteForm onCreate={() => fetchNotes(q)} />
                    <input className="form-control mb-3" placeholder="Search notes..." value={q} onChange={e => setQ(e.target.value)} />
                    {notes.length === 0 && <p>No notes yet</p>}
                    {notes.map(n => (
                        <div className="card mb-2" key={n._id}>
                            <div className="card-body">
                                <h5 className="card-title">{n.title}</h5>
                                <p className="card-text">{n.body}</p>
                                <div>
                                    {n.tags?.map((t, i) => <span key={i} className="badge bg-light text-dark me-1">{t}</span>)}
                                </div>
                                <div className="mt-2">
                                    <button className="btn btn-sm btn-danger" onClick={() => removeNote(n._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-md-6">
                    <h5>Notes JSON (debug)</h5>
                    <pre style={{ maxHeight: 400, overflow: 'auto' }}>{JSON.stringify(notes, null, 2)}</pre>
                </div>
            </div>
        </div>
    );
}
