import { toast } from 'react-hot-toast';

export const showSuccess = (message) => {
  toast.success(message || 'Success!', {
    style: {
      background: '#1f1f1f',
      color: '#f472b6',
      border: '1px solid #f472b6',
    },
    iconTheme: {
      primary: '#f472b6',
      secondary: '#1f1f1f',
    },
  });
};

export const showError = (message) => {
  toast.error(message || 'Something went wrong!', {
    style: {
      background: '#1f1f1f',
      color: '#f87171',
      border: '1px solid #f87171',
    },
    iconTheme: {
      primary: '#f87171',
      secondary: '#1f1f1f',
    },
  });
};