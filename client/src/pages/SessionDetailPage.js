// src/pages/SessionDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SessionDetail from '../components/SessionDetail.js';

const SessionDetailPage = () => {
    const { id } = useParams();
    const [session, setSession] = useState({});

    useEffect(() => {
        const fetchSession = async () => {
            const response = await fetch(`/api/sessions/${id}`);
            const data = await response.json();
            setSession(data);
        };
        fetchSession();
    }, [id]);

    return (
        <div className="session-detail-page">
            <SessionDetail session={session} />
        </div>
    );
};

export default SessionDetailPage;
