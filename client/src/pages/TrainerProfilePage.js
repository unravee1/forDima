import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Avatar, Paper } from '@mui/material';

const TrainerProfilePage = () => {
  const { id } = useParams();
  const [trainer, setTrainer] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [info, setInfo] = useState('');
  const [photo, setPhoto] = useState('');
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    fetchTrainerDetails();
  }, []);

  const fetchTrainerDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/trainers/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setTrainer(data);
        setName(data.name);
        setEmail(data.email);
        setAge(data.age);
        setWeight(data.weight);
        setHeight(data.height);
        setInfo(data.info);
        setPhoto(data.photo);
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
      const response = await fetch(`http://localhost:5000/api/trainers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ name, email, age, weight, height, info, photo }),
      });
      const data = await response.json();
      if (response.ok) {
        setTrainer(data);
        setIsEditing(false);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Сталася помилка. Спробуйте ще раз.');
    }
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!trainer) {
    return <Typography>Завантаження...</Typography>;
  }

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Профіль Тренера
        </Typography>
        <Paper sx={{ p: 2, mt: 2 }}>
          <Avatar alt={name} src={photo} sx={{ width: 100, height: 100 }} />
          {!photo && <Typography>Фото за замовчуванням</Typography>}
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body1">{email}</Typography>
          <Typography variant="body1">Вік: {age}</Typography>
          <Typography variant="body1">Вага: {weight}</Typography>
          <Typography variant="body1">Ріст: {height}</Typography>
          <Typography variant="body1">Інформація: {info}</Typography>
          {userInfo._id === trainer._id && (
            <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
              Редагувати
            </Button>
          )}
        </Paper>
        {isEditing && (
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
              label="Ріст"
              type="number"
              fullWidth
              margin="normal"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
            />
            <TextField
              label="Інформація"
              type="text"
              fullWidth
              margin="normal"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
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
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Зберегти зміни
            </Button>
          </form>
        )}
      </Box>
    </Container>
  );
};

export default TrainerProfilePage;
