import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, Typography, Grid, Paper, Button } from '@mui/material';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/courses', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setCourses(data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Сталася помилка. Спробуйте ще раз.');
    }
  };

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Курси
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        {userInfo.role === 'trainer' && (
          <Button
            component={Link}
            to="/create-course"
            variant="contained"
            color="primary"
            sx={{ mb: 2 }}
          >
            Створити новий курс
          </Button>
        )}
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid item xs={12} md={6} lg={4} key={course._id}>
              <Paper sx={{ p: 2 }}>
                <img src={course.photo} alt={course.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                <Typography variant="h6" component="h3" sx={{ mt: 2 }}>{course.name}</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>{course.shortDescription}</Typography>
                <Typography variant="body2">Ціна: {course.price} грн</Typography>
                <Button
                  component={Link}
                  to={`/courses/${course._id}`}
                  variant="outlined"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Переглянути курс
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default CoursesPage;
