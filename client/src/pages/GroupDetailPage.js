// src/pages/GroupDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GroupDetail from '../components/GroupDetail.js';

const GroupDetailPage = () => {
    const { id } = useParams();
    const [group, setGroup] = useState({});

    useEffect(() => {
        const fetchGroup = async () => {
            const response = await fetch(`/api/groups/${id}`);
            const data = await response.json();
            setGroup(data);
        };
        fetchGroup();
    }, [id]);

    return (
        <div className="group-detail-page">
            <GroupDetail group={group} />
        </div>
    );
};

export default GroupDetailPage;
