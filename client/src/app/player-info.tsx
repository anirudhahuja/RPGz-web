import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, CloseButton } from 'react-bootstrap';
{/* Will use these for tooltip information */}
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import statsBackground from '../assets/stats_background.png';
import axios from 'axios';
import { API_BASE_URL } from '../config';

interface MenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const PlayerInfoMenu = ({ isOpen, onClose }: MenuProps) => {
    const [menuVisible, setMenuVisible] = useState(isOpen);
    const [playerData, setPlayerData] = useState(null);
    
    useEffect(() => {
        if (isOpen) {
            setMenuVisible(true);
            // Fetch player data when the menu opens
            axios.get(`${API_BASE_URL}/api/user-info`)
                .then(response => setPlayerData(response.data))
                .catch(error => console.error('Error fetching player data:', error));
        } else {
            setTimeout(() => setMenuVisible(false), 300);
        }
    }, [isOpen]);

    if (!menuVisible || !playerData) return null;

    return (
        <Container className="parchment-panel">
            <Card 
                className={`player-info ${isOpen ? 'open' : 'close'}`}
                style={{ 
                    backgroundImage: `url(${statsBackground})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundColor: 'transparent',
                    border: 'none',
                    opacity: 0.9,
                }}
            > 
                <Card.Body className="player-info-body">
                    <h5> Name: {playerData['name']} (Lv {playerData['level']}) </h5>
                    <h5> Class: {playerData['class']} </h5>
                    <h5> XP: {playerData['xp']}</h5>
                    <h5> Health: {playerData['health']} </h5>
                    <h5> Stamina: {playerData['stamina']} </h5>
                    <h5> Strength: {playerData['strength']} &nbsp;&nbsp;(100 to next level) </h5>
                    <h5> Agility: {playerData['agility']} &nbsp;&nbsp;(100 to next level) </h5>
                    <h5> Intelligence: {playerData['intelligence']} &nbsp;&nbsp;(100 to next level) </h5>
                    <h5> Wisdom: {playerData['wisdom']} &nbsp;&nbsp;(100 to next level) </h5>
                    <h5> Willpower: {playerData['willpower']} &nbsp;&nbsp;(1000 to next level) </h5>
                </Card.Body>
                <CloseButton className="close-button p-2" onClick={onClose} />
            </Card>
        </Container>
    );
};

export default PlayerInfoMenu;