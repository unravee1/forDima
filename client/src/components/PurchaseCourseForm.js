import React, { useState } from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const PurchaseCourseForm = () => {
  const { id } = useParams();
  const [balance, setBalance] = useState(1200); // Приклад початкового балансу користувача
  const [error, setError] = useState(null);
  const [course, setCourse] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  const fetchCourseDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/courses/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setCourse(data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Сталася помилка. Спробуйте ще раз.');
    }
  };

  const handlePayment = async () => {
    const coursePrice = userInfo.vip ? 0 : course.price; // VIP користувачі мають безкоштовний доступ

    if (balance >= coursePrice) {
      try {
        const response = await fetch('http://localhost:5000/api/payments/purchase-course', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ userId: userInfo._id, courseId: course._id, price: coursePrice }),
        });

        const data = await response.json();

        if (response.ok) {
          setBalance(balance - coursePrice);
          alert('Курс успішно придбано');
          navigate(`/courses/${id}`);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Сталася помилка. Спробуйте ще раз.');
      }
    } else {
      setError('Недостатньо коштів на балансі.');
    }
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!course) {
    return <Typography>Завантаження...</Typography>;
  }

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Придбати курс
        </Typography>
        <Typography variant="h6">Ваш баланс: {balance} грн</Typography>
        <Typography variant="body1">Ціна курсу: {course.price} грн</Typography>
        <Button
          onClick={handlePayment}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Придбати курс
        </Button>
      </Box>
    </Container>
  );
};

export default PurchaseCourseForm;
