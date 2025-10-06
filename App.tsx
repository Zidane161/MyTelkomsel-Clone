import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './src/context/Theme';
import RootNavigation from './src/navigation/StackNavigator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';

const queryClient = new QueryClient();

export default function App() {
  return (
    <Provider store={store}>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
      </QueryClientProvider>
    </ThemeProvider>
    </Provider>
  );
}
