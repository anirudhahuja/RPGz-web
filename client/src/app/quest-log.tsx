import React, { useState, useEffect } from 'react';
import { Container, Card, CloseButton, Tabs, Tab, Button } from 'react-bootstrap';
import questlogBackground from '../assets/quest_log_background.png';
import { API_BASE_URL } from '../config';
import axios from 'axios';
import { render } from 'react-dom';

// Define the properties and structure for quests and quest categories
interface QuestProps {
    isOpen: boolean;
    onClose: () => void;
    acceptQuest: (quest: Quest) => void;
    acceptedCount: number;
    maxQuests: number;
}

export interface Quest {
    id: number;
    name: string;
    description: string;
    xp: number;
    primaryStatGain: string;
}

interface QuestCategory {
    strength: Quest[];
    agility: Quest[];
    intelligence: Quest[];
    wisdom: Quest[];
    endurance: Quest[];
}

// Main component for displaying the quest log menu
const QuestLogMenu = ({ isOpen, onClose, acceptQuest, acceptedCount, maxQuests }: QuestProps) => {
    const [menuVisible, setMenuVisible] = useState(isOpen);
    const [quests, setQuests] = useState<QuestCategory | null>(null);
    const [acceptedQuestIds, setAcceptedQuestIds] = useState<Set<number>>(new Set());

    // Handle quest acceptance and update state
    const handleAcceptQuest = (quest: Quest) => {
        acceptQuest(quest);
        setAcceptedQuestIds(prev => new Set(prev).add(quest.id));
    };

    // Fetch quests from the API when the menu is opened
    useEffect(() => { 
        if (isOpen) {
            setMenuVisible(true);
            axios.get(`${API_BASE_URL}/api/quests`)
                .then(response => {
                    console.log('Fetched quests:', response.data); // Debug fetched data
                    setQuests(response.data);
                })
                .catch(error => console.error('Error fetching quests:', error));
        } else {
            setTimeout(() => setMenuVisible(false), 300);
        }
    }, [isOpen]);
    

    // Return null if the menu is not visible or quests are not loaded
    if (!menuVisible || !quests) return null;

    // Render a button for each quest with appropriate state and actions
    const renderQuestButton = (quest: Quest) => {
        const isAccepted = acceptedQuestIds.has(quest.id);
        const isLimitReached = acceptedCount >= maxQuests;
        return (
            <Button 
                variant={isAccepted ? "success" : "primary"}
                className={`quest-log-button ${isAccepted ? 'quest-accepted' : ''}`}
                onClick={() => handleAcceptQuest(quest)}
                disabled={acceptedCount >= maxQuests || isAccepted}
            >
                {isAccepted ? "Quest Accepted" : isLimitReached ? "Limit Reached" : "Accept Quest"}
            </Button>
        );
    };

    // Render the quest log menu with tabs for each quest category
    return (
        <Container className="parchment-panel">
            <Card 
                className={`quest-info ${isOpen ? 'open' : 'close'}`}
                style={{ 
                    backgroundImage: `url(${questlogBackground})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundColor: 'transparent',
                    border: 'none',
                    opacity: 0.9,
                }}
            >
                <Tabs defaultActiveKey="strength" id="uncontrolled-tab-example" className="quest-log-tabs">
                    <Tab eventKey="strength" title="STR">
                        <Card.Body className="quest-log-body">
                            {(quests?.strength || []).map((quest: Quest, index) => (
                                <h5 key={index}>
                                    <b>{quest.name}</b> - {quest.description} <br />
                                    <b>Reward:</b> {quest.xp} {quest.primaryStatGain} experience
                                    {renderQuestButton(quest)}
                                </h5>
                            ))}
                        </Card.Body>
                    </Tab>
                    <Tab eventKey="agility" title="AGI">
                        <Card.Body className="quest-log-body">
                            {(quests?.agility || []).map((quest: Quest, index) => (
                                <h5 key={index}>
                                    <b>{quest.name}</b> - {quest.description} <br />
                                    <b>Reward:</b> {quest.xp} {quest.primaryStatGain} experience <br />
                                    {renderQuestButton(quest)}
                                </h5>
                            ))}
                        </Card.Body>
                    </Tab>
                    <Tab eventKey="intelligence" title="INT">
                        <Card.Body className="quest-log-body">
                            {(quests?.intelligence || []).map((quest: Quest, index) => (
                                <h5 key={index}>
                                    <b>{quest.name}</b> - {quest.description} <br />
                                    <b>Reward:</b> {quest.xp} {quest.primaryStatGain} experience <br />
                                    {renderQuestButton(quest)}
                                </h5>
                            ))}
                        </Card.Body>
                    </Tab>
                    <Tab eventKey="wisdom" title="WIS">
                        <Card.Body className="quest-log-body">
                            {(quests?.wisdom || []).map((quest: Quest, index) => (
                                <h5 key={index}>
                                    <b>{quest.name}</b> - {quest.description} <br />
                                    <b>Reward:</b> {quest.xp} {quest.primaryStatGain} experience <br />
                                    {renderQuestButton(quest)}
                                </h5>
                            ))}
                        </Card.Body>
                    </Tab>
                </Tabs>
                <CloseButton className="quest-log-close-button" onClick={onClose} />
            </Card>
        </Container>
    );
};

export default QuestLogMenu;