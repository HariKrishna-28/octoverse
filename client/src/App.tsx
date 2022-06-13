import React from 'react';
import { TopBar, SideBar, Feed, RightBar } from './components';
import { useSelector } from 'react-redux';
import { selectTheme } from './features/themeSlice';

function App() {
  const darkThemePreference = useSelector(selectTheme)

  return (
    <div className={darkThemePreference ? 'dark' : ''}>
      <div>
        <TopBar />
      </div>
      <div className='flex h-screen w-full '>
        <div
          className='hidden md:block lg:block w-1/3'>
          <SideBar />
        </div>
        <div className='w-full'>
          <Feed />
        </div>
        <div className='hidden md:block lg:block w-1/3'>
          <RightBar />
        </div>
      </div>
    </div>
  );
}

export default App;
