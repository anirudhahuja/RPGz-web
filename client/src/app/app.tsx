import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Town from './Town';
import Profile from './menu/profile';
import NutritionTracker from './Nutrition';
import { Provider } from 'react-redux';
import store from './redux/store';

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Initialize state from localStorage
    return !!localStorage.getItem('username');
  });

  return (
    <Provider store={store}>
      <div>
        <Routes>
          <Route path="/" element={<Town setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/town" element={<Town setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/nutrition" element={<NutritionTracker />} />
        </Routes>
        {isLoggedIn && <Profile />}
      </div>
    </Provider>
  );
}

export default App;
