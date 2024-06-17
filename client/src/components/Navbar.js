import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Тренажерний зал
        </Typography>
        <Button color="inherit" component={Link} to="/">Головна</Button>
        {userInfo ? (
          <>
            <Button color="inherit" component={Link} to="/profile">Профіль</Button>
            {userInfo.role === 'admin' && <Button color="inherit" component={Link} to="/admin">Адмінпанель</Button>}
            <Button color="inherit" onClick={() => {
              localStorage.removeItem('userInfo');
              window.location.href = '/login';
            }}>Вихід</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Авторизація</Button>
            <Button color="inherit" component={Link} to="/register">Реєстрація</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
