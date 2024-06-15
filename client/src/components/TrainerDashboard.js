import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrainerDashboard = () => {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    const response = await axios.get('/api/groups');
    setGroups(response.data);
  };

  const handleCreateGroup = async () => {
    try {
      const response = await axios.post('/api/groups', { name: groupName });
      setMessage(response.data.message);
      fetchGroups();
    } catch (error) {
      setMessage('Error creating group');
    }
  };

  return (
    <div className="trainer-dashboard">
      <h2>Trainer Dashboard</h2>
      {message && <p>{message}</p>}
      <div>
        <h3>Create Group</h3>
        <input
          type="text"
          placeholder="Group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <button onClick={handleCreateGroup}>Create Group</button>
      </div>
      <div>
        <h3>Groups</h3>
        <ul>
          {groups.map(group => (
            <li key={group._id}>
              {group.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrainerDashboard;
