import { create } from 'zustand';
import type { Notification } from '../types';
import { generateId } from '../lib/utils';

interface NotificationState {
  notifications: Notification[];
  addNotification: (n: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  unreadCount: () => number;
}

const demoNotifications: Notification[] = [
  { id: 'n1', userId: 'u1', type: 'order', title: 'Order Shipped', message: 'Your order VRD-260501-014 is out for delivery.', read: false, createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: 'n2', userId: 'u1', type: 'ai', title: 'AI Recommendation', message: 'Perfect time to plant tomatoes this week.', read: false, createdAt: new Date(Date.now() - 7200000).toISOString() },
  { id: 'n3', userId: 'u1', type: 'weather', title: 'Weather Alert', message: 'Heavy rain expected in your area tomorrow.', read: true, createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: 'n4', userId: 'u1', type: 'crop', title: 'Harvest Reminder', message: 'Your tomatoes are ready for harvest!', read: false, createdAt: new Date(Date.now() - 172800000).toISOString() },
];

export const useNotificationStore = create<NotificationState>()(
  (set, get) => ({
    notifications: demoNotifications,
    addNotification: (n) =>
      set((state) => ({
        notifications: [
          { ...n, id: generateId(), read: false, createdAt: new Date().toISOString() },
          ...state.notifications,
        ],
      })),
    markRead: (id) =>
      set((state) => ({
        notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
      })),
    markAllRead: () =>
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
      })),
    unreadCount: () => get().notifications.filter((n) => !n.read).length,
  })
);
