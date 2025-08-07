import { useRef, useCallback, useEffect } from 'react';

export const useHeightControls = (
  moduleData: any,
  setModuleData: (data: any) => void
) => {
  const heightInputRef = useRef<HTMLInputElement>(null);
  const incrementIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const decrementIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Height increment/decrement functions
  const incrementHeight = useCallback(() => {
    if (heightInputRef.current) {
      const currentValue = parseInt(heightInputRef.current.value) || 300;
      const newValue = Math.min(currentValue + 10, 800);
      heightInputRef.current.value = newValue.toString();
      setModuleData({ ...moduleData, height: newValue });
    }
  }, [moduleData, setModuleData]);

  const decrementHeight = useCallback(() => {
    if (heightInputRef.current) {
      const currentValue = parseInt(heightInputRef.current.value) || 300;
      const newValue = Math.max(currentValue - 10, 100);
      heightInputRef.current.value = newValue.toString();
      setModuleData({ ...moduleData, height: newValue });
    }
  }, [moduleData, setModuleData]);

  // Continuous increment/decrement functions
  const startIncrement = useCallback(() => {
    incrementHeight();
    incrementIntervalRef.current = setInterval(incrementHeight, 150);

    // Global listeners to ensure stopping
    const stopGlobal = () => {
      if (incrementIntervalRef.current) {
        clearInterval(incrementIntervalRef.current);
        incrementIntervalRef.current = null;
      }
      document.removeEventListener('mouseup', stopGlobal);
      document.removeEventListener('touchend', stopGlobal);
    };

    document.addEventListener('mouseup', stopGlobal);
    document.addEventListener('touchend', stopGlobal);
  }, [incrementHeight]);

  const startDecrement = useCallback(() => {
    decrementHeight();
    decrementIntervalRef.current = setInterval(decrementHeight, 150);

    // Global listeners to ensure stopping
    const stopGlobal = () => {
      if (decrementIntervalRef.current) {
        clearInterval(decrementIntervalRef.current);
        decrementIntervalRef.current = null;
      }
      document.removeEventListener('mouseup', stopGlobal);
      document.removeEventListener('touchend', stopGlobal);
    };

    document.addEventListener('mouseup', stopGlobal);
    document.addEventListener('touchend', stopGlobal);
  }, [decrementHeight]);

  const stopIncrement = useCallback(() => {
    if (incrementIntervalRef.current) {
      clearInterval(incrementIntervalRef.current);
      incrementIntervalRef.current = null;
    }
  }, []);

  const stopDecrement = useCallback(() => {
    if (decrementIntervalRef.current) {
      clearInterval(decrementIntervalRef.current);
      decrementIntervalRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (incrementIntervalRef.current) {
        clearInterval(incrementIntervalRef.current);
      }
      if (decrementIntervalRef.current) {
        clearInterval(decrementIntervalRef.current);
      }
    };
  }, []);

  return {
    heightInputRef,
    incrementHeight,
    decrementHeight,
    startIncrement,
    startDecrement,
    stopIncrement,
    stopDecrement
  };
}; 