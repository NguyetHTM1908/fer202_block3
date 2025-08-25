import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();


export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};


export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(false);

 
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDark(savedTheme === 'dark');
    }
  }, []);

 
  useEffect(() => {
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

 
  const toggleTheme = () => {
    setDark(prev => !prev);
  };

  const value = {
    dark,        
    toggleTheme  
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
