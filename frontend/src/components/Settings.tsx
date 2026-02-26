"use client";

import React, { useState } from 'react';
import { Settings as SettingsIcon, Shield, User, Bell, Lock, Activity, EyeOff, Save, Trash2, Globe, Database } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export default function Settings() {
    const { user, login } = useAuthStore();
    const [activeTab, setActiveTab] = useState('Account');

    // Privacy State
    const [purdahMode, setPurdahMode] = useState(false);
    const [sosLocation, setSosLocation] = useState(true);

    // Notification State
    const [pushNotifs, setPushNotifs] = useState(true);
    const [emailNotifs, setEmailNotifs] = useState(false);
    const [mosqueUpdates, setMosqueUpdates] = useState(true);

    // Account State
    const [email, setEmail] = useState(user?.email || '');
    const [fullName, setFullName] = useState(user?.username || '');
    const [phone, setPhone] = useState('+92 300 1234567');
    const [bio, setBio] = useState('Active member of the Mahalla since 2024.');
    const [avatar, setAvatar] = useState<string | null>(null);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    // Admin State
    const [strictVerification, setStrictVerification] = useState(true);
    const [autoSuspend, setAutoSuspend] = useState(false);

    if (!user) return null;

    const handleSave = () => {
        // In a real app, this would hit the Django API
        // Save to global auth store to render instantly in Dashboard Header
        login(
            localStorage.getItem('token') || '',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            { ...user, username: fullName, avatar: avatar } as any
        );
        alert("Settings saved securely to the MahallaHub servers. Your profile has been updated.");
    };

    const tabs = user.is_staff
        ? ['Account', 'Privacy & SOS', 'Notifications', 'Administration']
        : ['Account', 'Privacy & SOS', 'Notifications'];

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="bg-card glassmorphism p-6 md:p-8 rounded-3xl border border-white/5">
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                    <SettingsIcon className="w-6 h-6 text-[#14B8A6]" />
                    Protocol Configurations
                </h2>
                <p className="text-muted mb-8">Manage your MahallaHub digital identity, security settings, and network preferences.</p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Settings Nav */}
                    <div className="space-y-2 col-span-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === tab ? 'bg-[#14B8A6]/20 text-white border border-[#14B8A6]/30 neo-glow' : 'text-muted hover:bg-white/5 hover:text-white'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Settings Content Container */}
                    <div className="md:col-span-3 space-y-8">

                        {activeTab === 'Account' && (
                            <section className="bg-[#0F172A] p-6 rounded-2xl border border-white/5 space-y-8 animate-in fade-in duration-500">
                                <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4 flex items-center gap-2">
                                    <User className="w-5 h-5 text-[#94A3B8]" />
                                    Profile & Identity
                                </h3>

                                {/* Profile Picture Upload Section */}
                                <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-white/5">
                                    <div className="relative group">
                                        <div className="w-24 h-24 rounded-full bg-[#1E293B] border-2 border-[#14B8A6] flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(20,184,166,0.2)]">
                                            {avatar ? (
                                                <img src={avatar} alt="Profile Avatar" className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-3xl font-bold text-white uppercase">{fullName.slice(0, 2)}</span>
                                            )}
                                        </div>
                                        <label className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white text-xs font-semibold">
                                            <SettingsIcon className="w-4 h-4 mb-1" />
                                            Edit
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        const url = URL.createObjectURL(file); // Corrected from createURL to createObjectURL
                                                        setAvatar(url);
                                                    }
                                                }}
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-lg">Public Avatar</h4>
                                        <p className="text-sm text-muted">Upload a clear photo so neighbors can identify you easily. Max size: 2MB.</p>
                                    </div>
                                </div>

                                {/* Identity Information */}
                                <div>
                                    <h4 className="text-sm font-bold text-white mb-4">Personal Information</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Full Name</label>
                                            <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full bg-[#1E293B] border border-white/10 hover:border-white/30 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#14B8A6] transition-colors" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Clearance Level</label>
                                            <input type="text" disabled value={user.is_staff ? "System Administrator" : "Verified Citizen"} className={`w-full bg-[#1E293B]/50 border border-white/5 rounded-lg py-3 px-4 cursor-not-allowed font-bold ${user.is_staff ? 'text-[#14B8A6]' : 'text-[#10B981]'}`} />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Contact Number</label>
                                            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-[#1E293B] border border-white/10 hover:border-white/30 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#14B8A6] transition-colors" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Email Address</label>
                                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-[#1E293B] border border-white/10 hover:border-white/30 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#14B8A6] transition-colors" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Public Bio</label>
                                            <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} className="w-full bg-[#1E293B] border border-white/10 hover:border-white/30 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#14B8A6] transition-colors custom-scrollbar" placeholder="Tell your neighbors about yourself..."></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-white/5">
                                    <h4 className="text-sm font-bold text-white mb-4">Security Credentials</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Current Password</label>
                                            <input type="password" placeholder="••••••••" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="w-full bg-[#0F172A] border border-white/20 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#14B8A6] transition-colors" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">New Password <span className="text-[10px] text-muted ml-1">(Optional)</span></label>
                                            <input type="password" placeholder="Leave blank to keep current" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full bg-[#0F172A] border border-white/20 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#14B8A6] transition-colors" />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5 flex flex-col-reverse md:flex-row justify-between items-center gap-4">
                                    <button className="text-red-400 hover:text-red-300 text-sm font-medium flex items-center gap-2 transition-colors w-full md:w-auto justify-center">
                                        <Trash2 className="w-4 h-4" /> Terminate Account
                                    </button>
                                    <button onClick={handleSave} className="flex flex-row gap-2 px-6 py-3 bg-[#14B8A6] hover:bg-[#10B981] text-white font-bold rounded-xl transition-all shadow-lg text-sm neo-glow w-full md:w-auto justify-center">
                                        <Save className="w-4 h-4" /> Commit Profile Updates
                                    </button>
                                </div>
                            </section>
                        )}

                        {activeTab === 'Privacy & SOS' && (
                            <section className="bg-[#0F172A] p-6 rounded-2xl border border-white/5 space-y-8 animate-in fade-in duration-500">
                                <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4 flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-[#10B981]" />
                                    Geospatial Privacy Flags
                                </h3>

                                {/* Purdah Mode */}
                                <div className="flex items-start justify-between">
                                    <div className="max-w-[80%]">
                                        <h4 className="font-semibold text-white flex items-center gap-2">
                                            Purdah Mode (Privacy Shield)
                                            {purdahMode && <span className="text-[10px] bg-[#10B981]/20 text-[#10B981] px-2 py-0.5 rounded uppercase tracking-widest font-bold">Active</span>}
                                        </h4>
                                        <p className="text-sm text-muted mt-2 leading-relaxed">
                                            When enabled, your exact location is obfuscated to a generalized 50m radius for all community features (like Bartering or Ride Pooling) to protect identity exposure. SOS alerts bypass this automatically.
                                        </p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer mt-1">
                                        <input type="checkbox" className="sr-only peer" checked={purdahMode} onChange={() => setPurdahMode(!purdahMode)} />
                                        <div className={`w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${purdahMode ? 'bg-[#14B8A6] shadow-[0_0_10px_rgba(20,184,166,0.5)]' : ''}`}></div>
                                    </label>
                                </div>

                                {/* SOS GPS Mode */}
                                <div className="flex items-start justify-between border-t border-white/5 pt-6">
                                    <div className="max-w-[80%]">
                                        <h4 className="font-semibold text-red-100 flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4 text-red-400" />
                                            Sub-Second SOS Pinpointing
                                        </h4>
                                        <p className="text-sm text-muted mt-2 leading-relaxed">
                                            Allow the application continuous background access to GPS. When an emergency Panic SOS is triggered, your exact coordinates are transmitted to the 50 closest responders with zero latency. Disabling this may delay emergency response.
                                        </p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer mt-1">
                                        <input type="checkbox" className="sr-only peer" checked={sosLocation} onChange={() => setSosLocation(!sosLocation)} />
                                        <div className={`w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${sosLocation ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : ''}`}></div>
                                    </label>
                                </div>
                            </section>
                        )}

                        {activeTab === 'Notifications' && (
                            <section className="bg-[#0F172A] p-6 rounded-2xl border border-white/5 space-y-8 animate-in fade-in duration-500">
                                <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4 flex items-center gap-2">
                                    <Bell className="w-5 h-5 text-[#8b5cf6]" />
                                    Communication Protocol
                                </h3>

                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-semibold text-white">Push Notifications</h4>
                                            <p className="text-sm text-muted">Receive critical alerts natively on your device.</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" checked={pushNotifs} onChange={() => setPushNotifs(!pushNotifs)} />
                                            <div className={`w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${pushNotifs ? 'bg-[#14B8A6]' : ''}`}></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-semibold text-white">Mosque Board Digests</h4>
                                            <p className="text-sm text-muted">Get weekly summaries of community notices and Jummah timings.</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" checked={mosqueUpdates} onChange={() => setMosqueUpdates(!mosqueUpdates)} />
                                            <div className={`w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${mosqueUpdates ? 'bg-[#14B8A6]' : ''}`}></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-semibold text-white">Email Newsletters</h4>
                                            <p className="text-sm text-muted">Occasional updates from the SBF Consultancy development team.</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" checked={emailNotifs} onChange={() => setEmailNotifs(!emailNotifs)} />
                                            <div className={`w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${emailNotifs ? 'bg-[#14B8A6]' : ''}`}></div>
                                        </label>
                                    </div>
                                </div>
                            </section>
                        )}

                        {activeTab === 'Administration' && user.is_staff && (
                            <section className="bg-[#0F172A] p-6 rounded-2xl border border-red-500/20 space-y-8 animate-in fade-in duration-500 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl"></div>
                                <h3 className="text-lg font-bold text-red-400 border-b border-white/10 pb-4 flex items-center gap-2">
                                    <Lock className="w-5 h-5" />
                                    Security Clearances & Moderation
                                </h3>

                                <div className="space-y-6">
                                    <div className="flex items-start justify-between">
                                        <div className="max-w-[70%]">
                                            <h4 className="font-semibold text-white">Strict Verification Protocol</h4>
                                            <p className="text-sm text-muted mt-1">When enabled, citizens cannot access Rizq Sharing or Ride Pooling until their documents are manually approved.</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer mt-1">
                                            <input type="checkbox" className="sr-only peer" checked={strictVerification} onChange={() => setStrictVerification(!strictVerification)} />
                                            <div className={`w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${strictVerification ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]' : ''}`}></div>
                                        </label>
                                    </div>

                                    <div className="flex items-start justify-between">
                                        <div className="max-w-[70%]">
                                            <h4 className="font-semibold text-white">Auto-Suspend Fake SOS</h4>
                                            <p className="text-sm text-muted mt-1">Automatically suspend accounts that trigger more than 3 unresolved SOS alerts in a 30-day window.</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer mt-1">
                                            <input type="checkbox" className="sr-only peer" checked={autoSuspend} onChange={() => setAutoSuspend(!autoSuspend)} />
                                            <div className={`w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${autoSuspend ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]' : ''}`}></div>
                                        </label>
                                    </div>

                                    <div className="pt-6 border-t border-white/5">
                                        <button className="w-full py-3 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 border border-transparent font-bold rounded-xl transition-all text-sm uppercase tracking-wide flex items-center justify-center gap-2">
                                            <Database className="w-4 h-4" /> Export Mahalla Audit Logs
                                        </button>
                                    </div>
                                </div>
                            </section>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}

// Temporary inline icon for AlertCircle
const AlertCircle = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
)
