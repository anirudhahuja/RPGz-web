import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Town from './Town';
import Profile from './menu/profile';
import NutritionTracker from './Nutrition';
import Test1 from './Test1';
import { Provider } from 'react-redux';
import store from './redux/store';

export function App() {
  return (
    <Provider store={store}>
      <div>
        <Routes>
          <Route path="/" element={<Town />} />
          <Route path="/town" element={<Town />} />
          <Route path="/nutrition" element={<NutritionTracker />} />
          <Route path="/test1" element={<Test1 />} />
        </Routes>
        <Profile />
      </div>
    </Provider>
  );
}

export default App;
