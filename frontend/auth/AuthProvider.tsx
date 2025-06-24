"use client"
import { ReactNode, createContext, useContext, useEffect, useRef, useState, useMemo } from 'react';
import {
    getAccessTokenFromCookie,
} from '../utils/cookie.utils';

import { authStore } from '../store/auth.store';
import { observer } from 'mobx-react-lite';
import { isTokenExpired } from '../utils/jwt.utils';
import { User } from '../types/user.types';

interface AuthContextType {
    logout: () => void;
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

// The key is to make this component an observer so it reacts to MobX changes
const AuthProvider = observer(({ children }: AuthProviderProps) => {
    const [loading, setLoading] = useState(true);
    const cookieCheckInterval = useRef<number | null>(null);

    // Function to check for the user authentication
    const checkUserAuth = async () => {
        console.log('Searching for token in the cookies');
        const accessToken = getAccessTokenFromCookie();

        if (!accessToken) {
            console.log('No access token found');
            authStore.logout();
        } else if (isTokenExpired(accessToken)) {
            console.log('Access token is expired');
            authStore.logout();
        } else {
            console.log('Valid access token found');
            
            // Set the token
            authStore.setAccessToken(accessToken);
            
            // Load user data from encrypted storage
            const userData = authStore.loadUserFromStorage();
            
            if (userData) {
                console.log('User data loaded from storage');
                authStore.setIsAuthenticated(true);
            } else {
                console.log('No user data found in storage, may need to fetch from API');
                
                // Option 1: Set authenticated anyway and fetch user data later
                authStore.setIsAuthenticated(true);
                // Option 2: Fetch user data from API
            }
        }
        setLoading(false);
    };

    // check for user authentication
    useEffect(() => {
        checkUserAuth();
    }, []);

    useEffect(() => {
        const startCookieListener = () => {
            cookieCheckInterval.current = window.setInterval(() => {
                const accessToken = getAccessTokenFromCookie();

                if ((!accessToken) && authStore.getIsAuthenticated()) {
                    console.log('Cookie check: Token(s) missing');
                    authStore.logout();
                }
            }, 5000); // Check every 5 seconds
        };

        startCookieListener();

        return () => {
            if (cookieCheckInterval.current) {
                window.clearInterval(cookieCheckInterval.current);
            }
        };
    }, []);

    // Create context value that reacts to MobX store changes
    const contextValue = useMemo(() => ({
        logout: authStore.logout,
        isAuthenticated: authStore.getIsAuthenticated(),
        user: authStore.getUser(),
        loading
    }), [
        authStore.getIsAuthenticated(), // These will trigger re-computation when store changes
        authStore.getUser(),
        loading
    ]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
});

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthProvider;