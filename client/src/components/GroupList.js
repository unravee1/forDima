// src/components/GroupList.js
import React from 'react';
import { Link } from 'react-router-dom';

const GroupList = ({ groups }) => {
    return (
        <div className="group-list">
            <h2>Our Groups</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groups.map((group) => (
                    <div key={group._id} className="group-card">
                        <h3>{group.name}</h3>
                        <p>{group.description}</p>
                        <p>Trainer: {group.trainer.user.name}</p>
                        <Link to={`/group/${group._id}`} className="btn-primary">View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GroupList;
