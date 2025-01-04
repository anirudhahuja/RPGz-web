import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Quest } from './quest-log';

interface AcceptedQuestPanelProps {
    acceptedQuests: Quest[];
    onSubmit: () => void;
}

const AcceptedQuestPanel: React.FC<AcceptedQuestPanelProps> = ({ acceptedQuests, onSubmit }) => {
    const maxQuests = 5;

    return (
        <Card className="accepted-quests-panel">
            <Card.Header className="accepted-quests-header">
                <h2>Accepted Quests ({acceptedQuests.length}/{maxQuests}) <hr className="accepted-quests-divider" /> </h2>
            </Card.Header>
            <Card.Body className="accepted-quests-body">
                {acceptedQuests.map((quest, index) => (
                    <h5 key={index}>
                        <b>{quest.name}</b> - {quest.description} <br />
                        <b>Reward:</b> {quest.xp} {quest.primaryStatGain} experience <br />
                        <Button
                            variant="success"
                            onClick={onSubmit}
                            className="accepted-quests-submit-button"
                        >
                            Submit Quest
                        </Button>
                        <br /> <br />
                    </h5>
                ))}
            </Card.Body>
        </Card>
    );
};

export default AcceptedQuestPanel;