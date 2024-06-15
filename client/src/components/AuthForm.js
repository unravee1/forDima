import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ type }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        const endpoint = type === 'login' ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('userInfo', JSON.stringify(data));
                navigate('/');
            } else {
                setError(data.message || 'Something went wrong');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('Something went wrong');
        }
    };

    return (
        <div className="auth-form max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">{type === 'login' ? 'Login' : 'Register'}</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={submitHandler}>
                {type === 'register' && (
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="input w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
                        />
                    </div>
                )}
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
                    />
                </div>
                <button type="submit" className="btn-primary w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out">
                    {type === 'login' ? 'Login' : 'Register'}
                </button>
            </form>
        </div>
    );
};

export default AuthForm;
