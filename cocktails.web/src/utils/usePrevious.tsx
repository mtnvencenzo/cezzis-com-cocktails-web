import { useRef, useEffect } from 'react';

const usePrevious = <T,>(value: T) => {
    const ref = useRef<T>(undefined); // Create a ref to store the previous value

    useEffect(() => {
        ref.current = value; // Update the ref's current value after each render
    }, [value]); // Rerun this effect only when the 'value' changes

    return ref.current; // Return the value from the previous render
};

export default usePrevious;
