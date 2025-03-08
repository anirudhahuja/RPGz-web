export interface UserCredentials {
    username: string;
    password: string;
    email?: string;
}

export interface LoginResponse {
    success: boolean;
    message?: string;
    userData?: UserData;
    token?: string;
}

export interface UserData {
    username: string;
    email: string;
    createdAt: string;
    lastLogin: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: UserData | null;
    loading: boolean;
    error: string | null;
} 