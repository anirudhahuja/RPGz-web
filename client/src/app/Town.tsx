import React, { useState, useEffect } from 'react';
import { Parallax } from 'react-parallax';
import { Container, Button, Image } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Importing assets
import backgroundImage from '../assets/village.gif';
import playerGif from '../assets/player.gif';
import logo from '../assets/logo.png';
import player_menu_icon from '../assets/icons/player_menu_icon.svg';
import quests_menu_icon from '../assets/icons/quests_menu_icon.svg';
import skills_menu_icon from '../assets/icons/skills_menu_icon.svg';
import nutrition_menu_icon from '../assets/icons/nutrition_menu_icon.svg';
import logout_menu_icon from '../assets/icons/logout_menu_icon.svg';

// Importing components and utilities
import CharacterCreation from './components/character-creation';
import PlayerInfoMenu from './menu/player-info';
import QuestLogMenu from './menu/quest-log';
import AcceptedQuestPanel from './menu/accepted-quests';
import ExperienceBar from './components/exp-bar';
import type { Quest } from '@fitness-rpg/shared-types';
import { API_BASE_URL } from '../config';
import { triggerLevelUp, setPlayerData, PlayerData } from './redux/levelUpSlice';
import LoginForm from './components/login-form'; // Import the LoginForm component
import { parseUserData } from '@fitness-rpg/shared-api';
import OrientationMessage from './components/orientation';

interface TownProps {
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export function Town({ setIsLoggedIn }: TownProps) {
    const navigate = useNavigate(); // Hook for navigation
    const [playerInfoOpen, setPlayerInfoOpen] = useState(false); // State for Player Info Menu visibility
    const [questLogOpen, setQuestLogOpen] = useState(false); // State for Quest Log Menu visibility
    const [showCharacterCreation, setShowCharacterCreation] = useState(false); // State for Character Creation visibility
    const [playerData, setPlayerDataLocal] = useState<PlayerData | null>(null); // State for local player data
    const [levelUpMessages, setLevelUpMessages] = useState<string[]>([]); // State for level-up messages
    const dispatch = useDispatch(); // Hook for dispatching Redux actions
    const [showLoginForm, setShowLoginForm] = useState(false); // State to control form visibility
    const [currentUsername, setCurrentUsername] = useState<string | null>(null); // State for current username

    // Fetch player data on component mount
    useEffect(() => {
        const fetchPlayerData = async () => {
            if (!currentUsername) return;  // Don't fetch if no username

            try {
                const response = await axios.get(`${API_BASE_URL}/api/user-info?username=${currentUsername}`);
                const data = response.data;
    
                const parsedData = parseUserData(data);
                setPlayerDataLocal(parsedData);
                dispatch(setPlayerData(parsedData));
            } catch (error) {
                console.error('Error fetching player data:', error);
            }
        };
    
        fetchPlayerData();
    }, [currentUsername, dispatch]);
    
    // Function to trigger level-up animation
    const triggerLevelUpAnimation = (message: string, index: number) => {
        setTimeout(() => {
            setLevelUpMessages(prevMessages => [...prevMessages, message]);
            setTimeout(() => {
                setLevelUpMessages(prevMessages => prevMessages.filter(msg => msg !== message));
            }, 2500); // Message disappears after 2.5 seconds
        }, index * 3000); // Delay each message by 3 seconds times its index
    };

    // Function to submit a quest
    const submitQuest = async (quest: Quest) => {
        if (!playerData || !currentUsername) return;

        try {
            const response = await axios.post(`${API_BASE_URL}/api/submit-quest`, { 
                questId: quest.id, 
                username: currentUsername
            });

            const updatedPlayerData = response.data.user;
            const newLevelUpMessages: string[] = [];

            // Level-up message logic
            if (updatedPlayerData.level.strength > playerData.level.strength) {
                newLevelUpMessages.push(`STRENGTH LEVEL ${playerData.level.strength} -> ${updatedPlayerData.level.strength}`);
            }
            if (updatedPlayerData.level.agility > playerData.level.agility) {
                newLevelUpMessages.push(`AGILITY LEVEL ${playerData.level.agility} -> ${updatedPlayerData.level.agility}`);
            }
            if (updatedPlayerData.level.intelligence > playerData.level.intelligence) {
                newLevelUpMessages.push(`INTELLIGENCE LEVEL ${playerData.level.intelligence} -> ${updatedPlayerData.level.intelligence}`);
            }
            if (updatedPlayerData.level.wisdom > playerData.level.wisdom) {
                newLevelUpMessages.push(`WISDOM LEVEL ${playerData.level.wisdom} -> ${updatedPlayerData.level.wisdom}`);
            }
            if (updatedPlayerData.level.endurance > playerData.level.endurance) {
                newLevelUpMessages.push(`ENDURANCE LEVEL ${playerData.level.endurance} -> ${updatedPlayerData.level.endurance}`);
            }
            if (updatedPlayerData.level.user > playerData.level.user) {
                newLevelUpMessages.push(`YOU LEVELED UP! LEVEL ${playerData.level.user} -> ${updatedPlayerData.level.user}`);
            }

            // Trigger animations for each level-up message with a delay
            newLevelUpMessages.forEach((message, index) => triggerLevelUpAnimation(message, index));

            // Update player data
            setPlayerDataLocal(updatedPlayerData);
            dispatch(setPlayerData(updatedPlayerData));

        } catch (error) {
            console.error('Error submitting quest:', error);
            alert('Failed to submit quest');
        }
    };

    useEffect(() => {
        // Check for saved username when component mounts
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) {
            setCurrentUsername(savedUsername);
            setIsLoggedIn(true);
        }
    }, []); // Empty dependency array means this runs once on mount

    // Update handleLogin to save to localStorage
    const handleLogin = (userData: any) => {
        setPlayerDataLocal(userData);
        dispatch(setPlayerData(userData));
        setCurrentUsername(userData.username);
        setIsLoggedIn(true);
        localStorage.setItem('username', userData.username); // Save username
    };

    const handleLogout = () => {
        setCurrentUsername(null);
        setPlayerDataLocal(null);
        setIsLoggedIn(false);
        localStorage.removeItem('username');
    };

    const bgStyle = {
        top: window.innerWidth <= 768 ? '-20%' : '0',  // More ground on mobile
        height: window.innerWidth <= 768 ? '120%' : '100%'
    };

    return (
        <>
            <OrientationMessage />
            <Parallax 
                bgImage={backgroundImage} 
                strength={0}
                bgImageStyle={bgStyle}
            >
                <Container id="town">
                    <Image src={logo} alt="Logo" className="logo" />
                    
                    {/* Button to open login form - only show if not logged in */}
                    {!currentUsername && (
                        <Button 
                            className="login-button" 
                            onClick={() => setShowLoginForm(prev => !prev)}
                        >
                            Log In / Register
                        </Button>
                    )}

                    {/* Player container with menu icons and exp bar */}
                    <div className={`player-container ${!currentUsername ? 'logged-out' : ''}`}>
                        {/* Experience bar if player data is available */}
                        {playerData && <ExperienceBar playerData={playerData} />}
                        
                        <Button 
                            onClick={() => {
                                setShowCharacterCreation(!showCharacterCreation);
                                setPlayerInfoOpen(false);
                                setQuestLogOpen(false);
                            }}
                            style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                        >
                            <img src={playerGif} alt="Player" className="player" />
                        </Button>

                        {/* Only show menu icons if user is logged in */}
                        {currentUsername && (
                            <div className="menu-icons">
                                {/* Player Menu Button */}
                                <Button onClick={() => {
                                    setPlayerInfoOpen(!playerInfoOpen);
                                    setQuestLogOpen(false);
                                }} 
                                style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
                                    <Image src={player_menu_icon} alt="Player Menu Icon" className="menu-icon mi1" />
                                </Button>
                                {/* Quest Log Menu Button */}
                                <Button
                                    onClick={() => {
                                        setQuestLogOpen(!questLogOpen);
                                        setPlayerInfoOpen(false);
                                    }}
                                    style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
                                    <Image src={quests_menu_icon} alt="Quest Log Menu Icon" className="menu-icon mi2" />
                                </Button>
                                {/* Skills Menu Button */}
                                <Button style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
                                    <Image src={skills_menu_icon} alt="Skills Menu Icon" className="menu-icon mi3" />
                                </Button>
                                {/* Nutrition Menu Button */}
                                <Button 
                                    onClick={() => {
                                        console.log('Nutrition button clicked');
                                        navigate('/nutrition');
                                    }}
                                    style={{ 
                                        background: "none", 
                                        border: "none",
                                        padding: 0,
                                        cursor: "pointer" 
                                    }}
                                >
                                    <Image src={nutrition_menu_icon} alt="Nutrition Menu Icon" className="menu-icon mi4" />
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Display level-up messages */}
                    {levelUpMessages.map((message, index) => (
                        <div key={index} className="level-up-message">
                            {message}
                        </div>
                    ))}

                    {/* Logout button */}
                    {currentUsername && (
                        <Button 
                            onClick={handleLogout}
                            style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                        >
                            <Image src={logout_menu_icon} alt="Logout Menu Icon" className="logout-icon" />
                        </Button>
                    )}

                    {/* Character Creation Menu */}
                    {showCharacterCreation && (
                        <CharacterCreation 
                            isOpen={showCharacterCreation}
                            onClose={() => setShowCharacterCreation(false)}
                        />
                    )}

                    {/* Player Info Menu */}
                    {currentUsername && playerData && (
                        <PlayerInfoMenu 
                            isOpen={playerInfoOpen} 
                            onClose={() => setPlayerInfoOpen(false)} 
                            playerData={playerData}
                        />
                    )}

                    {/* Quest Log Menu */}
                    {currentUsername && (
                        <>
                            <QuestLogMenu 
                                isOpen={questLogOpen} 
                                onClose={() => setQuestLogOpen(false)} 
                                maxQuests={5} 
                            />
                            <AcceptedQuestPanel 
                                onSubmit={submitQuest} 
                            />
                        </>
                    )}

                    {/* LoginForm component */}
                    {!currentUsername && showLoginForm && (
                        <LoginForm
                            onClose={() => setShowLoginForm(false)}
                            onLogin={handleLogin}
                        />
                    )}
                </Container>
            </Parallax>
        </>
    );
}

export default Town;