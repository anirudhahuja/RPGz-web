import React, { useState, useEffect } from 'react';
import { Container, Card, CloseButton } from 'react-bootstrap';
import questlogBackground from '../assets/quest_log_background.png'; // Assuming you have a background image

interface QuestProps {
    isOpen: boolean;
    onClose: () => void;
}

const QuestLogMenu = ({ isOpen, onClose }: QuestProps) => {
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
                className={`quest-info ${isOpen ? 'open' : 'close'}`}
                style={{ 
                    backgroundImage: `url(${questlogBackground})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundColor: 'transparent',
                    border: 'none',
                    opacity: 0.9,
                }}
            > 
                <Card.Body className="quest-log-body">
                    <h5> Push-ups (0/20) </h5>
                    <h5> Squats (0/20) </h5>
                    <h5> Lunges (0/20) </h5>
                    <h5> Plank (0/3) </h5>
                    <h5> Sit-ups (0/20) </h5>
                    <h5> Wall sits (0/15) </h5>
                    <h5> Step-ups (0/10) </h5>
                    <h5> Glute bridges (0/20) </h5>
                    <h5> Side planks (0/3) </h5>
                    <h5> Tricep dips (0/10) </h5>
                </Card.Body>
                <CloseButton className="close-button p-2" onClick={onClose} />
            </Card>
        </Container>
    );
};

export default QuestLogMenu;