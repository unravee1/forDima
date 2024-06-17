import React from 'react';
import { Typography, Box, Container } from '@mui/material';

const HomePage = () => {
  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Ласкаво просимо до Тренажерного залу!
        </Typography>
        <Typography variant="body1">
          Тут ви можете знайти найкращих тренерів, групові заняття, курси та багато іншого.
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;
