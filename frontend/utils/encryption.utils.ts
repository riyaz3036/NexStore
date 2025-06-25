// utils/encryption.utils.js
import CryptoJS from 'crypto-js';

// Use environment variable for encryption key in production
const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;

export const encryptData = (data: any) => {
    try {
        if(!ENCRYPTION_KEY) throw "Encryption Key not found";
        const jsonString = JSON.stringify(data);
        const encrypted = CryptoJS.AES.encrypt(jsonString, ENCRYPTION_KEY).toString();
        return encrypted;
    } catch (error) {
        console.error('Encryption failed:', error);
        return null;
    }
};

export const decryptData = (encryptedData: any) => {
    try {
        if(!ENCRYPTION_KEY) throw "Encryption Key not found";
        const decrypted = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
        const jsonString = decrypted.toString(CryptoJS.enc.Utf8);
        return JSON.parse(jsonString);
    } catch (error) {
        console.error('Decryption failed:', error);
        return null;
    }
};

// Alternative: Browser-native Web Crypto API (more secure)
export const generateKey = async () => {
    return await window.crypto.subtle.generateKey(
        {
            name: 'AES-GCM',
            length: 256,
        },
        true,
        ['encrypt', 'decrypt']
    );
};

export const encryptWithWebCrypto = async (data: any, key: any) => {
    try {
        const encoder = new TextEncoder();
        const encodedData = encoder.encode(JSON.stringify(data));
        
        const iv = window.crypto.getRandomValues(new Uint8Array(12));
        const encrypted = await window.crypto.subtle.encrypt(
            {
                name: 'AES-GCM',
                iv: iv,
            },
            key,
            encodedData
        );
        
        // Combine IV and encrypted data
        const combined = new Uint8Array(iv.length + encrypted.byteLength);
        combined.set(iv);
        combined.set(new Uint8Array(encrypted), iv.length);
        
        // Convert to base64 for storage
        return btoa(String.fromCharCode(...combined));
    } catch (error) {
        console.error('Web Crypto encryption failed:', error);
        return null;
    }
};