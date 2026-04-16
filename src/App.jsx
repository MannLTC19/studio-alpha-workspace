import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NavigationProvider } from './context/NavigationContext';
import { ChatProvider } from './context/ChatContext';
import { ProfileProvider } from './context/ProfileContext';
import { MeetingsProvider } from './context/MeetingsContext';

import Layout from './components/layout/Layout';
import SignIn from './pages/SignIn';

function AppRoot() {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <SignIn />;
  }

  return (
    <NavigationProvider>
      <ChatProvider>
        <ProfileProvider>
          <MeetingsProvider>
            <Layout />
          </MeetingsProvider>
        </ProfileProvider>
      </ChatProvider>
    </NavigationProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoot />
    </AuthProvider>
  );
}
