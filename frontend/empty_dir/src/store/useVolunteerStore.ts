import { create } from 'zustand';

export interface VolunteerPost {
    id: number;
    title: string;
    description: string;
    roles: string[];
}

export interface VolunteerApplication {
    id: number;
    postId: number;
    username: string;
    role: string;
    experience: string;
    status: 'Pending' | 'Approved' | 'Rejected';
}

interface VolunteerStore {
    postings: VolunteerPost[];
    applications: VolunteerApplication[];
    addPosting: (title: string, description: string, roles: string[]) => void;
    deletePosting: (id: number) => void;
    applyForRole: (postId: number, username: string, role: string, experience: string) => void;
    updateApplicationStatus: (id: number, status: 'Approved' | 'Rejected') => void;
}

export const useVolunteerStore = create<VolunteerStore>((set) => ({
    postings: [
        {
            id: 1,
            title: "General Maintenance & Events",
            description: "Join the Mosque management team to help with maintenance and event organization.",
            roles: ["Mosque Maintenance & Repair", "Event Coordinator", "Teaching", "Security"]
        }
    ],
    applications: [
        {
            id: 1,
            postId: 1,
            username: "citizen1",
            role: "Security",
            experience: "Have managed traffic during Jummah prayers previously.",
            status: 'Pending'
        }
    ],
    addPosting: (title, description, roles) => set((state) => ({
        postings: [...state.postings, { id: Date.now(), title, description, roles }]
    })),
    deletePosting: (id) => set((state) => ({
        postings: state.postings.filter(p => p.id !== id)
    })),
    applyForRole: (postId, username, role, experience) => set((state) => ({
        applications: [...state.applications, { id: Date.now(), postId, username, role, experience, status: 'Pending' }]
    })),
    updateApplicationStatus: (id, status) => set((state) => ({
        applications: state.applications.map(app => app.id === id ? { ...app, status } : app)
    }))
}));
