// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import API from "../api/api";
import NoteForm from "../components/NoteForm";
import { Trash } from "lucide-react";

export default function Dashboard() {
    const [profile, setProfile] = useState(null);
    const [notes, setNotes] = useState([]);
    const [q, setQ] = useState("");
    const [loggingOut, setLoggingOut] = useState(false);


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
        setLoggingOut(true);
        setTimeout(() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }, 600); // small delay to let spinner show
    };


    const removeNote = async (id) => {
        if (!confirm("Delete this note?")) return;
        await API.delete(`/notes/${id}`);
        fetchNotes(q);
    };

    return (
        <div className="app-root">
            <div className="container">

                {/* top glass nav */}
                <div className="glass glass-nav mb-4">
                    <div className="d-flex align-items-center">
                        <img src="logo.png" width={35} alt="logo" />
                        <h5 className="mb-0 ms-2 header-logo-text">Secure Notes</h5>
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="me-2">
                            <strong>
                                {profile?.name
                                    ? profile.name.split(" ")[0].charAt(0).toUpperCase() + profile.name.split(" ")[0].slice(1).toLowerCase()
                                    : "User"}
                            </strong>
                        </div>
                        <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={logout}
                            disabled={loggingOut}
                        >
                            {loggingOut ? (
                                <>
                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    Logging out...
                                </>
                            ) : (
                                "Logout"
                            )}
                        </button>

                    </div>
                </div>

                {/* card containing add + search */}
                <div className="glass mb-4">
                    <NoteForm onCreate={() => fetchNotes(q)} />
                    <input
                        className="form-control mt-3"
                        placeholder="Search notes..."
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                    />
                </div>

                {/* notes grid */}
                <div className="row g-4">
                    {notes.length === 0 && (
                        <div className="col-12">
                            <div className="glass text-center py-5">
                                <p className="mb-0">No notes yet — Create one above!</p>
                            </div>
                        </div>
                    )}

                    {notes.map(n => (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={n._id}>
                            <div className="note-card">
                                <div className="mb-2">
                                    <div className="note-title">{n.title}</div>
                                    <div className="note-body">{n.body || "—"}</div>
                                </div>

                                <div className="mt-auto">
                                    <div className="mb-2">
                                        {n.tags?.map((t, i) => (
                                            <span key={i} className="badge me-1">{t}</span>
                                        ))}
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        {/* left placeholder for future features */}
                                        <div></div>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => removeNote(n._id)}>
                                            <Trash size={14} className="me-1" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
