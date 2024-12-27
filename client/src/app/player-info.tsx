import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, CloseButton } from 'react-bootstrap';
{/* Will use these for tooltip information */}
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import statsBackground from '../assets/stats_background.png';

interface MenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const PlayerInfoMenu = ({ isOpen, onClose }: MenuProps) => {
    const [menuVisible, setMenuVisible] = useState(isOpen);

    useEffect(() => {
        if (isOpen) {
            setMenuVisible(true);
        } else {
            setTimeout(() => setMenuVisible(false), 300); // Match the animation duration
        }
    }, [isOpen]);

    if (!menuVisible) return null; // Render nothing if the menu is not visible

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
                    <h5> Name: Placeholder (Lv 1) </h5>
                    <h5> Class: Novice </h5>
                    <h5> XP: (0/100)</h5>
                    <h5> Health: 100 </h5>
                    <h5> Stamina: 50 </h5>
                    <h5> Strength: 10 &nbsp;&nbsp;(100 to next level) </h5>
                    <h5> Agility: 10 &nbsp;&nbsp;(100 to next level) </h5>
                    <h5> Intelligence: 10 &nbsp;&nbsp;(100 to next level) </h5>
                    <h5> Wisdom: 10 &nbsp;&nbsp;(100 to next level) </h5>
                    <h5> Willpower: 1 &nbsp;&nbsp;(1000 to next level) </h5>
                </Card.Body>
                <CloseButton className="close-button p-2" onClick={onClose} />
            </Card>
        </Container>
    );
};

export default PlayerInfoMenu;