/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, 'isDarkMode');

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  return (
    <DarkModeContext.Provider value={(isDarkMode, toggleDarkMode)}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const ctx = useContext(DarkModeContext);

  if (ctx === undefined)
    throw new Error('useDarkMode must be used within a DarkModeProvider');

  return ctx;
}

export { DarkModeProvider, useDarkMode };
