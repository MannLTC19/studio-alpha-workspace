import React, { useState, createContext, useContext, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { validateAuthInput, toSafeAuthErrorMessage } from '../utils/security';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        
        if (session?.user) {
          setIsAuthenticated(true);
          setUser(session.user);
        }
      } catch (err) {
        console.error('Session check error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setIsAuthenticated(true);
          setUser(session.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  const login = async (email, password) => {
    setError(null);
    const validation = validateAuthInput({ email, password, isRegister: false });
    if (!validation.valid) {
      setError(validation.message);
      return { success: false, error: validation.message };
    }

    const { email: safeEmail, password: safePassword } = validation.sanitized;

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: safeEmail,
        password: safePassword,
      });
      if (signInError) throw signInError;
      setIsAuthenticated(true);
      setUser(data.user);
      return { success: true };
    } catch (err) {
      const safeMessage = toSafeAuthErrorMessage(err);
      setError(safeMessage);
      return { success: false, error: safeMessage };
    }
  };

  const register = async (email, password, fullName) => {
    setError(null);
    const validation = validateAuthInput({ email, password, fullName, isRegister: true });
    if (!validation.valid) {
      setError(validation.message);
      return { success: false, error: validation.message };
    }

    const {
      email: safeEmail,
      password: safePassword,
      fullName: safeFullName,
    } = validation.sanitized;

    try {
      // Sign up the user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: safeEmail,
        password: safePassword,
      });
      if (signUpError) throw signUpError;

      // Store user profile in the database
      if (authData.user) {
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            full_name: safeFullName,
            email: safeEmail,
            created_at: new Date().toISOString(),
          });

        if (insertError && !insertError.message.includes('duplicate')) {
          console.warn('Profile insert warning:', insertError);
        }
      }

      setIsAuthenticated(true);
      setUser(authData.user);
      return { success: true };
    } catch (err) {
      const safeMessage = toSafeAuthErrorMessage(err);
      setError(safeMessage);
      return { success: false, error: safeMessage };
    }
  };

  const logout = async () => {
    setError(null);
    try {
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) throw signOutError;
      setIsAuthenticated(false);
      setUser(null);
      return { success: true };
    } catch (err) {
      const safeMessage = toSafeAuthErrorMessage(err);
      setError(safeMessage);
      return { success: false, error: safeMessage };
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user,
      loading,
      error,
      login, 
      register,
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
