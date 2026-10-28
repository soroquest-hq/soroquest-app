'use client';
import React, { useEffect } from 'react';

export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type = 'info', onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const bgColors = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600',
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center shadow-lg rounded-lg overflow-hidden text-white transition-transform animate-bounce">
      <div className={`px-4 py-3 ${bgColors[type]} flex items-center gap-3`}>
        <span className="text-sm font-medium">{message}</span>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 text-lg font-bold ml-2 leading-none"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
