import { format as dateFnsFormat } from 'date-fns';

export const formatDate = (date: string | Date, formatStr = 'MMM dd, yyyy') => {
  return dateFnsFormat(new Date(date), formatStr);
};

export const formatDateTime = (date: string | Date) => {
  return dateFnsFormat(new Date(date), 'MMM dd, yyyy HH:mm');
};

export const formatRole = (role: string) => {
  return role
    .split('_')
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ');
};

export const formatStatus = (status: string) => {
  return status.charAt(0) + status.slice(1).toLowerCase();
};
