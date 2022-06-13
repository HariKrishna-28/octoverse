import React from 'react';
import { TopBar } from './components';
import { useSelector } from 'react-redux';
import { selectTheme } from './features/themeSlice';

function App() {
  const darkThemePreference = useSelector(selectTheme)

  return (
    <div className={darkThemePreference ? 'dark' : ''}>
      <TopBar />
    </div>
  );
}

export default App;
