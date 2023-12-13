import {createContext} from 'react';

type ThemeContextType = {
    colorMode?: "dark" | "light";
    toggleColorMode?: () => void;
  };
  

export const ThemeContext = createContext<ThemeContextType>({
    colorMode: "light",
    toggleColorMode: () => { },
  });
  