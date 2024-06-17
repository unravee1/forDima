import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Grid, Paper, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [balance, setBalance] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Сталася помилка. Спробуйте ще раз.');
    }
  };

  const handleAddBalance = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${selectedUser}/balance`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ balance }),
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(data);
        setBalance('');
        setSelectedUser(null);
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
          Адмінпанель
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid item xs={12} md={6} lg={4} key={user._id}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">{user.name}</Typography>
                <Typography variant="body2">{user.email}</Typography>
                <Typography variant="body2">Роль: {user.role}</Typography>
                <Typography variant="body2">Баланс: {user.balance}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setSelectedUser(user._id)}
                  sx={{ mt: 2 }}
                >
                  Додати баланс
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
        {selectedUser && (
          <Box mt={4}>
            <Typography variant="h6">Додати баланс користувачу</Typography>
            <form onSubmit={handleAddBalance}>
              <TextField
                label="Баланс"
                type="number"
                fullWidth
                margin="normal"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                required
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Додати баланс
              </Button>
            </form>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default AdminPage;
