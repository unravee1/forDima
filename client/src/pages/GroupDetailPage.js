import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Grid, Paper } from '@mui/material';

const GroupPage = () => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [members, setMembers] = useState([]);
  const [trainerName, setTrainerName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    fetchGroupDetails();
  }, []);

  const fetchGroupDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/groups/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setGroup(data);
        setName(data.name);
        setDate(data.date);
        setTime(data.time);
        setMembers(data.members);
        setTrainerName(data.trainer.name);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Сталася помилка. Спробуйте ще раз.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/groups/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ name, date, time }),
      });

      const data = await response.json();

      if (response.ok) {
        setGroup(data);
        setIsEditing(false);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Сталася помилка. Спробуйте ще раз.');
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/groups/${id}/add-member`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ email: newMemberEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setMembers(data.members);
        setNewMemberEmail('');
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

  if (!group) {
    return <Typography>Завантаження...</Typography>;
  }

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          {name}
        </Typography>
        <Typography variant="h6">Тренер: {trainerName}</Typography>
        <Typography variant="body1">Дата: {new Date(date).toLocaleDateString()}</Typography>
        <Typography variant="body1">Час: {time}</Typography>
        <Typography variant="h6" sx={{ mt: 4 }}>Учасники</Typography>
        <Grid container spacing={2}>
          {members.map((member) => (
            <Grid item xs={12} sm={6} md={4} key={member._id}>
              <Paper sx={{ p: 2 }}>
                <Typography>{member.name}</Typography>
                <Typography variant="body2">{member.email}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        {userInfo._id === group.trainer._id && (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsEditing(true)}
              sx={{ mt: 4 }}
            >
              Редагувати групу
            </Button>
            <form onSubmit={handleAddMember} sx={{ mt: 4 }}>
              <TextField
                label="Додати учасника за email"
                type="email"
                fullWidth
                margin="normal"
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
                required
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Додати учасника
              </Button>
            </form>
            {isEditing && (
              <form onSubmit={handleSubmit} sx={{ mt: 4 }}>
                <TextField
                  label="Назва групи"
                  type="text"
                  fullWidth
                  margin="normal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <TextField
                  label="Дата"
                  type="date"
                  fullWidth
                  margin="normal"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
                <TextField
                  label="Час"
                  type="time"
                  fullWidth
                  margin="normal"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Зберегти зміни
                </Button>
              </form>
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default GroupPage;
