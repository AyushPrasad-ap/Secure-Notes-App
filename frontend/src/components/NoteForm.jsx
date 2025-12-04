import React, { useState } from 'react';
import API from '../api/api';

export default function NoteForm({ onCreate }) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        if (!title) return alert('Title required');
        try {
            await API.post('/notes', { title, body });
            setTitle(''); setBody('');
            if (onCreate) onCreate();
        } catch (err) {
            alert(err.response?.data?.msg || 'Could not create note');
        }
    };

    return (
        <form onSubmit={submit} className="mb-5">
            <div className="input-group mb-3">
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Note title" className="form-control" />
                <button className="btn btn-primary">Add</button>
            </div>
            <textarea value={body} onChange={e => setBody(e.target.value)} className="form-control mt-2" placeholder="Details" style={{ height: "120px" }} />
        </form>
    );
}
