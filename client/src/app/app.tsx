import React from 'react';
import Town from './Town';
import Profile from './menu/profile';
import { Provider } from 'react-redux';
import store from './redux/store';

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
