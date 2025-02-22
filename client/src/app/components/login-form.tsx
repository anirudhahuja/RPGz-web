import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

interface UserData {
    username: string;
    class: string;
    health: number;
    stamina: number;
    level: {
        user: number;
        strength: number;
        agility: number;
        intelligence: number;
        wisdom: number;
        endurance: number;
    };
    xp: {
        user: number;
        strength: number;
        agility: number;
        intelligence: number;
        wisdom: number;
        endurance: number;
    };
    levelRequirements: {
        user: number[];
        strength: number[];
        agility: number[];
        intelligence: number[];
        wisdom: number[];
        endurance: number[];
    };
}

interface LoginFormProps {
    onClose: () => void;
    onLogin: (userData: UserData) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleLogin = async () => {
        try {
            // Send credentials to backend for verification
            const loginResponse = await axios.post(`${API_BASE_URL}/api/login`, {
                username,
                password
            });

            // If login successful, fetch user profile
            const userResponse = await axios.get(`${API_BASE_URL}/api/user-info?username=${username}`);
            onLogin(userResponse.data);
            onClose();
        } catch (error: any) {
            console.error('Error during login:', error.response?.data || error.message);
            // Show specific error message based on status code
            if (error.response?.status === 401) {
                alert('Invalid username or password');
            } else if (error.response?.status === 404) {
                alert('User not found');
            } else {
                alert('Login failed. Please try again.');
            }
        }
    };

    const handleRegister = async () => {
        try {
            // Validate inputs
            if (!username || !email || !password) {
                alert('All fields are required');
                return;
            }

            // Basic email validation
            if (!email.includes('@')) {
                alert('Please enter a valid email address');
                return;
            }

            await axios.post(`${API_BASE_URL}/api/register`, {
                username,
                email,
                password,
            });
            
            const responseAfterRegistration = await axios.get(`${API_BASE_URL}/api/user-info?username=${username}`);
            onLogin(responseAfterRegistration.data);
            onClose();
        } catch (error: any) {
            console.error('Error during registration:', error.response?.data || error.message);
            // Show specific error message based on the error
            if (error.response?.data?.error?.includes('already exists')) {
                alert('Username or email already exists');
            } else {
                alert('Registration failed. Please try again.');
            }
        }
    };

    return (
        <div className="login-register-container">
            <Tabs defaultActiveKey="login" className="login-register-tabs">
                <Tab eventKey="login" title="LOG IN">
                    <div className="login-form">
                        <h3 className="login-form-title">Welcome Back!</h3>
                        <p className="login-form-subtext"> Username or Email </p>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="login-form-input"
                        />
                        <p className="login-form-subtext"> Password </p>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="login-form-input"
                        />
                        <p className="login-form-subtext login-form-forgot-password"> Forgot Password? </p>
                        <button className="login-form-button" onClick={handleLogin}>Log In</button>
                    </div>
                </Tab>
                <Tab eventKey="register" title="REGISTER">
                    <div className="register-form">
                        <h3 className="register-form-title">Start your Journey!</h3>
                        <p className="register-form-subtext"> Username </p>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="register-form-input"
                        />
                        <p className="register-form-subtext"> Email </p>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="register-form-input"
                        />
                        <p className="register-form-subtext"> Password </p>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="register-form-input"
                        />
                        <button className="register-form-button" onClick={handleRegister}>Register</button>
                    </div>
                </Tab>
            </Tabs>
        </div>
    );
};

export default LoginForm;