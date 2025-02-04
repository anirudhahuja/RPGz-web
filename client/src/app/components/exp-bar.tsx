import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { PlayerData } from '../redux/levelUpSlice';

interface ExperienceBarProps {
    playerData: PlayerData;
}

const ExperienceBar = ({ playerData }: ExperienceBarProps) => {
    const userLevelRequirements = playerData?.levelRequirements.user ?? [];
    const currentXP = playerData?.xp.user ?? 0;
    const currentUserLevel = playerData?.level.user ?? 1; 

    const totalForNextLevel = userLevelRequirements[currentUserLevel] || 1; // Prevent division by zero

    return (
        <div className="exp-bar-container">
            <ProgressBar 
                className="exp-bar"
                now={currentXP} 
                max={totalForNextLevel}
                variant="success"
                animated
            />
            <div className="progress-label">
                {`${currentXP}/${totalForNextLevel} Stat Points`}
            </div>
        </div>
    );
};

export default ExperienceBar;