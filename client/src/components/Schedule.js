// src/components/Schedule.js
import React from 'react';

const Schedule = ({ schedules }) => {
    return (
        <div className="schedule">
            <h2>Schedule</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {schedules.map((schedule) => (
                    <div key={schedule._id} className="schedule-card">
                        <h3>{schedule.group.name}</h3>
                        <p>Date: {new Date(schedule.date).toLocaleDateString()}</p>
                        <p>Duration: {schedule.duration} hours</p>
                        <p>Trainer: {schedule.trainer.user.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Schedule;
