import React, { useState, useEffect } from 'react';
import { Container, Card, CloseButton } from 'react-bootstrap';
import statsBackground from '../../assets/stats_background.png';
import { PlayerData } from '../redux/levelUpSlice';

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
        console.log('Player Data:', playerData); // Debug log
    }, [isOpen, playerData]);

    const handleClose = () => {
        setClosing(true);
        setTimeout(onClose, 300);
    };

    if (!isOpen && !closing) return null;

    // XP to next level for each stat
    const strengthXPToNextLevel = (playerData?.levelRequirements?.strength?.[playerData?.level?.strength] ?? 0) - (playerData?.xp?.strength ?? 0);
    const agilityXPToNextLevel = (playerData?.levelRequirements?.agility?.[playerData?.level?.agility] ?? 0) - (playerData?.xp?.agility ?? 0);
    const intelligenceXPToNextLevel = (playerData?.levelRequirements?.intelligence?.[playerData?.level?.intelligence] ?? 0) - (playerData?.xp?.intelligence ?? 0);
    const wisdomXPToNextLevel = (playerData?.levelRequirements?.wisdom?.[playerData?.level?.wisdom] ?? 0) - (playerData?.xp?.wisdom ?? 0);
    const enduranceXPToNextLevel = (playerData?.levelRequirements?.endurance?.[playerData?.level?.endurance] ?? 0) - (playerData?.xp?.endurance ?? 0);

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
                    <h5>Name: {playerData?.name ?? 'Unknown'} (Lv {playerData?.level?.user ?? 1})</h5>
                    <h5>Class: {playerData?.class ?? 'Unknown'}</h5>
                    <h5>Health: {playerData?.health ?? 0}</h5>
                    <h5>Stamina: {playerData?.stamina ?? 0}</h5>
                    <h5>Strength: {playerData?.level?.strength ?? 0} ({strengthXPToNextLevel} to next level)</h5>
                    <h5>Agility: {playerData?.level?.agility ?? 0} ({agilityXPToNextLevel} to next level)</h5>
                    <h5>Intelligence: {playerData?.level?.intelligence ?? 0} ({intelligenceXPToNextLevel} to next level)</h5>
                    <h5>Wisdom: {playerData?.level?.wisdom ?? 0} ({wisdomXPToNextLevel} to next level)</h5>
                    <h5>Endurance: {playerData?.level?.endurance ?? 0} ({enduranceXPToNextLevel} to next level)</h5>
                </Card.Body>
                <CloseButton className="player-info-close-button" onClick={handleClose} />
            </Card>
        </Container>
    );
};

export default PlayerInfoMenu;
