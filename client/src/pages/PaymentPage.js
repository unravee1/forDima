import React, { useState } from 'react';
import axios from 'axios';

const BuyVip = () => {
  const [message, setMessage] = useState('');

  const handleBuyVip = async () => {
    try {
      const userId = 'USER_ID'; // Замініть на ID користувача
      const response = await axios.post('/api/users/update-vip-status', { userId });
      setMessage(response.data);
    } catch (error) {
      setMessage('Error updating VIP status');
    }
  };

  return (
    <div>
      <h2>Buy VIP</h2>
      <button onClick={handleBuyVip}>Buy VIP for 250 money</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BuyVip;
