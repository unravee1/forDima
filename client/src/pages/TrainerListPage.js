// src/pages/TrainerListPage.js
import React, { useEffect, useState } from 'react';
import TrainerList from '../components/TrainerList.js';

const TrainerListPage = () => {
    const [trainers, setTrainers] = useState([]);

    useEffect(() => {
        const fetchTrainers = async () => {
            const response = await fetch('/api/trainers');
            const data = await response.json();
            setTrainers(data);
        };
        fetchTrainers();
    }, []);

    return (
        <div className="trainer-list-page">
            <TrainerList trainers={trainers} />
        </div>
    );
};

export default TrainerListPage;
