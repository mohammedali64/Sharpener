import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase'; // Import your Firebase auth instance

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to easily access the auth context
export function useAuth() {
  return useContext(AuthContext);
}

// AuthProvider component to wrap your application
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null); // Stores the current authenticated user
  const [loading, setLoading] = useState(true); // Indicates if the authentication state is still being determined
  const [authError, setAuthError] = useState(null); // To store authentication errors

  useEffect(() => {
    // onAuthStateChanged is the core Firebase Auth listener.
    // It's triggered on sign-in, sign-out, and token refresh.
    // Firebase automatically handles token persistence and refreshing.
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user); // Update the current user state
      setLoading(false);    // Set loading to false once the initial state is known
      setAuthError(null);   // Clear any previous errors
    }, (error) => {
      // Handle errors during auth state changes (e.g., network issues)
      console.error("Firebase Auth State Error:", error);
      setAuthError(error.message);
      setLoading(false);
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array means this effect runs once on mount

  // Function to handle user logout
  const logout = async () => {
    try {
      await signOut(auth);
      // onAuthStateChanged will automatically update currentUser to null
    } catch (error) {
      console.error("Error during logout:", error);
      setAuthError(error.message);
    }
  };

  // The value provided to components consuming this context
  const value = {
    currentUser,
    loading,
    authError,
    logout,
    // You can add other auth-related functions here if needed,
    // e.g., login, signup, resetPassword, etc., or keep them in separate hooks/components.
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Only render children when the authentication state has been determined */}
      {!loading && children}
      {/* Optional: Show a loading indicator while auth state is being fetched */}
      {loading && (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white text-xl font-semibold">
          Loading application...
        </div>
      )}
    </AuthContext.Provider>
  );
}