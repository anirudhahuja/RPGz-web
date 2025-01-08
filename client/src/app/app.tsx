import React from 'react';
import Town from './Town';
import Profile from './profile';
import { Provider } from 'react-redux';
import store from './store';

export function App() {
  return (
    <Provider store={store}>
      <div>
        <Town />
        <Profile />
      </div>
    </Provider>
  );
}

export default App;
