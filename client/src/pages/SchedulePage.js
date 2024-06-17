import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Container, Box, Typography, Grid, Paper, Button, Pagination } from '@mui/material';

const SchedulePage = () => {
  const [groups, setGroups] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const pageNumber = searchParams.get('page') || 1;
    fetchSchedule(pageNumber);
  }, [searchParams]);

  const fetchSchedule = async (pageNumber) => {
    try {
      const response = await fetch(`http://localhost:5000/api/groups/schedule?pageNumber=${pageNumber}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setGroups(data.groups);
        setPage(data.page);
        setPages(data.pages);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Сталася помилка. Спробуйте ще раз.');
    }
  };

  const handlePageChange = (event, value) => {
    setSearchParams({ page: value });
  };

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Розклад
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Grid container spacing={3}>
          {groups.map((group) => (
            <Grid item xs={12} md={6} lg={4} key={group._id}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" component="h3">{group.name}</Typography>
                <Typography variant="body2">{new Date(group.date).toLocaleDateString()} о {group.time}</Typography>
                <Typography variant="body2">Тренер: {group.trainer.name}</Typography>
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
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination count={pages} page={page} onChange={handlePageChange} />
        </Box>
      </Box>
    </Container>
  );
};

export default SchedulePage;
