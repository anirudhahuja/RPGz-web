import React from 'react';
import { Image } from 'react-bootstrap';
import logo from '../../assets/logo.png';
import slime from '../../assets/slime.gif';

const OrientationMessage: React.FC = () => {
  return (
    <div className="portrait-overlay">
        <Image src={logo} alt="Logo" className="rotate-device-logo" />
        <Image src={slime} alt="Rotate device" className="rotate-device-image" />
        <h2>Please Rotate Your Device</h2>
        <p>Portrait mode is still under development. Please rotate your device to continue. Thank you!</p>
        </div>
    );
};

export default OrientationMessage; 