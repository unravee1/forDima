import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Box, Typography, Button } from '@mui/material';

const CoursePage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));


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
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Сталася помилка. Спробуйте ще раз.');
    }
  };

  const handlePurchase = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/payments/purchase-course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ userId: userInfo._id, courseId: course._id, price: course.price }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Курс успішно придбано');
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
        <img src={course.photo} alt={course.name} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
        <Typography variant="h4" component="h1" gutterBottom>
          {course.name}
        </Typography>
        <Typography variant="body1">{course.extendedDescription}</Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>Ціна: {course.price} грн</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>Автор: {course.trainer.name}</Typography>
        {!userInfo.vipStatus && (
          <Button
            onClick={handlePurchase}
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Придбати курс
          </Button>
        )}
        {userInfo.role === 'trainer' && (
          <Button
            component={Link}
            to={`/courses/${id}/edit`}
            variant="contained"
            color="secondary"
            sx={{ mt: 2, ml: 2 }}
          >
            Редагувати курс
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default CoursePage;
