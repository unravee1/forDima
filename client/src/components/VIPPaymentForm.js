import React, { useState } from 'react';

const VIPPaymentForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/payment/upgrade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({ userId: userInfo._id, amount: 250 }),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Successfully upgraded to VIP');
        // Оновіть інформацію користувача в localStorage
        const updatedUser = { ...userInfo, vipStatus: true, balance: data.balance };
        localStorage.setItem('userInfo', JSON.stringify(updatedUser));
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to upgrade to VIP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">VIP Membership Payment</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <button
            type="submit"
            className="btn-primary bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out w-full"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Pay 250 UAH'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VIPPaymentForm;

