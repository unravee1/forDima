import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, TextField, Button, Avatar, Paper } from '@mui/material';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [photo, setPhoto] = useState('');
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState(null);
  const vipPrice = 250; // Ціна абонементу
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userInfo._id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data);
        setName(data.name);
        setEmail(data.email);
        setAge(data.age);
        setWeight(data.weight);
        setPhoto(data.photo);
        setBalance(data.balance); // Оновлення балансу користувача
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Сталася помилка. Спробуйте ще раз.');
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userInfo._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ name, email, age, weight, photo }),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data);
        setEditing(false);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Сталася помилка. Спробуйте ще раз.');
    }
  };

  const handlePurchaseVip = async () => {
    if (balance >= vipPrice) {
      try {
        const response = await fetch('http://localhost:5000/api/users/upgrade-vip', {
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
          fetchUserDetails(); // Оновити інформацію про користувача
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

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!user) {
    return <Typography>Завантаження...</Typography>;
  }

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Профіль
        </Typography>
        <Paper sx={{ p: 2, mt: 2 }}>
          <Avatar alt={name} src={photo} sx={{ width: 100, height: 100 }} />
          {!photo && <Typography>Фото за замовчуванням</Typography>}
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body1">{email}</Typography>
          <Typography variant="body1">Вік: {age}</Typography>
          <Typography variant="body1">Вага: {weight}</Typography>
          <Typography variant="h6">Баланс: {balance} грн</Typography>
          <Typography variant="body1" sx={{ color: user.vipStatus ? 'green' : 'red' }}>
            {user.vipStatus ? 'VIP Абонемент активний' : 'VIP Абонемент не активний'}
          </Typography>
          <Box mt={2}>
            {!user.vipStatus && (
              <Button variant="contained" color="primary" onClick={handlePurchaseVip} sx={{ mr: 2 }}>
                Придбати VIP абонемент за {vipPrice} грн
              </Button>
            )}
            <Button variant="contained" color="primary" onClick={() => setEditing(true)}>
              Редагувати
            </Button>
          </Box>
        </Paper>
        {editing && (
          <form onSubmit={handleSubmit} sx={{ mt: 4 }}>
            <TextField
              label="Ім'я"
              type="text"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              label="Електронна пошта"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Вік"
              type="number"
              fullWidth
              margin="normal"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
            <TextField
              label="Вага"
              type="number"
              fullWidth
              margin="normal"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
            <TextField
              label="Фото"
              type="file"
              fullWidth
              margin="normal"
              onChange={handlePhotoChange}
            />
            {photo && <img src={photo} alt="Фото" style={{ maxHeight: '150px' }} />}
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Зберегти зміни
            </Button>
          </form>
        )}
      </Box>
    </Container>
  );
};

export default ProfilePage;
