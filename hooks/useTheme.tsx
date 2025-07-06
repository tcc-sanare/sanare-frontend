import Colors from "@/constants/Colors";
import { useUser } from "@/contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  colors: typeof Colors.light;
};

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleDarkMode: () => {},
  colors: Colors.light,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        if (!user) {
          setIsDarkMode(false);
          setIsLoading(false);
          return;
        }

        const savedTheme = await AsyncStorage.getItem(`@themePreference_${user.id}`);
        if (savedTheme !== null) {
          setIsDarkMode(savedTheme === 'dark');
        }
      } catch (error) {
        console.error('Erro ao carregar o tema:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadThemePreference();
  }, [user?.id, user]);

  useEffect(() => {
    const saveThemePreference = async () => {
      try {
        if (user?.id && !isLoading) {
          await AsyncStorage.setItem(
            `@themePreference_${user.id}`,
            isDarkMode ? 'dark' : 'light'
          );
        }
      } catch (error) {
        console.error('Erro ao salvar o tema:', error);
      }
    };

    saveThemePreference();
  }, [isDarkMode, isLoading, user?.id]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const colors = isDarkMode ? Colors.dark : Colors.light;

  if (isLoading && user) {
    return null; 
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
