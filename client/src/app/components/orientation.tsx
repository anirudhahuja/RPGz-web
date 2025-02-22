import React from 'react';
import { Image } from 'react-bootstrap';

const OrientationMessage: React.FC = () => {
  return (
    <div className="portrait-overlay">
      <Image 
        src="../../assets/slime.gif"
        alt="Rotate device"
        className="rotate-device-image"
      />
      <h2>Please Rotate Your Device</h2>
      <p>Portrait mode is still under development. Please rotate your device to continue. Thank you!</p>
    </div>
  );
};

export default OrientationMessage; 