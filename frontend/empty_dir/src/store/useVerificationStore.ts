import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface VerificationRequest {
    id: string;
    name: string;
    email: string;
    docType: string;
    date: string;
    status: 'Pending' | 'Approved' | 'Rejected';
}

interface VerificationState {
    requests: VerificationRequest[];
    addRequest: (req: Omit<VerificationRequest, 'status'>) => void;
    updateStatus: (id: string, status: 'Approved' | 'Rejected') => void;
}

export const useVerificationStore = create<VerificationState>()(
    persist(
        (set) => ({
            requests: [
                { id: '1', name: 'Ali Khan', email: 'ali@example.com', docType: 'Utility Bill', date: '2026-02-26', status: 'Pending' },
                { id: '2', name: 'Ayesha Bibi', email: 'ayesha@example.com', docType: 'CNIC', date: '2026-02-25', status: 'Pending' },
            ],
            addRequest: (req) => set((state) => ({
                requests: [{ ...req, status: 'Pending' as const }, ...state.requests]
            })),
            updateStatus: (id, status) => set((state) => ({
                requests: state.requests.map(r => r.id === id ? { ...r, status } : r)
            })),
        }),
        {
            name: 'mahalla-verification-storage',
        }
    )
);
