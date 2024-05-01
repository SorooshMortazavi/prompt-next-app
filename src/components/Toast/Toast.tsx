import { ToastMessage } from '@/interfaces/ToastInterfaces';
import React from 'react';

const Toast: React.FC<Pick<ToastMessage, 'message' | 'type'>> = ({ message, type }) => {
  const backgroundColor = type === 'error' ? 'bg-red-500' : 'bg-green-500';

  return (
    <div className={`px-4 py-2 rounded shadow-lg text-white ${backgroundColor}`}>
      {message}
    </div>
  );
};

export default Toast;