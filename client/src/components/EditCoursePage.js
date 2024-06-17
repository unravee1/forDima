import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button } from '@mui/material';

const EditCoursePage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [price, setPrice] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [extendedDescription, setExtendedDescription] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  const fetchCourseDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/courses/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setCourse(data);
        setName(data.name);
        setPrice(data.price);
        setShortDescription(data.shortDescription);
        setExtendedDescription(data.extendedDescription);
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
      const response = await fetch(`http://localhost:5000/api/courses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ name, photo, price, shortDescription, extendedDescription }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate(`/courses/${id}`);
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

  if (!course) {
    return <Typography>Завантаження...</Typography>;
  }

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Редагувати курс
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Назва"
            type="text"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Ціна"
            type="number"
            fullWidth
            margin="normal"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <TextField
            label="Короткий опис"
            type="text"
            fullWidth
            margin="normal"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            required
          />
          <TextField
            label="Розширений опис"
            type="text"
            fullWidth
            margin="normal"
            value={extendedDescription}
            onChange={(e) => setExtendedDescription(e.target.value)}
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
      </Box>
    </Container>
  );
};

export default EditCoursePage;
