// src/components/TrainerList.js
import React from 'react';
import { Link } from 'react-router-dom';

const TrainerList = ({ trainers }) => {
    return (
        <div className="trainer-list">
            <h2>Our Trainers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {trainers.map((trainer) => (
                    <div key={trainer._id} className="trainer-card">
                        <h3>{trainer.user.name}</h3>
                        <p>{trainer.specialization}</p>
                        <p>{trainer.experience} years of experience</p>
                        <Link to={`/trainer/${trainer._id}`} className="btn-primary">View Profile</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrainerList;
