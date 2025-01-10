import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, CloseButton } from 'react-bootstrap';
{/* Will use these for tooltip information */}
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import statsBackground from '../assets/stats_background.png';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { PlayerData } from './levelUpSlice';

interface MenuProps {
    isOpen: boolean;
    onClose: () => void;
    playerData: PlayerData | null;
}

const PlayerInfoMenu = ({ isOpen, onClose, playerData }: MenuProps) => {
    const [closing, setClosing] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setClosing(false);
        }
    }, [isOpen]);

    const handleClose = () => {
        setClosing(true);
        setTimeout(onClose, 300); // Match the animation duration
    };

    if (!isOpen && !closing) return null;

    return (
        <Container className="parchment-panel">
            <Card 
                className={`player-info ${isOpen && !closing ? 'open' : 'close'}`}
                style={{ 
                    backgroundImage: `url(${statsBackground})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundColor: 'transparent',
                    border: 'none',
                    opacity: 0.9,
                }}
            > 
                <Card.Body className="player-info-body">
                    <h5> Name: {playerData?.name ?? 'Unknown'} (Lv {playerData?.level?.user ?? 0}) </h5>
                    <h5> Class: {playerData?.class ?? 'Unknown'} </h5>
                    <h5> Health: {playerData?.health ?? 0} </h5>
                    <h5> Stamina: {playerData?.stamina ?? 0} </h5>
                    <h5> Strength: {playerData?.level?.strength ?? 0} &nbsp;&nbsp;({(playerData?.levelRequirements?.strength?.[playerData?.level?.strength] ?? 0) - (playerData?.xp?.strength ?? 0)} to next level) </h5>
                    <h5> Agility: {playerData?.level?.agility ?? 0} &nbsp;&nbsp;({(playerData?.levelRequirements?.agility?.[playerData?.level?.agility] ?? 0) - (playerData?.xp?.agility ?? 0)} to next level) </h5>
                    <h5> Intelligence: {playerData?.level?.intelligence ?? 0} &nbsp;&nbsp;({(playerData?.levelRequirements?.intelligence?.[playerData?.level?.intelligence] ?? 0) - (playerData?.xp?.intelligence ?? 0)} to next level) </h5>
                    <h5> Wisdom: {playerData?.level?.wisdom ?? 0} &nbsp;&nbsp;({(playerData?.levelRequirements?.wisdom?.[playerData?.level?.wisdom] ?? 0) - (playerData?.xp?.wisdom ?? 0)} to next level) </h5>
                    <h5> Endurance: {playerData?.level?.endurance ?? 0} &nbsp;&nbsp;({(playerData?.levelRequirements?.endurance?.[playerData?.level?.endurance] ?? 0) - (playerData?.xp?.endurance ?? 0)} to next level) </h5>
                </Card.Body>
                <CloseButton className="player-info-close-button" onClick={handleClose} />
            </Card>
        </Container>
    );
};

export default PlayerInfoMenu;