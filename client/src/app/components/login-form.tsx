import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { UserCredentials, LoginResponse, UserData, PlayerData } from '@fitness-rpg/shared-types';

interface LoginFormProps {
    onClose: () => void;
    onLogin: (userData: PlayerData) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, onLogin }) => {
    const [credentials, setCredentials] = useState<UserCredentials>({
        username: '',
        password: '',
        email: ''
    });

    const handleLogin = async () => {
        try {
            const { email, ...loginCredentials } = credentials;
            // Send credentials to backend for verification
            const response = await axios.post<LoginResponse>(`${API_BASE_URL}/api/login`, loginCredentials);

            // If login successful, fetch user profile
            const userResponse = await axios.get<PlayerData>(`${API_BASE_URL}/api/user-info?username=${credentials.username}`);
            onLogin(userResponse.data);
            onClose();
        } catch (error) {
            console.error('Error during login:', error instanceof Error ? error.message : String(error));
            // Show specific error message based on status code
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    alert('Invalid username or password');
                } else if (error.response.status === 404) {
                    alert('User not found');
                } else {
                    alert('Login failed. Please try again.');
                }
            } else {
                alert('Login failed. Please try again.');
            }
        }
    };

    const handleRegister = async () => {
        try {
            // Validate inputs
            if (!credentials.username || !credentials.email || !credentials.password) {
                alert('All fields are required');
                return;
            }

            // Basic email validation
            if (!credentials.email.includes('@')) {
                alert('Please enter a valid email address');
                return;
            }

            await axios.post<LoginResponse>(`${API_BASE_URL}/api/register`, credentials);
            
            const responseAfterRegistration = await axios.get<PlayerData>(`${API_BASE_URL}/api/user-info?username=${credentials.username}`);
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
        <Tabs defaultActiveKey="login" className="mb-3">
            <Tab eventKey="login" title="Login">
                <div className="p-3">
                    <input
                        type="text"
                        placeholder="Username"
                        value={credentials.username}
                        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                        className="form-control mb-3"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        className="form-control mb-3"
                    />
                    <button onClick={handleLogin} className="btn btn-primary w-100">
                        Login
                    </button>
                </div>
            </Tab>
            <Tab eventKey="register" title="Register">
                <div className="p-3">
                    <input
                        type="text"
                        placeholder="Username"
                        value={credentials.username}
                        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                        className="form-control mb-3"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={credentials.email || ''}
                        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                        className="form-control mb-3"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        className="form-control mb-3"
                    />
                    <button onClick={handleRegister} className="btn btn-primary w-100">
                        Register
                    </button>
                </div>
            </Tab>
        </Tabs>
    );
};

export default LoginForm;