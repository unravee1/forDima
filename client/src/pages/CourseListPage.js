import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/courses', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setCourses(data);
      } else {
        throw new Error('Invalid data format');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePurchase = async (courseId, price) => {
    try {
      const response = await fetch('http://localhost:5000/api/payments/purchase-course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ userId: localStorage.getItem('userInfo')._id, courseId, price }),
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

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Courses</h2>
        
        {error && <div className="text-red-500 mb-4">{error}</div>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <img src={course.photo} alt={course.name} className="w-full h-48 object-cover rounded-lg" />
              <h3 className="text-xl font-bold mt-4">{course.name}</h3>
              <p className="text-gray-700 mt-2">{course.shortDescription}</p>
              <p className="text-green-600 font-bold mt-2">{course.price} UAH</p>
              <Link to={`/courses/${course._id}`} className="btn-primary bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out mt-4 block text-center">
                View Details
              </Link>
              <button
                onClick={() => handlePurchase(course._id, course.price)}
                className="btn-primary bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out mt-4 block text-center"
              >
                Purchase
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
