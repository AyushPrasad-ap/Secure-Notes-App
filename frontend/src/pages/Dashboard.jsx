import React, { useState, useEffect } from "react";
import API from "../api/api";
import NoteForm from "../components/NoteForm";
import { Trash } from "lucide-react";

export default function Dashboard() {
    const [profile, setProfile] = useState(null);
    const [notes, setNotes] = useState([]);
    const [q, setQ] = useState("");

    const fetchProfile = async () => {
        try {
            const res = await API.get("/profile");
            setProfile(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchNotes = async (query = "") => {
        try {
            const res = await API.get("/notes", { params: { q: query } });
            setNotes(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchProfile();
        fetchNotes();
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => fetchNotes(q), 300);
        return () => clearTimeout(timeout);
    }, [q]);

    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    const removeNote = async (id) => {
        if (!confirm("Delete this note?")) return;
        await API.delete(`/notes/${id}`);
        fetchNotes(q);
    };

    return (
        <div className="container py-4">

            {/* Top Navbar */}
            <nav className="navbar navbar-light bg-light rounded shadow-sm px-3 mb-4">
                <span className="navbar-brand fw-semibold">
                    Secure Notes
                </span>

                <div className="d-flex align-items-center">
                    <span className="me-3 fw-medium">👋 {profile?.name}</span>
                    <button className="btn btn-outline-danger btn-sm" onClick={logout}>
                        Logout
                    </button>
                </div>
            </nav>

            {/* Add Note + Search */}
            <div className="mb-4">
                <NoteForm onCreate={() => fetchNotes(q)} />

                <input
                    className="form-control mt-3"
                    placeholder="Search notes..."
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                />
            </div>

            {/* Notes Section */}
            <div className="row g-3">
                {notes.length === 0 && (
                    <p className="text-muted text-center mt-5">No notes yet. Create one!</p>
                )}

                {notes.map((n) => (
                    <div key={n._id} className="col-sm-6 col-md-4 col-lg-3">
                        <div className="card shadow-sm border-0 h-100">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title fw-bold">{n.title}</h5>
                                <p className="card-text text-muted flex-grow-1">
                                    {n.body || "No content"}
                                </p>

                                {/* Tags */}
                                <div className="mb-2">
                                    {n.tags?.map((t, i) => (
                                        <span key={i} className="badge bg-secondary me-1">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                {/* Buttons */}
                                <div className="d-flex justify-content-between">
                                    {/* Future: Edit Modal */}
                                    {/* <button className="btn btn-sm btn-outline-primary">Edit</button> */}

                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => removeNote(n._id)}
                                    >
                                        <Trash size={16} className="me-1" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
