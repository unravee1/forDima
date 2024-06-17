import React from 'react';
import { Container, Box, Typography } from '@mui/material';

const AboutPage = () => {
  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Про нас
        </Typography>
        <Typography variant="body1" paragraph>
          Ласкаво просимо до нашого тренажерного залу! Ми пропонуємо найкращі умови для тренувань та розвитку вашої фізичної форми. Наші тренери є висококваліфікованими спеціалістами, які допоможуть вам досягти ваших цілей.
        </Typography>
        <Typography variant="body1" paragraph>
          Ми пропонуємо широкий спектр послуг, включаючи індивідуальні тренування, групові заняття, спеціалізовані курси та багато іншого. Наш зал обладнаний сучасними тренажерами та зручними роздягальнями.
        </Typography>
        <Typography variant="body1" paragraph>
          Приєднуйтесь до нас та ставайте частиною нашої дружної спортивної родини!
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutPage;
