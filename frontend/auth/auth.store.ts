"use client"
import { makeAutoObservable, action } from 'mobx';
import { User } from '../types/user.types';
import { clearAccessTokenInCookie } from '../utils/cookie.utils';
import { encryptData, decryptData } from '../utils/encryption.utils';

const USER_STORAGE_KEY = 'encrypted_user_data';

class AuthStore {
    isAuthenticated: boolean = false;  // Make public and initialize
    user: User | null = null;
    accessToken: string | null = null;

    constructor() {
        makeAutoObservable(this, {
            // Explicitly mark actions
            setAccessToken: action,
            setUser: action,
            setIsAuthenticated: action,
            logout: action,
            loadUserFromStorage: action,
        });
    }

    // Getters
    getAccessToken(): string | null {
        return this.accessToken;
    }

    getUser(): User | null {
        return this.user;
    }

    getIsAuthenticated(): boolean {
        return this.isAuthenticated;
    }

    // Setters (marked as actions)
    setAccessToken = (accessToken: string | null): void => {
        console.log('Setting access token:', !!accessToken);
        this.accessToken = accessToken;
    };

    setUser = (user: User | null): void => {
        console.log('Setting user:', user);
        this.user = user;
        // Automatically encrypt and store when user is set
        if (user) {
            this.persistUserData(user);
        }
    };

    setIsAuthenticated = (value: boolean): void => {
        console.log('Setting isAuthenticated:', value);
        this.isAuthenticated = value;
    };

    // Encrypt and store user data
    private persistUserData(user: User): void {
        try {
            const encryptedData = encryptData(user);
            if (encryptedData) {
                localStorage.setItem(USER_STORAGE_KEY, encryptedData);
                console.log('User data encrypted and stored successfully');
            } else {
                console.error('Failed to encrypt user data');
            }
        } catch (error) {
            console.error('Error persisting user data:', error);
        }
    }

    // Load and decrypt user data from storage
    loadUserFromStorage = (): User | null => {
        console.log('Loading user from storage...');
        
        try {
            const encryptedData = localStorage.getItem(USER_STORAGE_KEY);
            console.log('Encrypted data found:', !!encryptedData);
            
            if (!encryptedData) {
                console.log('No encrypted user data found in storage');
                return null;
            }

            const decryptedUser = decryptData(encryptedData);
            console.log('Decrypted user:', decryptedUser);
            
            if (decryptedUser) {
                // Set the user in the store (this will trigger observers)
                this.user = decryptedUser;
                console.log('User data loaded and set in store');
                return decryptedUser;
            } else {
                console.error('Failed to decrypt user data');
                localStorage.removeItem(USER_STORAGE_KEY);
                return null;
            }
        } catch (error) {
            console.error('Error loading user data from storage:', error);
            localStorage.removeItem(USER_STORAGE_KEY);
            return null;
        }
    };

    // Clear encrypted user data from storage
    private clearUserDataFromStorage(): void {
        try {
            localStorage.removeItem(USER_STORAGE_KEY);
            console.log('Encrypted user data cleared from storage');
        } catch (error) {
            console.error('Error clearing user data:', error);
        }
    }

    // Enhanced logout method
    logout = (setIsLoading?: (loading: boolean) => void): void => {
        console.log('Logging out...');
        if(setIsLoading) setIsLoading(false);
        setTimeout(() => {
            this.setIsAuthenticated(false);
            this.setAccessToken(null);
            this.setUser(null);
            clearAccessTokenInCookie();
            this.clearUserDataFromStorage();
            if(setIsLoading) setIsLoading(false);
        }, 500);
    };
}

export const authStore = new AuthStore();