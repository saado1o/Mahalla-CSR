"use client";

import React, { useState } from 'react';
import { Briefcase, Star, Clock, MapPin, Handshake, CheckCircle2, Search, UserCheck } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useNotificationStore } from '@/store/useNotificationStore';

export default function SkillBarter() {
    const { user } = useAuthStore();
    const { notify } = useNotificationStore();
    const [activeTab, setActiveTab] = useState('browse');
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newType, setNewType] = useState<'offer' | 'request'>('offer');

    const [skills, setSkills] = useState([
        { id: 1, type: 'offer', user: 'Hamza Plumber', skill: 'Pipe Repair', rating: 4.8, distance: '0.3km', time: 'Evenings', status: 'available' },
        { id: 2, type: 'request', user: 'Fatima Z.', skill: 'Math Tutoring (Grade 8)', rating: 5.0, distance: '1.2km', time: 'Weekends', status: 'available' },
        { id: 3, type: 'offer', user: 'Electrician Tariq', skill: 'AC Servicing', rating: 4.9, distance: '0.8km', time: 'Anytime', status: 'claimed' },
    ]);

    const toggleStatus = (id: number) => {
        const skill = skills.find(s => s.id === id);
        setSkills(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'claimed' ? 'available' : 'claimed' } : s));
        notify({
            title: "Request Sent",
            message: `A notification has been routed to ${skill?.user}. They will review your request shortly.`,
            type: "info"
        });
    };

    const handleAddSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle.trim()) return;

        setSkills([{
            id: Date.now(),
            type: newType,
            user: user?.username || 'You',
            skill: newTitle,
            rating: 5.0,
            distance: '0.0km',
            time: 'Flexible',
            status: 'available'
        }, ...skills]);

        notify({ title: "Success", message: `Your skill ${newType} "${newTitle}" has been published to the neighborhood.`, type: "success" });
        setNewTitle('');
        setIsModalOpen(false);
    };

    const filteredSkills = skills.filter(skill =>
        skill.skill.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.user.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-card glassmorphism p-6 rounded-3xl border border-white/5">
                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Briefcase className="w-6 h-6 text-[#14B8A6]" />
                        Skill Barter Network
                    </h2>
                    <p className="text-muted mt-1">Trade skills with verified neighbors. No money exchanged, purely community support.</p>
                </div>
            </div>

            <div className="bg-[#0F172A] p-6 rounded-3xl border border-white/5 space-y-6">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                    <input
                        type="text"
                        placeholder="Search for skills like 'Plumber', 'Math Tutor', 'Cooking'..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#1E293B] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#14B8A6] transition-colors shadow-inner"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* ADD NEW ACTION CARD */}
                    <div
                        onClick={() => setIsModalOpen(true)}
                        className="border border-dashed border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/5 transition-all group min-h-[250px] bg-card glassmorphism"
                    >
                        <div className="w-16 h-16 bg-white/5 group-hover:bg-[#14B8A6]/20 rounded-full flex items-center justify-center mb-4 transition-colors">
                            <Briefcase className="w-8 h-8 text-muted group-hover:text-[#14B8A6]" />
                        </div>
                        <p className="text-white font-semibold group-hover:text-[#14B8A6] transition-colors">Post Service / Request</p>
                        <p className="text-xs text-muted mt-2">Trade skills without currency.</p>
                    </div>

                    {filteredSkills.map((item) => (
                        <div key={item.id} className="bg-card glassmorphism rounded-3xl border border-white/5 p-6 hover:border-[#14B8A6]/30 transition-all flex flex-col relative overflow-hidden group">
                            {item.status === 'claimed' && (
                                <div className="absolute inset-0 bg-black/60 z-10 flex flex-col items-center justify-center backdrop-blur-sm">
                                    <CheckCircle2 className="w-12 h-12 text-[#10B981] mb-2" />
                                    <p className="text-white font-bold uppercase tracking-widest text-sm">Service Claimed</p>
                                </div>
                            )}

                            <div className="flex justify-between items-start mb-4 relative z-0">
                                <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide border ${item.type === 'offer' ? 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30' : 'bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/30'}`}>
                                    {item.type}
                                </span>
                                <div className="flex items-center gap-1 text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-md text-xs font-bold border border-yellow-500/20">
                                    <Star className="w-3 h-3 fill-current" />
                                    {item.rating}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2 relative z-0">{item.skill}</h3>

                            <div className="flex items-center gap-2 text-sm text-secondary font-medium mb-4 relative z-0">
                                <UserCheck className="w-4 h-4" />
                                {item.user}
                            </div>

                            <div className="space-y-2 mt-auto text-sm text-muted relative z-0">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-[#14B8A6]" />
                                    <span>{item.distance} Away</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-[#14B8A6]" />
                                    <span>{item.time}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => toggleStatus(item.id)}
                                disabled={item.status === 'claimed'}
                                className={`w-full mt-6 py-3 font-bold rounded-xl flex items-center justify-center gap-2 transition-all relative z-0 ${item.status === 'claimed' ? 'bg-[#0F172A] text-muted border border-white/5 cursor-not-allowed' : 'bg-[#1E293B] text-white hover:bg-[#14B8A6] hover:text-white border border-white/5 hover:border-[#14B8A6] group-hover:neo-glow'}`}
                            >
                                <Handshake className="w-5 h-5" />
                                {item.type === 'offer' ? 'Request Service' : 'Offer Skill'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Visual Modal for Adding Listing */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-[#0F172A] border border-white/10 rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl relative">
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <Briefcase className="w-6 h-6 text-[#14B8A6]" />
                            Create Listing
                        </h3>
                        <form onSubmit={handleAddSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-muted mb-2">Listing Type</label>
                                <div className="flex bg-[#1E293B] p-1 rounded-xl border border-white/5">
                                    <button
                                        type="button"
                                        onClick={() => setNewType('offer')}
                                        className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${newType === 'offer' ? 'bg-[#10B981]/20 text-[#10B981]' : 'text-muted hover:text-white'}`}
                                    >
                                        I am Offering
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setNewType('request')}
                                        className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${newType === 'request' ? 'bg-[#f59e0b]/20 text-[#f59e0b]' : 'text-muted hover:text-white'}`}
                                    >
                                        I am Requesting
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-muted mb-2">Skill / Service Name</label>
                                <input
                                    autoFocus
                                    required
                                    type="text"
                                    placeholder="e.g., Graphic Design, Plumbing, Tutoring"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    className="w-full bg-[#1E293B] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#14B8A6] transition-colors"
                                />
                            </div>

                            <div className="flex gap-4 pt-4 mt-4 border-t border-white/5">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-transparent border border-white/10 text-muted hover:text-white font-bold rounded-xl transition-all">
                                    Cancel
                                </button>
                                <button type="submit" className="flex-1 py-3 bg-[#14B8A6] hover:bg-[#10B981] text-white font-bold rounded-xl transition-all shadow-lg neo-glow">
                                    Publish
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
