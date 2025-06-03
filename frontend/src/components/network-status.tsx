'use client';

import React, { useState, useEffect } from 'react';

const NetworkStatus = () => {
  const [isOffline, setIsOffline] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    setIsOffline(!navigator.onLine);

    const handleOnline = () => {
      setIsOffline(false);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 1000);
    };

    const handleOffline = () => {
      setIsOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showMessage && !isOffline) {
    return null;
  }

  return (
    <div
      className={`fixed top-4 left-1/2 z-50 -translate-x-1/2 flex items-center justify-center gap-2 p-2 border-4 ${
        isOffline
          ? 'bg-red-100 border-red-500 text-red-700'
          : 'bg-blue-100 border-blue-500 text-blue-700'
      }`}
    >
      <div className="text-center">
        {isOffline
          ? 'You are offline! Please check your internet connection.'
          : 'Internet connection is back!'}
      </div>
    </div>
  );
};

export default NetworkStatus;
