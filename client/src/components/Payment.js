// src/components/Payment.js
import React, { useState } from 'react';

const Payment = () => {
    const [amount, setAmount] = useState('');

    const handlePayment = async () => {
        const response = await fetch('/api/vip/pay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`
            },
            body: JSON.stringify({ amount })
        });
        const data = await response.json();
        console.log(data);
    };

    return (
        <div className="payment-page">
            <h2>Make a Payment</h2>
            <div className="mb-4">
                <label>Amount</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    className="input"
                />
            </div>
            <button onClick={handlePayment} className="btn-primary">
                Pay
            </button>
        </div>
    );
};

export default Payment;
