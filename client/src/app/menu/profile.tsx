import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { resetLevelUp } from '../redux/levelUpSlice';
import profilePicture from '../../assets/profile_picture.png';

const Profile = () => {
  const levelUp = useSelector((state: RootState) => state.levelUp.levelUp);
  const dispatch = useDispatch();
  const playerData = useSelector((state: RootState) => state.levelUp.playerData);
  const [animate, setAnimate] = useState<boolean>(false);

  useEffect(() => {
    if (levelUp) {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
        dispatch(resetLevelUp());
      }, 500); // Reset animation after 0.5s
    }
  }, [levelUp, dispatch]);

  return (
    <div className="profile-container">
      <img src={profilePicture} alt="Profile Picture" className="profile-picture" />
      <span className="profile-name"> {playerData?.name} </span>
      <span className={`profile-level ${animate ? 'level-up' : ''}`}>Level {playerData?.level.user}</span>
    </div>
  );
};

export default Profile;