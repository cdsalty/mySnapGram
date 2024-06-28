import { createContext, useContext, useState, useEffect } from 'react';
import { IContextType, IUser } from '@/types';
import { getCurrentUser } from '@/lib/appwrite/api';
import { useNavigate } from 'react-router-dom';

// Define empty user:
export const INITIAL_USER = {
  id: '',
  name: '',
  username: '',
  email: '',
  imageUrl: '',
  bio: '',
};

// Go down the list and address each of the Initial State properties:
// Created in order to know if the user is authenticated or not.
const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // define the initial user state, isAuthenticated state, and isLoading state
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const checkAuthUser = async () => {
    try {
      // Get the currently logged in user account (will need to create a new function in the appwrite api file)
      const currentAccount = await getCurrentUser();
      console.log(`The current account information: ${currentAccount}`);

      // const { $id, name, username, email, imageUrl, bio} = await getCurrentUser();
      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        });
      }
      // update authentication status:
      setIsAuthenticated(true);
      return currentAccount; // the reason for returning true is
    } catch (error) {
      console.log(error);
      return false; // user isn't authenticated
    } finally {
      setIsLoading(false);
    }
  };

  // need to refresh the application to check the user authorization
  useEffect(() => {
    // check local storage
    if (
      localStorage.getItem('cookieFallback') === '[]' ||
      localStorage.getItem('cookieFallback') === null
    )
      // if no user, need to redirect (useNavigate)
      navigate('/signin');

    // on every reload, call the function
    checkAuthUser();
  }, []);

  // passing to context
  const value = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

// to make it easier to call the context:
export const useUserContext = () => useContext(AuthContext);
