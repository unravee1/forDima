// src/components/CourseDetail.js
import React from 'react';

const CourseDetail = ({ course }) => {
    return (
        <div className="course-detail">
            <h2>{course.name}</h2>
            <p>{course.description}</p>
            <p>Trainer: {course.trainer.user.name}</p>
        </div>
    );
};

export default CourseDetail;
