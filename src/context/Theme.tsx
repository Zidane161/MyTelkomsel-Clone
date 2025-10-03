// src/context/Theme.tsx
import { DefaultTheme } from '@react-navigation/native';
import React, { createContext, useState } from 'react';

export type ThemeType = {
  mode: 'light' | 'dark';
  background: string;
  text: string;
  header: string;
  card: string;
  primary: string;
};

export type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
};

const defaultTheme: ThemeType = {
  mode: 'light',
  background: '#ffffff',
  text: '#000000',
  header: '#f3f3f3',
  card: '#eaeaea',
  primary: '#fd0000',
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  toggleTheme: () => {},
});

type ThemeProviderProps = { children: React.ReactNode };

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const lightTheme: ThemeType = {
    mode: 'light',
    background: '#ffffff',
    text: '#000000',
    header: '#f3f3f3',
    card: '#eaeaea',
    primary: '#fd0000',
  };

  const darkTheme: ThemeType = {
    mode: 'dark',
    background: '#000000ff',
    text: '#ffffff',
    header: '#1e1e1e',
    card: '#2a2a2a',
    primary: '#fd0000ff',
  };

  const [theme, setTheme] = useState<ThemeType>(lightTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme.mode === 'light' ? darkTheme : lightTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
