import React from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from './features/themeSlice';
import SearchRoutes from './routes/SearchRoutes';

function App() {
  const darkThemePreference = useSelector(selectTheme)


  return (
    <div className={darkThemePreference ? 'dark' : ''}>
      <SearchRoutes />
    </div>
  );
}

export default App;
