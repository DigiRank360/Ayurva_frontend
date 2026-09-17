import { useState, useCallback } from 'react';

/**
 * Custom hook for handling async operations with automatic loading and error states
 * @param {Function} asyncFunction - The async function to execute
 * @returns {Object} Object containing execute function, loading state, error, and data
 */
const useAsync = (asyncFunction) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const execute = useCallback(async (...params) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await asyncFunction(...params);
            setData(result);
            return result;
        } catch (err) {
            setError(err.message || 'An error occurred');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [asyncFunction]);

    const reset = useCallback(() => {
        setIsLoading(false);
        setError(null);
        setData(null);
    }, []);

    return {
        execute,
        isLoading,
        error,
        data,
        reset
    };
};

export default useAsync;
