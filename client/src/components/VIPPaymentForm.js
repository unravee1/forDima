import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';

const VIPPaymentForm = () => {
  const [balance, setBalance] = useState(1200); // Приклад початкового балансу користувача
  const [error, setError] = useState(null);
  const vipPrice = 250; // Ціна абонементу
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const handlePayment = async () => {
    if (balance >= vipPrice) {
      try {
        const response = await fetch('http://localhost:5000/api/payments/upgrade-vip', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ userId: userInfo._id, amount: vipPrice }),
        });

        const data = await response.json();

        if (response.ok) {
          setBalance(balance - vipPrice);
          alert('Ви успішно придбали VIP абонемент');
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Сталася помилка. Спробуйте ще раз.');
      }
    } else {
      setError('Недостатньо коштів на балансі.');
    }
  };

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Придбати VIP абонемент
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Typography variant="h6">Ваш баланс: {balance} грн</Typography>
        <Typography variant="body1">Ціна VIP абонементу: {vipPrice} грн</Typography>
        <Button
          onClick={handlePayment}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Придбати VIP абонемент
        </Button>
      </Box>
    </Container>
  );
};

export default VIPPaymentForm;
