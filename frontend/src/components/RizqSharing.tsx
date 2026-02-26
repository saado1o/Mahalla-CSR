"use client";

import React, { useState } from 'react';
import { UtensilsCrossed, ExternalLink, Calendar as CalendarIcon, MapPin, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export default function RizqSharing() {
    const { user } = useAuthStore();
    const [filter, setFilter] = useState<'all' | 'give' | 'request'>('all');

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newType, setNewType] = useState<'give' | 'request'>('give');

    const [meals, setMeals] = useState([
        { id: 1, type: 'give', title: "Excess Biryani (2 Portions)", host: "Ahmad Family", distance: "0.1km", time: "Available Now", status: "active", dietary: "Halal, Spicy" },
        { id: 2, type: 'request', title: "Need Iftar for 3 People", host: "M. Usman", distance: "0.3km", time: "Needed by 6:00 PM", status: "active", dietary: "Any Halal" },
        { id: 3, type: 'give', title: "Fresh Vegetables", host: "Community Garden", distance: "0.8km", time: "Available Tomorrow", status: "claimed", dietary: "Vegetarian" },
        { id: 4, type: 'give', title: "Chicken Karahi (1 Portion)", host: "Sara B.", distance: "0.2km", time: "Available Now", status: "active", dietary: "Halal" },
    ]);

    const handleAccept = (id: number) => {
        const meal = meals.find(m => m.id === id);
        setMeals(prev => prev.map(m => m.id === id ? { ...m, status: 'claimed' } : m));
        alert(`Notification sent to ${meal?.host}! A Mahalla runner is on standby if delivery is needed.`);
    };

    const handleAddSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle.trim()) return;

        setMeals([{
            id: Date.now(),
            type: newType,
            title: newTitle,
            host: user?.username || 'You',
            distance: '0.0km',
            time: 'Available Now',
            status: 'active',
            dietary: 'Standard Halal'
        }, ...meals]);

        setNewTitle('');
        setIsModalOpen(false);
    };

    const filteredMeals = meals.filter(m => filter === 'all' || m.type === filter);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-card glassmorphism p-6 rounded-3xl border border-white/5">
                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <UtensilsCrossed className="w-6 h-6 text-primary" />
                        Rizq Sharing
                    </h2>
                    <p className="text-muted mt-1">Share excess food with neighbors or request a meal privately.</p>
                </div>

                <div className="flex bg-[#0F172A] p-1 rounded-xl border border-white/5">
                    {['all', 'give', 'request'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f as 'all' | 'give' | 'request')}
                            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${filter === f ? 'bg-primary text-white shadow-lg' : 'text-muted hover:text-white'}`}
                        >
                            <span className="capitalize">{f}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                    onClick={() => setIsModalOpen(true)}
                    className="border border-dashed border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/5 transition-all group min-h-[250px] bg-card glassmorphism"
                >
                    <div className="w-16 h-16 bg-white/5 group-hover:bg-primary/20 rounded-full flex items-center justify-center mb-4 transition-colors">
                        <UtensilsCrossed className="w-8 h-8 text-muted group-hover:text-primary" />
                    </div>
                    <p className="text-white font-semibold group-hover:text-primary transition-colors">Add New Listing</p>
                    <p className="text-xs text-muted mt-2">Zero food waste in the Mahalla.</p>
                </div>

                {filteredMeals.map((meal) => (
                    <div key={meal.id} className="bg-card glassmorphism rounded-3xl border border-white/5 overflow-hidden flex flex-col">
                        <div className={`h-2 ${meal.status === 'claimed' ? 'bg-gray-600' : meal.type === 'give' ? 'bg-green-500' : 'bg-red-500'}`} />
                        <div className="p-6 flex-1 flex flex-col relative z-0">
                            {meal.status === 'claimed' && (
                                <div className="absolute inset-0 bg-black/60 z-10 flex flex-col items-center justify-center backdrop-blur-sm">
                                    <CheckCircle2 className="w-12 h-12 text-[#10B981] mb-2" />
                                    <p className="text-white font-bold uppercase tracking-widest text-sm">Meal Claimed</p>
                                </div>
                            )}

                            <div className="flex justify-between items-start mb-4 relative z-0">
                                <span className={`text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wide ${meal.type === 'give' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-100'}`}>
                                    {meal.type}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2 relative z-0">{meal.title}</h3>
                            <p className="text-sm text-secondary font-medium mb-4 relative z-0">{meal.host}</p>

                            <div className="space-y-2 mt-auto text-sm text-muted relative z-0">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-primary" />
                                    <span>{meal.distance} Away</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CalendarIcon className="w-4 h-4 text-primary" />
                                    <span>{meal.time}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <UtensilsCrossed className="w-4 h-4 text-primary" />
                                    <span>{meal.dietary}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => handleAccept(meal.id)}
                                disabled={meal.status === 'claimed'}
                                className={`w-full mt-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all relative z-0 ${meal.status === 'claimed' ? 'bg-[#0F172A] text-muted cursor-not-allowed' : 'bg-[#1E293B] text-white hover:bg-primary hover:text-white border border-white/5 hover:border-primary neo-glow'}`}
                            >
                                {meal.type === 'give' ? 'Accept Meal' : 'Offer Meal'} <ExternalLink className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Visual Modal for Adding Rizq Listing */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-[#0F172A] border border-white/10 rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl relative">
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <UtensilsCrossed className="w-6 h-6 text-[#14B8A6]" />
                            Create Food Listing
                        </h3>
                        <form onSubmit={handleAddSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-muted mb-2">I want to...</label>
                                <div className="flex bg-[#1E293B] p-1 rounded-xl border border-white/5">
                                    <button
                                        type="button"
                                        onClick={() => setNewType('give')}
                                        className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${newType === 'give' ? 'bg-[#10B981]/20 text-[#10B981]' : 'text-muted hover:text-white'}`}
                                    >
                                        Share Food
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setNewType('request')}
                                        className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${newType === 'request' ? 'bg-[#f59e0b]/20 text-[#f59e0b]' : 'text-muted hover:text-white'}`}
                                    >
                                        Request Meal
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-muted mb-2">Meal Details</label>
                                <input
                                    autoFocus
                                    required
                                    type="text"
                                    placeholder="e.g., 2 Portions of Biryani"
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
                                    Publish Feed
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
