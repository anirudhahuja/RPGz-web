import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Quest } from './quest-log';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

interface AcceptedQuestPanelProps {
    onSubmit: (quest: Quest) => void;
}

const AcceptedQuestPanel = ({ onSubmit }: AcceptedQuestPanelProps) => {
    const [acceptedQuests, setAcceptedQuests] = useState<Quest[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchAcceptedQuests = async () => {
        const username = localStorage.getItem('username');
        if (!username) {
            setError('No user logged in');
            return;
        }

        try {
            const response = await axios.get(`${API_BASE_URL}/api/accepted-quests?username=${username}`);
            setAcceptedQuests(response.data);
            setError(null);
        } catch (error: any) {
            console.error('Error fetching accepted quests:', error);
            setError('Failed to load accepted quests');
        }
    };

    // Fetch on mount and every few seconds
    useEffect(() => {
        fetchAcceptedQuests();
        const interval = setInterval(fetchAcceptedQuests, 2000); // Refresh every 2 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    const handleSubmit = async (quest: Quest) => {
        const username = localStorage.getItem('username');
        if (!username) return;

        try {
            await onSubmit(quest);
            // Refresh the accepted quests list
            fetchAcceptedQuests();
        } catch (error) {
            console.error('Error submitting quest:', error);
            setError('Failed to submit quest');
        }
    };

    const maxQuests = 5;

    return (
        <Card className="accepted-quests-panel">
            <Card.Header className="accepted-quests-header">
                <h2>Accepted Quests ({acceptedQuests.length}/{maxQuests}) <hr className="accepted-quests-divider" /> </h2>
            </Card.Header>
            <Card.Body className="accepted-quests-body">
                {acceptedQuests.map((quest, index) => (
                    <h5 key={index}>
                        <b>{quest.name}</b> - {quest.description} <br />
                        <b>Reward:</b> {quest.xp} {quest.primaryStatGain} experience <br />
                        <Button
                            variant="success"
                            onClick={() => handleSubmit(quest)}
                            className="accepted-quests-submit-button"
                        >
                            Submit Quest
                        </Button>
                        <br /> <br />
                    </h5>
                ))}
            </Card.Body>
        </Card>
    );
};

export default AcceptedQuestPanel;