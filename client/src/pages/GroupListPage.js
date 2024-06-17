import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, Typography, Grid, Paper, Button } from '@mui/material';

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/groups', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setGroups(data);
      } else {
        throw new Error('Invalid data format');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Групи
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        {userInfo.role === 'trainer' && (
          <Button
            component={Link}
            to="/create-group"
            variant="contained"
            color="primary"
            sx={{ mb: 2 }}
          >
            Створити нову групу
          </Button>
        )}
        <Grid container spacing={3}>
          {groups.map((group) => (
            <Grid item xs={12} md={6} lg={4} key={group._id}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" component="h3">{group.name}</Typography>
                <Typography variant="body2">{group.trainer.name}</Typography>
                <Button
                  component={Link}
                  to={`/groups/${group._id}`}
                  variant="outlined"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Переглянути групу
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default GroupsPage;
