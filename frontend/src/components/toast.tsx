"use client";

import { useEffect } from "react";

interface ToastProps {
  errorMsg: string;
  successMsg: string;
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({
  errorMsg,
  successMsg,
  onClose = () => {},
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // auto-close after 3s
    return () => clearTimeout(timer);
  }, [onClose]);

  const className = errorMsg
    ? "fixed top-[55px] left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50"
    : "fixed top-[55px] left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50";

  return (
    <div className={className}>
      <div className="flex items-center justify-between space-x-4">
        <span>{errorMsg || successMsg}</span>
        {onClose && (
          <button onClick={onClose} className="text-white hover:text-gray-200">
            &times;
          </button>
        )}
      </div>
    </div>
  );
};

export default Toast;
