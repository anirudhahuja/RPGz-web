import React, { useState, useEffect } from 'react';
import { Container, Card, CloseButton, Tabs, Tab, Button } from 'react-bootstrap';
import questlogBackground from '../../assets/quest_log_background.png';
import { API_BASE_URL } from '../../config';
import axios from 'axios';
import type { Quest, QuestCategory, QuestLogProps } from '@fitness-rpg/shared-types';

// Main component for displaying the quest log menu
const QuestLogMenu: React.FC<QuestLogProps> = ({ isOpen, onClose, maxQuests }) => {
    const [menuVisible, setMenuVisible] = useState(isOpen);
    const [quests, setQuests] = useState<QuestCategory | null>(null);
    const [acceptedQuestIds, setAcceptedQuestIds] = useState<Set<number>>(new Set());

    const fetchQuests = async () => {
        const username = localStorage.getItem('username');
        if (!username) {
            console.error('No username found');
            return;
        }

        try {
            const response = await axios.get<QuestCategory>(`${API_BASE_URL}/api/quests?username=${username}`);
            
            // Initialize acceptedQuestIds with quests that are already accepted in the database
            const newAcceptedIds = new Set<number>();
            
            Object.values(response.data).forEach((questArray: Quest[]) => {
                questArray.forEach((quest: Quest) => {
                    if (quest.accepted) {
                        newAcceptedIds.add(quest.id);
                    }
                });
            });
            
            setAcceptedQuestIds(newAcceptedIds);
            setQuests(response.data);
        } catch (error) {
            console.error('Error fetching quests:', error);
        }
    };

    const handleAcceptQuest = async (quest: Quest) => {
        try {
            const username = localStorage.getItem('username');
            if (!username) {
                console.error('No username found');
                return;
            }

            const response = await axios.post(`${API_BASE_URL}/api/accept-quest`, {
                username,
                questId: quest.id
            });

            if (response.status === 201) {
                setAcceptedQuestIds(prev => new Set(prev).add(quest.id));
                await fetchQuests();
            }
        } catch (error: any) {
            console.error('Error accepting quest:', error.response?.data?.error || error.message);
            alert(error.response?.data?.error || 'Failed to accept quest');
        }
    };

    useEffect(() => { 
        if (isOpen) {
            setMenuVisible(true);
            fetchQuests();
        } else {
            setTimeout(() => setMenuVisible(false), 300);
        }
    }, [isOpen]);
    

    // Return null if the menu is not visible or quests are not loaded
    if (!menuVisible || !quests) return null;

    // Render a button for each quest with appropriate state and actions
    const renderQuestButton = (quest: Quest) => {
        // Check for completed quest first
        if (quest.completed) {
            return (
                <Button 
                    variant="secondary"
                    className="quest-log-button quest-completed"
                    disabled
                >
                    Completed
                </Button>
            );
        }

        // Then check for accepted quest
        const isAccepted = acceptedQuestIds.has(quest.id);
        const acceptedCount = acceptedQuestIds.size;
        const isLimitReached = acceptedCount >= maxQuests;

        if (isAccepted) {
            return (
                <Button 
                    variant="success"
                    className="quest-log-button quest-accepted"
                    disabled
                >
                    Accepted
                </Button>
            );
        }

        return (
            <Button 
                variant="primary"
                className="quest-log-button"
                onClick={() => handleAcceptQuest(quest)}
                disabled={isLimitReached}
            >
                {isLimitReached ? "Limit Reached" : "Accept Quest"}
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
                            {(quests?.strength || []).map((quest: Quest) => (
                                <h5 key={quest.id}>
                                    <b>{quest.name}</b> - {quest.description} <br />
                                    <b>Reward:</b> {quest.xp} {quest.primaryStatGain} experience
                                    {renderQuestButton(quest)}
                                </h5>
                            ))}
                        </Card.Body>
                    </Tab>
                    <Tab eventKey="agility" title="AGI">
                        <Card.Body className="quest-log-body">
                            {(quests?.agility || []).map((quest: Quest) => (
                                <h5 key={quest.id}>
                                    <b>{quest.name}</b> - {quest.description} <br />
                                    <b>Reward:</b> {quest.xp} {quest.primaryStatGain} experience <br />
                                    {renderQuestButton(quest)}
                                </h5>
                            ))}
                        </Card.Body>
                    </Tab>
                    <Tab eventKey="intelligence" title="INT">
                        <Card.Body className="quest-log-body">
                            {(quests?.intelligence || []).map((quest: Quest) => (
                                <h5 key={quest.id}>
                                    <b>{quest.name}</b> - {quest.description} <br />
                                    <b>Reward:</b> {quest.xp} {quest.primaryStatGain} experience <br />
                                    {renderQuestButton(quest)}
                                </h5>
                            ))}
                        </Card.Body>
                    </Tab>
                    <Tab eventKey="wisdom" title="WIS">
                        <Card.Body className="quest-log-body">
                            {(quests?.wisdom || []).map((quest: Quest) => (
                                <h5 key={quest.id}>
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