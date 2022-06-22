import React from 'react';
import { TopBar, SideBar, Feed, RightBar } from './components';
import { useSelector } from 'react-redux';
import { selectTheme } from './features/themeSlice';
import ProfiePage from './pages/profile/ProfiePage';
import HomePage from './pages/Home/HomePage';
import Login from './pages/login/Login';
import Register from './pages/login/register/Register';
import SearchRoutes from './routes/SearchRoutes';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

function App() {
  const darkThemePreference = useSelector(selectTheme)
  // @ts-ignore
  const [user, loading, error] = useAuthState(auth)

  return (
    <div className={darkThemePreference ? 'dark' : ''}>
      <SearchRoutes />
    </div>
  );
}

export default App;
