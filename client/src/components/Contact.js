// src/components/Contact.js
import React, { useState } from 'react';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, message })
        });
        const data = await response.json();
        console.log(data);
    };

    return (
        <div className="contact-page">
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="input"
                    />
                </div>
                <div className="mb-4">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input"
                    />
                </div>
                <div className="mb-4">
                    <label>Message</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        className="textarea"
                    />
                </div>
                <button type="submit" className="btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Contact;
