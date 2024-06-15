import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CoursePage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);

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
      setCourse(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePurchase = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/payments/purchase-course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ userId: localStorage.getItem('userInfo')._id, courseId: course._id, price: course.price }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Course purchased successfully');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <img src={course.photo} alt={course.name} className="w-full h-64 object-cover rounded-lg" />
        <h2 className="text-2xl font-bold mt-4">{course.name}</h2>
        <p className="text-gray-700 mt-2">{course.extendedDescription}</p>
        <p className="text-green-600 font-bold mt-4">{course.price} UAH</p>
        <button
          onClick={handlePurchase}
          className="btn-primary bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out mt-4 block text-center"
        >
          Purchase
        </button>
      </div>
    </div>
  );
};

export default CoursePage;
