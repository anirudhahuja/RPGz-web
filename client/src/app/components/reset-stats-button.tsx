import React from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { Button } from 'react-bootstrap';

const ResetStatsButton = ({ playerName, onReset }: { playerName: string; onReset: () => void }) => {
    const handleReset = async () => {
        try {
            await axios.post(`${API_BASE_URL}/api/reset-stats`, { name: playerName });
            console.log('User stats reset successfully');
            onReset(); // Trigger a reload of player data
        } catch (error) {
            console.error('Error resetting stats:', error);
        }
    };

    return (
        <Button onClick={handleReset} style={{ marginTop: '10px' }}>
            Reset Stats
        </Button>
    );
};

export default ResetStatsButton;
