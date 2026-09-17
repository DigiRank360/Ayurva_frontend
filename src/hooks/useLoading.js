import { useState, useCallback } from 'react';

/**
 * Custom hook for managing loading states
 * @returns {Object} Object containing isLoading state and control functions
 */
const useLoading = (initialState = false) => {
    const [isLoading, setIsLoading] = useState(initialState);

    const startLoading = useCallback(() => {
        setIsLoading(true);
    }, []);

    const stopLoading = useCallback(() => {
        setIsLoading(false);
    }, []);

    const toggleLoading = useCallback(() => {
        setIsLoading(prev => !prev);
    }, []);

    return {
        isLoading,
        startLoading,
        stopLoading,
        toggleLoading,
        setIsLoading
    };
};

export default useLoading;
