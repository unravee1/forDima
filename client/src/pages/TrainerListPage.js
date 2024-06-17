import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, Typography, Grid, Paper, Button, Avatar } from '@mui/material';

const TrainersPage = () => {
  const [trainers, setTrainers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/trainers', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setTrainers(data);
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
          Тренери
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Grid container spacing={3}>
          {trainers.map((trainer) => (
            <Grid item xs={12} md={6} lg={4} key={trainer._id}>
              <Paper sx={{ p: 2 }}>
                <Avatar alt={trainer.name} src={trainer.photo} sx={{ width: 100, height: 100 }} />
                <Typography variant="h6" component="h3" sx={{ mt: 2 }}>{trainer.name}</Typography>
                <Button
                  component={Link}
                  to={`/trainers/${trainer._id}`}
                  variant="outlined"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Переглянути профіль
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default TrainersPage;
