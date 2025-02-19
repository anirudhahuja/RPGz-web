import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { RootState } from '../redux/store';
import { resetLevelUp, setPlayerData } from '../redux/levelUpSlice';
import { API_BASE_URL } from '../../config';
import profilePicture from '../../assets/profile_picture.png';

const Profile = () => {
    const levelUp = useSelector((state: RootState) => state.levelUp.levelUp);
    const playerData = useSelector((state: RootState) => state.levelUp.playerData);
    const dispatch = useDispatch();
    const [animate, setAnimate] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPlayerData = async () => {
            const username = localStorage.getItem('username');
            if (!username) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${API_BASE_URL}/api/user-info?username=${username}`);
                const data = response.data;
                const parsedData = {
                    ...data,
                    level: typeof data.level === 'string' ? JSON.parse(data.level) : data.level,
                    xp: typeof data.xp === 'string' ? JSON.parse(data.xp) : data.xp,
                    levelRequirements: typeof data.levelRequirements === 'string' ? 
                        JSON.parse(data.levelRequirements) : data.levelRequirements,
                };
                dispatch(setPlayerData(parsedData));
            } catch (error) {
                console.error('Error fetching player data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlayerData();
    }, [dispatch]);

    useEffect(() => {
        if (levelUp) {
            setAnimate(true);
            setTimeout(() => {
                setAnimate(false);
                dispatch(resetLevelUp());
            }, 500);
        }
    }, [levelUp, dispatch]);

    if (!localStorage.getItem('username')) {
        return null;
    }

    if (isLoading || !playerData || !playerData.username || playerData.username === 'Unknown') {
        return <div className="profile-container">Loading...</div>;
    }

    return (
        <div className="profile-container">
            <img src={profilePicture} alt="Profile Picture" className="profile-picture" />
            <span className="profile-name">{playerData.username}</span>
            <span className={`profile-level ${animate ? 'level-up' : ''}`}>
                Level {playerData.level.user}
            </span>
        </div>
    );
};

export default Profile;