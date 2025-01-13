import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

const SaveUserButton = () => {
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track errors
  const [success, setSuccess] = useState<string | null>(null); // Track success message

  const saveUser = async () => {
    const userData = {
        name: "John Doe",
        class: "Novice",
        health: 100,
        stamina: 50,
        level: {
            user: 1,
            strength: 1,
            agility: 1,
            intelligence: 1,
            wisdom: 1,
            endurance: 1
        },
        xp: {
            user: 5,
            strength: 0,
            agility: 0,
            intelligence: 0,
            wisdom: 0,
            endurance: 0
        },
        levelRequirements: {
            user: [0, 8, 12, 16, 22],
            strength: [0, 60, 100, 140, 200],
            agility: [0, 60, 100, 140, 200],
            intelligence: [0, 60, 100, 140, 200],
            wisdom: [0, 60, 100, 140, 200],
            endurance: [0, 60, 100, 150, 200]
        }
    };

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
        console.log('Sending user data:', userData); // Log the data being sent
        const response = await axios.post(`${API_BASE_URL}/api/save-user`, userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setSuccess('User saved successfully!');
        console.log('User saved successfully:', response.data);
    } catch (error: any) {
        console.error('Error saving user:', error);
        const message = error.response?.data?.error || 'An error occurred while saving the user.';
        setError(message);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={saveUser} disabled={loading}>
        {loading ? 'Saving...' : 'Save User'}
      </button>
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default SaveUserButton;
