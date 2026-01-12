// src/context/ThemeContext.tsx
 import { createContext, useContext, useState, useEffect } from 'react';
 import type { ReactNode } from 'react'

 // 1. Define your theme names (make sure these match your data-theme attributes in main.scss)
 type ThemeName =
  'light' | 'dark' | 'dark-purple' | 'ocean-blue' |
  'forest-green' | 'invert'
  ; // Adjust theme names as needed

 // 2. Define the shape of the data that your context will provide
 interface ThemeContextType {
   theme: ThemeName;
      setTheme: (theme: ThemeName) => void;
    }
   
    // 3. Create the Context (use undefined as initial, then check for it in useTheme)
    const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
   
    // 4. Create the ThemeProvider Component
    interface ThemeProviderProps {
      children: ReactNode; // ReactNode is a type for anything renderable by React
    }
   
    export const ThemeProvider = ({ children }: ThemeProviderProps) => {
      // Manage the theme state, initializing from localStorage or a default
      const [theme, setTheme] = useState<ThemeName>(() => {
        return (localStorage.getItem('app-theme') as ThemeName) || 'default-light';
      });
   
      // Effect to apply the data-theme attribute to the body and save to localStorage
      useEffect(() => {
        document.body.setAttribute('data-bs-theme', theme);
        localStorage.setItem('app-theme', theme);
      }, [theme]); // Re-run this effect whenever the 'theme' state changes
   
      // The value that will be provided to any component that consumes this context
      const contextValue: ThemeContextType = {
        theme,
        setTheme,
      };
   
      return (
        <ThemeContext.Provider value={contextValue}>
          {children}
        </ThemeContext.Provider>
      );
    };
   
    // 5. Create a custom hook to easily consume the theme context
    export const useTheme = () => {
      const context = useContext(ThemeContext);
      if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
      }
      return context;
    };