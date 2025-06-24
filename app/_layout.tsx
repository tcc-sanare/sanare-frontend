import { CadastroProvider } from '@/contexts/cadastroContext';
import { UserProvider } from '@/contexts/UserContext';
import { ThemeProvider } from '@/hooks/useTheme';
import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <CadastroProvider>
      <UserProvider>
        <ThemeProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            />
          </GestureHandlerRootView>
        </ThemeProvider>
      </UserProvider>
    </CadastroProvider>
  );
}

