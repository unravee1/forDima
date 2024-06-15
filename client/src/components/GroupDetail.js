// src/components/GroupDetail.js
import React from 'react';

const GroupDetail = ({ group }) => {
    return (
        <div className="group-detail">
            <h2>{group.name}</h2>
            <p>{group.description}</p>
            <p>Trainer: {group.trainer.user.name}</p>
            <h3>Members</h3>
            <ul>
                {group.members.map((member) => (
                    <li key={member._id}>{member.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default GroupDetail;
