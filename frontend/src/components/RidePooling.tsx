"use client";

import React, { useState } from 'react';
import { Car, Map, User, Clock, Route, HandCoins, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export default function RidePooling() {
    const { user } = useAuthStore();
    const [activeTab, setActiveTab] = useState<'find' | 'offer'>('find');

    // Modal state for adding a route
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fromLocation, setFromLocation] = useState('');
    const [toLocation, setToLocation] = useState('');
    const [routeTime, setRouteTime] = useState('');
    const [availableSeats, setAvailableSeats] = useState(1);

    const [rides, setRides] = useState([
        { id: 1, driver: "Omar F.", from: "Sector 11-A Mosque", to: "Clifton Central", time: "08:00 AM", seats: 2, contribution: "50 Barter Points", vehicle: "Honda City '19" },
        { id: 2, driver: "Zainab T.", from: "Women's Center", to: "University Area", time: "09:30 AM", seats: 1, contribution: "Free (Fi Sabilillah)", vehicle: "Suzuki Alto" },
        { id: 3, driver: "Hassan Ali", from: "Main Block", to: "Industrial Estate", time: "07:15 AM", seats: 3, contribution: "100 PKR Gas Share", vehicle: "Toyota Corolla" },
    ]);

    const handleRequestSeat = (id: number) => {
        const ride = rides.find(r => r.id === id);
        if (ride && ride.seats > 0) {
            setRides(prev => prev.map(r => r.id === id ? { ...r, seats: r.seats - 1 } : r));
            alert(`Seat requested for route to ${ride.to}! Driver ${ride.driver} has been notified.`);
        }
    };

    const handlePublishRoute = (e: React.FormEvent) => {
        e.preventDefault();
        if (!fromLocation.trim() || !toLocation.trim() || !routeTime.trim()) return;

        setRides([{
            id: Date.now(),
            driver: user?.username || "You",
            from: fromLocation,
            to: toLocation,
            time: routeTime,
            seats: availableSeats,
            contribution: "Standard Share",
            vehicle: "Mahalla Verified Vehicle"
        }, ...rides]);

        setFromLocation('');
        setToLocation('');
        setRouteTime('');
        setAvailableSeats(1);
        setIsModalOpen(false);
        setActiveTab('find');
    };

    return (
        <div className="space-y-6">
            <div className="bg-card glassmorphism p-8 rounded-3xl border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Car className="w-6 h-6 text-[#8b5cf6]" />
                        Ride Pooling
                    </h2>
                    <p className="text-muted mt-2">Reduce traffic and travel securely with verified neighborhood drivers.</p>
                </div>

                <div className="flex bg-[#0F172A] p-1 rounded-xl border border-white/5 shadow-inner">
                    <button
                        onClick={() => setActiveTab('find')}
                        className={`px-8 py-3 rounded-lg font-bold transition-all ${activeTab === 'find' ? 'bg-[#8b5cf6] text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]' : 'text-muted hover:text-white'}`}
                    >
                        Find a Ride
                    </button>
                    <button
                        onClick={() => setActiveTab('offer')}
                        className={`px-8 py-3 rounded-lg font-bold transition-all ${activeTab === 'offer' ? 'bg-[#8b5cf6] text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]' : 'text-muted hover:text-white'}`}
                    >
                        Offer a Ride
                    </button>
                </div>
            </div>

            {activeTab === 'find' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {rides.map((ride) => (
                        <div key={ride.id} className="bg-card glassmorphism p-6 rounded-3xl border border-white/5 hover:border-[#8b5cf6]/50 transition-all group relative overflow-hidden flex flex-col">
                            {ride.seats === 0 && (
                                <div className="absolute inset-0 bg-black/70 z-10 flex flex-col items-center justify-center backdrop-blur-sm">
                                    <CheckCircle2 className="w-12 h-12 text-[#10B981] mb-2" />
                                    <p className="text-white font-bold uppercase tracking-widest text-sm">Car Full</p>
                                </div>
                            )}

                            <div className="flex justify-between items-start mb-4 relative z-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-[#8b5cf6]/20 rounded-xl flex items-center justify-center text-[#8b5cf6] font-bold">
                                        <User className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">{ride.driver}</h3>
                                        <p className="text-xs text-muted flex items-center gap-1">
                                            <Car className="w-3 h-3" /> {ride.vehicle}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`text-xs font-bold px-2 py-1 rounded-md ${ride.seats === 0 ? 'bg-red-500/20 text-red-500' : 'bg-[#8b5cf6]/20 text-[#8b5cf6]'}`}>{ride.seats} Seats Left</span>
                                </div>
                            </div>

                            <div className="space-y-4 mb-6 pt-4 border-t border-white/5 relative z-0 flex-1">
                                <div className="absolute left-[11px] top-[28px] w-0.5 h-10 bg-white/10 z-0"></div>
                                <div className="flex items-start gap-3 relative z-10">
                                    <div className="w-6 h-6 bg-[#0F172A] border-2 border-primary rounded-full flex items-center justify-center mt-0.5">
                                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white">Pick up</p>
                                        <p className="text-xs text-muted">{ride.from}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 relative z-10">
                                    <div className="w-6 h-6 bg-[#0F172A] border-2 border-[#8b5cf6] rounded-full flex items-center justify-center mt-0.5">
                                        <Map className="w-3 h-3 text-[#8b5cf6]" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white">Drop off</p>
                                        <p className="text-xs text-muted">{ride.to}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm text-muted mb-6 bg-[#0F172A] p-4 rounded-2xl border border-white/5 relative z-0">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-[#8b5cf6]" />
                                    {ride.time}
                                </div>
                                <div className="flex items-center gap-2 text-[#10B981] font-semibold">
                                    <HandCoins className="w-4 h-4" />
                                    {ride.contribution}
                                </div>
                            </div>

                            <button
                                onClick={() => handleRequestSeat(ride.id)}
                                disabled={ride.seats === 0}
                                className={`w-full py-3 font-bold rounded-xl transition-all shadow-lg text-sm uppercase tracking-wide relative z-0 ${ride.seats === 0 ? 'bg-[#0F172A] text-muted border border-white/5 cursor-not-allowed' : 'bg-[#8b5cf6]/10 text-[#8b5cf6] hover:bg-[#8b5cf6] hover:text-white'}`}
                            >
                                Request Seat
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-card glassmorphism p-8 rounded-3xl border border-white/5 text-center py-20 flex flex-col items-center justify-center">
                    <Route className="w-16 h-16 text-[#8b5cf6] mx-auto mb-6 opacity-80" />
                    <h3 className="text-2xl font-bold text-white mb-2">Publish a Route</h3>
                    <p className="text-muted max-w-md mx-auto mb-8">Traveling to work or running errands? Offer an empty seat to a verified neighbor and earn Barter Points.</p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-8 py-4 bg-[#8b5cf6] text-white font-bold rounded-xl neo-glow shadow-[0_0_15px_rgba(139,92,246,0.6)] hover:scale-105 transition-all"
                    >
                        Setup New Route
                    </button>
                </div>
            )}

            {/* Visual Modal for Adding Route Listing */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-[#0F172A] border border-white/10 rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl relative">
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <Car className="w-6 h-6 text-[#8b5cf6]" />
                            Create Route Listing
                        </h3>
                        <form onSubmit={handlePublishRoute} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-muted mb-2">From Location</label>
                                <input
                                    autoFocus
                                    required
                                    type="text"
                                    placeholder="e.g., Block 12 Mosque"
                                    value={fromLocation}
                                    onChange={(e) => setFromLocation(e.target.value)}
                                    className="w-full bg-[#1E293B] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#8b5cf6] transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-muted mb-2">Destination</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="e.g., Central Station"
                                    value={toLocation}
                                    onChange={(e) => setToLocation(e.target.value)}
                                    className="w-full bg-[#1E293B] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#8b5cf6] transition-colors"
                                />
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-semibold text-muted mb-2">Time</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g., 08:30 AM"
                                        value={routeTime}
                                        onChange={(e) => setRouteTime(e.target.value)}
                                        className="w-full bg-[#1E293B] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#8b5cf6] transition-colors"
                                    />
                                </div>
                                <div className="w-24">
                                    <label className="block text-sm font-semibold text-muted mb-2">Seats</label>
                                    <input
                                        required
                                        type="number"
                                        min="1"
                                        max="6"
                                        value={availableSeats}
                                        onChange={(e) => setAvailableSeats(Number(e.target.value))}
                                        className="w-full bg-[#1E293B] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#8b5cf6] transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4 mt-4 border-t border-white/5">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-transparent border border-white/10 text-muted hover:text-white font-bold rounded-xl transition-all">
                                    Cancel
                                </button>
                                <button type="submit" className="flex-1 py-3 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                                    Publish Route
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
