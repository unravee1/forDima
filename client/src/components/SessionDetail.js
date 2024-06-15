// src/components/SessionDetail.js
import React from 'react';

const SessionDetail = ({ session }) => {
    return (
        <div className="session-detail">
            <h2>{session.group.name}</h2>
            <p>Date: {new Date(session.date).toLocaleDateString()}</p>
            <p>Duration: {session.duration} hours</p>
            <h3>Participants</h3>
            <ul>
                {session.participants.map((participant) => (
                    <li key={participant._id}>{participant.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default SessionDetail;
