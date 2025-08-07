import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem('sunyaniUser');
      if (savedUser) {
        try {
          const user = JSON.parse(savedUser);
          dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        } catch (error) {
          localStorage.removeItem('sunyaniUser');
          dispatch({ type: 'LOGOUT' });
        }
      } else {
        // Create demo user if no users exist
        const users = JSON.parse(localStorage.getItem('sunyaniUsers') || '[]');
        if (users.length === 0) {
          const demoUser = {
            id: Date.now(),
            firstName: 'Demo',
            lastName: 'User',
            email: 'demo@sunyani.com',
            phone: '+233 24 123 4567',
            password: 'demo123',
            createdAt: new Date().toISOString(),
            role: 'user'
          };
          users.push(demoUser);
          localStorage.setItem('sunyaniUsers', JSON.stringify(users));
        }
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('sunyaniUsers') || '[]');
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        // Remove password from user object before storing
        const { password, ...userWithoutPassword } = user;
        localStorage.setItem('sunyaniUser', JSON.stringify(userWithoutPassword));
        dispatch({ type: 'LOGIN_SUCCESS', payload: userWithoutPassword });
        return { success: true };
      } else {
        dispatch({ type: 'SET_ERROR', payload: 'Invalid email or password' });
        return { success: false, error: 'Invalid email or password' };
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Login failed. Please try again.' });
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const register = async (userData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get existing users
      const users = JSON.parse(localStorage.getItem('sunyaniUsers') || '[]');
      
      // Check if email already exists
      const existingUser = users.find(u => u.email === userData.email);
      if (existingUser) {
        dispatch({ type: 'SET_ERROR', payload: 'Email already registered' });
        return { success: false, error: 'Email already registered' };
      }

      // Create new user
      const newUser = {
        id: Date.now(),
        ...userData,
        createdAt: new Date().toISOString(),
        role: 'user'
      };

      // Save to users list
      users.push(newUser);
      localStorage.setItem('sunyaniUsers', JSON.stringify(users));

      // Remove password from user object before storing
      const { password, ...userWithoutPassword } = newUser;
      localStorage.setItem('sunyaniUser', JSON.stringify(userWithoutPassword));
      
      dispatch({ type: 'REGISTER_SUCCESS', payload: userWithoutPassword });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Registration failed. Please try again.' });
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('sunyaniUser');
    dispatch({ type: 'LOGOUT' });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 