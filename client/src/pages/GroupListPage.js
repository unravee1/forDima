// src/pages/GroupListPage.js
import React, { useEffect, useState } from 'react';
import GroupList from '../components/GroupList.js';

const GroupListPage = () => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const fetchGroups = async () => {
            const response = await fetch('/api/groups');
            const data = await response.json();
            setGroups(data);
        };
        fetchGroups();
    }, []);

    return (
        <div className="group-list-page">
            <GroupList groups={groups} />
        </div>
    );
};

export default GroupListPage;
