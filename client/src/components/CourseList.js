// src/components/CourseList.js
import React from 'react';
import { Link } from 'react-router-dom';

const CourseList = ({ courses }) => {
    return (
        <div className="course-list">
            <h2>Our Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map((course) => (
                    <div key={course._id} className="course-card">
                        <h3>{course.name}</h3>
                        <p>{course.description}</p>
                        <p>Trainer: {course.trainer.user.name}</p>
                        <Link to={`/course/${course._id}`} className="btn-primary">View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseList;
