import Town from './Town';
import { Route, Routes, Link } from 'react-router-dom';
import Profile from './profile';

export function App() {
  return (
    <div>
      <Town />
      <Profile />
    </div>
  );
}

export default App;
