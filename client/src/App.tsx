import React from 'react';
import { TopBar, SideBar, Feed, RightBar } from './components';
import { useSelector } from 'react-redux';
import { selectTheme } from './features/themeSlice';
import ProfiePage from './pages/profile/ProfiePage';
import HomePage from './pages/Home/HomePage';
import Login from './pages/login/Login';
import Register from './pages/login/register/Register';

function App() {
  const darkThemePreference = useSelector(selectTheme)

  return (
    <div className={darkThemePreference ? 'dark' : ''}>
      {/* <ProfiePage /> */}
      <HomePage />
      {/* <Login /> */}
      {/* <Register /> */}
    </div>
  );
}

export default App;
