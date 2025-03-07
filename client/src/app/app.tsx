import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Town from './Town';
import Profile from './menu/profile';
import NutritionTracker from './Nutrition';
import { Provider } from 'react-redux';
import store from './redux/store';

function AppContent() {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return !!localStorage.getItem('username');
    });
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const username = localStorage.getItem('username');
        setIsLoggedIn(!!username);
        
        if (!username && location.pathname === '/nutrition') {
            console.log('Redirecting to home - not logged in');
            navigate('/');
        }
    }, [location.pathname, navigate]);

    console.log('Current path:', location.pathname);
    console.log('Is logged in:', isLoggedIn);

    return (
        <div>
            <Routes>
                <Route path="/" element={<Town setIsLoggedIn={setIsLoggedIn} />} />
                <Route 
                    path="/nutrition" 
                    element={ isLoggedIn ? <NutritionTracker /> : null } 
                />
            </Routes>
            {isLoggedIn && <Profile />}
        </div>
    );
}

export function App() {
    return (
        <Provider store={store}>
            <AppContent />
        </Provider>
    );
}

export default App;
