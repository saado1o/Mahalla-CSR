import { create } from 'zustand';

interface AlertState {
    isEmergencyActive: boolean;
    emergencyData: { lat: number; lon: number; user_id: number | string; message: string } | null;
    triggerEmergency: (data: { lat: number; lon: number; user_id: number | string; message: string }) => void;
    resolveEmergency: () => void;
}

export const useAlertStore = create<AlertState>((set) => ({
    isEmergencyActive: false,
    emergencyData: null,
    triggerEmergency: (data) => set({ isEmergencyActive: true, emergencyData: data }),
    resolveEmergency: () => set({ isEmergencyActive: false, emergencyData: null }),
}));
