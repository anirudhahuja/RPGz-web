import React, { useState, useEffect } from "react";
import { Parallax } from 'react-parallax';
import backgroundImage from '../assets/village.gif';
import playerGif from "../assets/player.gif"
import logo from "../assets/logo.png"
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import PlayerInfoMenu from './player-info';
import QuestLogMenu from './quest-log';
import AcceptedQuestPanel from './accepted-quests';
import { Quest } from './quest-log';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useDispatch } from 'react-redux';
import { triggerLevelUp, setPlayerData, PlayerData } from './levelUpSlice';

export function Town() {
    const [menuOpen, setMenuOpen] = useState(false); // Main Menu  
    const [playerInfoOpen, setPlayerInfoOpen] = useState(false); // Player Info Menu
    const [questLogOpen, setQuestLogOpen] = useState(false); // Quest Log Menu
    const [playerData, setPlayerDataLocal] = useState<PlayerData | null>(null); // Local Player Data
    const [acceptedQuests, setAcceptedQuests] = useState<Quest[]>([]); // Accepted Quests
    const [levelUpMessages, setLevelUpMessages] = useState<string[]>([]); // Change to an array
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/user-info`)
            .then(response => {
                setPlayerDataLocal(response.data);
                dispatch(setPlayerData(response.data)); // Store full player data in Redux
            })
            .catch(error => console.error('Error fetching player data:', error));
    }, []);


    const triggerLevelUpAnimation = (message: string, index: number) => {
        setTimeout(() => {
            setLevelUpMessages(prevMessages => [...prevMessages, message]);
            setTimeout(() => {
                setLevelUpMessages(prevMessages => prevMessages.filter(msg => msg !== message));
            }, 2500); // Message disappears after 2.5 seconds
        }, index * 3000); // Delay each message by 3 seconds times its index
    };

    const toggleMenu = () => {
        if (menuOpen) {
            setMenuOpen(false);
            setTimeout(() => {
                setPlayerInfoOpen(false);
                setQuestLogOpen(false);
            }, 300);
        } else {
            setMenuOpen(true);
        }
    };

    const acceptQuest = (quest: Quest) => {
        setAcceptedQuests([...acceptedQuests, quest]);
    };

    const submitQuest = (quest: Quest) => {
        if (!playerData) return; // Ensure player data is available

        axios.post(`${API_BASE_URL}/api/submit-quest`, { questId: quest.id })
            .then(response => {
                console.log('Quest submitted successfully:', response.data);
                setAcceptedQuests(acceptedQuests.filter(q => q !== quest));

                const levelUpMessages = [];
                let userLeveledUp = false;

                if (response.data.user.level.strength > playerData.level.strength) {
                    levelUpMessages.push("STRENGTH LEVEL " + playerData.level.strength + " -> " + response.data.user.level.strength);
                }
                if (response.data.user.level.agility > playerData.level.agility) {
                    levelUpMessages.push("AGILITY LEVEL " + playerData.level.agility + " -> " + response.data.user.level.agility);
                }
                if (response.data.user.level.intelligence > playerData.level.intelligence) {
                    levelUpMessages.push("INTELLIGENCE LEVEL " + playerData.level.intelligence + " -> " + response.data.user.level.intelligence);
                }
                if (response.data.user.level.wisdom > playerData.level.wisdom) {
                    levelUpMessages.push("WISDOM LEVEL " + playerData.level.wisdom + " -> " + response.data.user.level.wisdom);
                }
                if (response.data.user.level.endurance > playerData.level.endurance) {
                    levelUpMessages.push("ENDURANCE LEVEL " + playerData.level.endurance + " -> " + response.data.user.level.endurance);
                }
                if (response.data.user.level.user > playerData.level.user) {
                    levelUpMessages.push("YOU LEVELED UP! LEVEL " + playerData.level.user + " -> " + response.data.user.level.user);
                    userLeveledUp = true;
                }

                // Trigger animations for each level-up message with a delay
                levelUpMessages.forEach((message, index) => triggerLevelUpAnimation(message, index));

                // Update player data with new data
                setPlayerDataLocal(response.data.user);
                dispatch(setPlayerData(response.data.user)); // Update Redux store

                // Dispatch level-up action
                if (userLeveledUp) {
                    dispatch(triggerLevelUp());
                }
            })
            .catch(error => console.error('Error submitting quest:', error));
    };

    return (
        <Parallax bgImage={backgroundImage} strength={0}>
            <Container id="town">
                <img src={logo} alt="Logo" className="logo" />
                <Button
                    onClick={toggleMenu}
                    style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: "pointer"
                    }}
                >
                    <img src={playerGif} alt="Character Idle Animation" className="player" />
                </Button>

                {levelUpMessages.map((message, index) => (
                    <div key={index} className="level-up-message">
                        {message}
                    </div>
                ))}

                {menuOpen && (
                    <Container className={`player-menu ${menuOpen ? 'town-open' : 'town-close'}`}>
                        <Row>
                            <Col className="col-12 mb-3">
                                <Button
                                    className="player-menu-button w-100"
                                    onClick={() => {
                                        setPlayerInfoOpen(true);
                                        setQuestLogOpen(false);
                                        setMenuOpen(false);
                                    }}>
                                    Player Info
                                </Button>
                            </Col>
                            <Col className="col-12 mb-3">
                                <Button
                                    className="player-menu-button w-100"
                                    onClick={() => {
                                        setQuestLogOpen(true);
                                        setPlayerInfoOpen(false);
                                        setMenuOpen(false);
                                    }}>
                                    Quest Log
                                </Button>
                            </Col>
                            <Col className="col-12 mb-3">
                                <Button
                                    className="player-menu-button w-100"
                                    onClick={() => setMenuOpen(false)}
                                >Skills</Button>
                            </Col>
                        </Row>
                    </Container>
                )}

                <PlayerInfoMenu 
                    isOpen={playerInfoOpen} 
                    onClose={() => setPlayerInfoOpen(false)} 
                    playerData={playerData}
                />
                <QuestLogMenu 
                    isOpen={questLogOpen} 
                    onClose={() => setQuestLogOpen(false)} 
                    acceptQuest={acceptQuest} 
                    acceptedCount={acceptedQuests.length} 
                    maxQuests={5} 
                />
                <AcceptedQuestPanel 
                    acceptedQuests={acceptedQuests} 
                    onSubmit={submitQuest} 
                />
            </Container>
        </Parallax>
    );
}

export default Town;