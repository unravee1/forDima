import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Box, Typography, Grid, Paper, Button } from '@mui/material';

const SessionPage = () => {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSessionDetails();
  }, []);

  const fetchSessionDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/sessions/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setSession(data);
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

  if (!session) {
    return <Typography>Завантаження...</Typography>;
  }

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          {session.name}
        </Typography>
        <Typography variant="h6">Група: {session.group.name}</Typography>
        <Typography variant="body1">Дата: {new Date(session.date).toLocaleDateString()}</Typography>
        <Typography variant="body1">Час: {session.time}</Typography>
        <Typography variant="h6" sx={{ mt: 4 }}>Учасники</Typography>
        <Grid container spacing={2}>
          {session.participants.map((participant) => (
            <Grid item xs={12} sm={6} md={4} key={participant._id}>
              <Paper sx={{ p: 2 }}>
                <Typography>{participant.name}</Typography>
                <Typography variant="body2">{participant.email}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default SessionPage;
