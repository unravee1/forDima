// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';

import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage.js';
import UserProfilePage from './pages/UserProfilePage.js';
import TrainerListPage from './pages/TrainerListPage.js';
import TrainerProfilePage from './pages/TrainerProfilePage.js';
import GroupListPage from './pages/GroupListPage.js';
import GroupDetailPage from './pages/GroupDetailPage.js';
import SchedulePage from './pages/SchedulePage.js';
import SessionDetailPage from './pages/SessionDetailPage.js';
import AdminPage from './pages/AdminPage.js';

import CourseListPage from './pages/CourseListPage.js';
import CourseDetailPage from './pages/CourseDetailPage.js';
import ContactPage from './pages/ContactPage.js';
import AboutPage from './pages/AboutPage.js';
import HomePage from './pages/HomePage.js';
import VIPPaymentForm from './components/VIPPaymentForm.js';
import PurchaseCourseForm from './components/PurchaseCourseForm.js';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/trainers" element={<TrainerListPage />} />
            <Route path="/trainer/:id" element={<TrainerProfilePage />} />
            <Route path="/groups" element={<GroupListPage />} />
            <Route path="/group/:id" element={<GroupDetailPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/session/:id" element={<SessionDetailPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/courses" element={<CourseListPage />} />
            <Route path="/courses/:id" element={<CourseDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/vip-payment" element={<VIPPaymentForm />} />
          <Route path="/courses/:id/purchase" element={<PurchaseCourseForm />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
