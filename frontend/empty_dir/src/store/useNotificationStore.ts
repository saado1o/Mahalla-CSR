import { create } from 'zustand';

interface Notification {
    title: string;
    message: string;
    type: 'error' | 'success' | 'info';
}

interface NotificationState {
    notification: Notification | null;
    notify: (n: Notification) => void;
    clearNotification: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
    notification: null,
    notify: (n) => {
        set({ notification: n });
        // Auto-clear after 5 seconds
        setTimeout(() => {
            set({ notification: null });
        }, 5000);
    },
    clearNotification: () => set({ notification: null }),
}));
