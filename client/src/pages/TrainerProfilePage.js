// src/pages/TrainerProfilePage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TrainerProfile from '../components/TrainerProfile.js';

const TrainerProfilePage = () => {
    const { id } = useParams();
    const [trainer, setTrainer] = useState({});

    useEffect(() => {
        const fetchTrainer = async () => {
            const response = await fetch(`/api/trainers/${id}`);
            const data = await response.json();
            setTrainer(data);
        };
        fetchTrainer();
    }, [id]);

    return (
        <div className="trainer-profile-page">
            <TrainerProfile trainer={trainer} />
        </div>
    );
};

export default TrainerProfilePage;
