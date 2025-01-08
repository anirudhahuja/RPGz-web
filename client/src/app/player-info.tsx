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
    if (!isOpen || !playerData) return null;

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
                    <h5> Name: {playerData.name} (Lv {playerData.level.user}) </h5>
                    <h5> Class: {playerData.class} </h5>
                    <h5> Health: {playerData.health} </h5>
                    <h5> Stamina: {playerData.stamina} </h5>
                    <h5> Strength: {playerData.level.strength} &nbsp;&nbsp;({playerData.levelRequirements.strength[playerData.level.strength] - playerData.xp.strength} to next level) </h5>
                    <h5> Agility: {playerData.level.agility} &nbsp;&nbsp;({playerData.levelRequirements.agility[playerData.level.agility] - playerData.xp.agility} to next level) </h5>
                    <h5> Intelligence: {playerData.level.intelligence} &nbsp;&nbsp;({playerData.levelRequirements.intelligence[playerData.level.intelligence] - playerData.xp.intelligence} to next level) </h5>
                    <h5> Wisdom: {playerData.level.wisdom} &nbsp;&nbsp;({playerData.levelRequirements.wisdom[playerData.level.wisdom] - playerData.xp.wisdom} to next level) </h5>
                    <h5> Endurance: {playerData.level.endurance} &nbsp;&nbsp;({playerData.levelRequirements.endurance[playerData.level.endurance] - playerData.xp.endurance} to next level) </h5>
                </Card.Body>
                <CloseButton className="close-button p-2" onClick={onClose} />
            </Card>
        </Container>
    );
};

export default PlayerInfoMenu;