// src/components/TrainerProfile.js
import React from 'react';

const TrainerProfile = ({ trainer }) => {
    return (
        <div className="trainer-profile">
            <h2>{trainer.user.name}</h2>
            <p>Specialization: {trainer.specialization}</p>
            <p>Experience: {trainer.experience} years</p>
            <p>Bio: {trainer.bio}</p>
        </div>
    );
};

export default TrainerProfile;
