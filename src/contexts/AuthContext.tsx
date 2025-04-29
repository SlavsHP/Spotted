import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ethan Humphrey',
    email: 'ethan@bath.ac.uk',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100',
    bio: 'Sociology student at University of Bath. Love discovering new cafés!',
    friendIds: ['2', '3'],
  },
  {
    id: '2',
    name: 'Emma Wilson',
    email: 'emma@bath.ac.uk',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100',
    bio: 'English Literature student. Always on the lookout for cozy reading spots.',
    friendIds: ['1', '3'],
  },
  {
    id: '3',
    name: 'Michael Lee',
    email: 'michael@bath.ac.uk',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100',
    bio: 'Computer Science student with a passion for good coffee and tech events.',
    friendIds: ['1', '2'],
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock authentication
    setIsLoading(true);
    // For demo purposes, just find a user with matching email
    const user = mockUsers.find(user => user.email === email);
    
    if (!user) {
      setIsLoading(false);
      throw new Error('Invalid email or password');
    }
    
    // Store user in localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentUser(user);
    setIsLoading(false);
  };

  const register = async (name: string, email: string, password: string) => {
    // Mock registration
    setIsLoading(true);
    
    // Check if email already exists
    if (mockUsers.some(user => user.email === email)) {
      setIsLoading(false);
      throw new Error('Email already in use');
    }
    
    // Create new user
    const newUser: User = {
      id: (mockUsers.length + 1).toString(),
      name,
      email,
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
      bio: '',
      friendIds: [],
    };
    
    // In a real app, this would be saved to a database
    mockUsers.push(newUser);
    
    // Store user in localStorage
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    setCurrentUser(newUser);
    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};