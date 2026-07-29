import { create } from 'zustand';

export interface KitchenItem {
  id: string;
  orderNumber: string;
  item: string;
  timeElapsed: string; // e.g. "3m ago", "12m ago"
  status: 'pending' | 'preparing' | 'completed';
  type: 'Beverage' | 'Food' | 'Pastry';
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
  type: 'alert' | 'order' | 'system' | 'insight';
}

interface AppState {
  sidebarOpen: boolean;
  theme: 'dark' | 'light';
  searchQuery: string;
  activeWorkspace: string;
  notificationOpen: boolean;
  kitchenQueue: KitchenItem[];
  notifications: NotificationItem[];
  quickActionsLog: string[];

  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleTheme: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
  setSearchQuery: (query: string) => void;
  setActiveWorkspace: (workspace: string) => void;
  toggleNotification: () => void;
  setNotificationOpen: (open: boolean) => void;

  completeKitchenItem: (id: string) => void;
  preparingKitchenItem: (id: string) => void;
  addKitchenItem: (item: Omit<KitchenItem, 'id' | 'status' | 'timeElapsed'>) => void;

  markAllNotificationsRead: () => void;
  addNotification: (notification: Omit<NotificationItem, 'id' | 'time' | 'unread'>) => void;
  addQuickActionLog: (log: string) => void;
}

export const useStore = create<AppState>((set) => ({
  sidebarOpen: true,
  theme: 'dark',
  searchQuery: '',
  activeWorkspace: 'Robusta Coffee (Flagship)',
  notificationOpen: false,
  quickActionsLog: ['Vador OS booted.', 'Robusta Coffee Workspace loaded.'],

  kitchenQueue: [
    { id: 'k1', orderNumber: '#1042', item: '2x Double Espresso Macchiato (Oat)', timeElapsed: '2m ago', status: 'preparing', type: 'Beverage' },
    { id: 'k2', orderNumber: '#1043', item: '1x Pistachio Croissant, 1x Iced Spanish Latte', timeElapsed: '5m ago', status: 'preparing', type: 'Pastry' },
    { id: 'k3', orderNumber: '#1044', item: '1x Avocado Sourdough Toast', timeElapsed: '8m ago', status: 'pending', type: 'Food' },
    { id: 'k4', orderNumber: '#1045', item: '1x Vador Signature Nitro Cold Brew', timeElapsed: '11m ago', status: 'pending', type: 'Beverage' },
    { id: 'k5', orderNumber: '#1046', item: '2x Pain au Chocolat', timeElapsed: '15m ago', status: 'pending', type: 'Pastry' },
  ],

  notifications: [
    { id: 'n1', title: 'Critical Stock Alert', description: 'Single Origin Ethiopia Yirgacheffe beans below 5kg threshold (4.2kg left).', time: '10m ago', unread: true, type: 'alert' },
    { id: 'n2', title: 'New VIP Guest Check-In', description: 'Mr. Harrison (Platinum Tier) just ordered via Mobile App (Table 4).', time: '15m ago', unread: true, type: 'insight' },
    { id: 'n3', title: 'High Ticket Order', description: 'New catering order #1039 placed: $342.50.', time: '1h ago', unread: false, type: 'order' },
    { id: 'n4', title: 'AI Automation Active', description: 'Vador AI auto-scheduled a restock draft order for Arabica Blend.', time: '2h ago', unread: false, type: 'system' },
  ],

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  toggleTheme: () => set((state) => {
    const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      if (nextTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
    return { theme: nextTheme };
  }),
  setTheme: (theme) => set(() => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
    return { theme };
  }),

  setSearchQuery: (query) => set({ searchQuery: query }),
  setActiveWorkspace: (workspace) => set({ activeWorkspace: workspace }),
  toggleNotification: () => set((state) => ({ notificationOpen: !state.notificationOpen })),
  setNotificationOpen: (open) => set({ notificationOpen: open }),

  completeKitchenItem: (id) => set((state) => ({
    kitchenQueue: state.kitchenQueue.filter(item => item.id !== id),
    quickActionsLog: [`Order item completed/cleared from KDS queue.`, ...state.quickActionsLog]
  })),

  preparingKitchenItem: (id) => set((state) => ({
    kitchenQueue: state.kitchenQueue.map(item =>
      item.id === id ? { ...item, status: 'preparing' } : item
    )
  })),

  addKitchenItem: (item) => set((state) => {
    const newItem: KitchenItem = {
      ...item,
      id: `k-${Date.now()}`,
      status: 'pending',
      timeElapsed: 'Just now'
    };
    return {
      kitchenQueue: [newItem, ...state.kitchenQueue]
    };
  }),

  markAllNotificationsRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, unread: false }))
  })),

  addNotification: (notification) => set((state) => {
    const newNotif: NotificationItem = {
      ...notification,
      id: `n-${Date.now()}`,
      time: 'Just now',
      unread: true
    };
    return {
      notifications: [newNotif, ...state.notifications]
    };
  }),

  addQuickActionLog: (log) => set((state) => ({
    quickActionsLog: [log, ...state.quickActionsLog]
  }))
}));
