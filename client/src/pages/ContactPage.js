import React from 'react';
import { Container, Box, Typography } from '@mui/material';

const ContactsPage = () => {
  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Контакти
        </Typography>
        <Typography variant="body1">
          Телефон: +380 123 456 789
        </Typography>
        <Typography variant="body1">
          Email: gym@example.com
        </Typography>
        <Typography variant="body1">
          Адреса: м. Київ, вул. Центральна, 1
        </Typography>
      </Box>
    </Container>
  );
};

export default ContactsPage;
