// import { API_BASE_URL } from './config';

// // Fetch all users
// export async function fetchUsers() {
// 	try {
// 		const response = await fetch(`${API_BASE_URL}/api/users`);
// 		if (!response.ok) {
// 			throw new Error('Failed to fetch users');
// 		}
// 		return await response.json();
// 	} catch (error) {
// 		console.error('Error fetching users:', error);
// 		throw error;
// 	}
// }

// // Register a new user
// export async function registerUser(userData) {
// 	try {
// 		const response = await fetch(`${API_BASE_URL}/api/register`, {
// 			method: 'POST',
// 			headers: { 'Content-Type': 'application/json' },
// 			body: JSON.stringify(userData),
// 		});
// 		if (!response.ok) {
// 			throw new Error('Failed to register user');
// 		}
// 		return await response.json();
// 	} catch (error) {
// 		console.error('Error registering user:', error);
// 		throw error;
// 	}
// }

// // Login a user
// export async function loginUser(credentials) {
// 	try {
// 		const response = await fetch(`${API_BASE_URL}/api/login`, {
// 			method: 'POST',
// 			headers: { 'Content-Type': 'application/json' },
// 			body: JSON.stringify(credentials),
// 		});
// 		if (!response.ok) {
// 			throw new Error('Failed to login');
// 		}
// 		return await response.json();
// 	} catch (error) {
// 		console.error('Error logging in:', error);
// 		throw error;
// 	}
// }

// // Fetch specific user info by name
// export async function fetchUserInfo(username) {
// 	try {
// 		const response = await fetch(`${API_BASE_URL}/api/user-info?username=${encodeURIComponent(username)}`);
// 		if (!response.ok) {
// 			throw new Error('Failed to fetch user info');
// 		}
// 		return await response.json();
// 	} catch (error) {
// 		console.error('Error fetching user info:', error);
// 		throw error;
// 	}
// }

// // Fetch all quests
// export async function fetchQuests(username) {
// 	try {
// 		const response = await fetch(`${API_BASE_URL}/api/quests${username ? `?username=${encodeURIComponent(username)}` : ''}`);
// 		if (!response.ok) {
// 			throw new Error('Failed to fetch quests');
// 		}
// 		return await response.json();
// 	} catch (error) {
// 		console.error('Error fetching quests:', error);
// 		throw error;
// 	}
// }

// // Accept a quest
// export async function acceptQuest(data) {
// 	try {
// 		const response = await fetch(`${API_BASE_URL}/api/accept-quest`, {
// 			method: 'POST',
// 			headers: { 'Content-Type': 'application/json' },
// 			body: JSON.stringify(data),
// 		});
// 		if (!response.ok) {
// 			throw new Error('Failed to accept quest');
// 		}
// 		return await response.json();
// 	} catch (error) {
// 		console.error('Error accepting quest:', error);
// 		throw error;
// 	}
// }

// // Submit a quest
// export async function submitQuest(data) {
// 	try {
// 		const response = await fetch(`${API_BASE_URL}/api/submit-quest`, {
// 			method: 'POST',
// 			headers: { 'Content-Type': 'application/json' },
// 			body: JSON.stringify(data),
// 		});
// 		if (!response.ok) {
// 			throw new Error('Failed to submit quest');
// 		}
// 		return await response.json();
// 	} catch (error) {
// 		console.error('Error submitting quest:', error);
// 		throw error;
// 	}
// }

// // Fetch accepted quests
// export async function fetchAcceptedQuests(username) {
// 	try {
// 		const response = await fetch(`${API_BASE_URL}/api/accepted-quests?username=${encodeURIComponent(username)}`);
// 		if (!response.ok) {
// 			throw new Error('Failed to fetch accepted quests');
// 		}
// 		return await response.json();
// 	} catch (error) {
// 		console.error('Error fetching accepted quests:', error);
// 		throw error;
// 	}
// }

// // Add more API functions as needed 