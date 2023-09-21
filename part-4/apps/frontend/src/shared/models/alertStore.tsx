import { create } from 'zustand';

interface Alert {
  alert: { success: boolean; error: boolean; message: string }[];
  clearAlert: () => void;
}
export const useAlertStore = create<Alert>((set) => ({
  alert: [],
  clearAlert: () => set({ alert: [] }),
}));
