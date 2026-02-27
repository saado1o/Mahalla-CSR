"use client";

import React, { useState } from 'react';
import { BookOpen, Calendar, Bell, Users, MessageCircle, MapPin, Plus, X } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useVolunteerStore } from '@/store/useVolunteerStore';

export default function MosqueBoard() {
    const { user } = useAuthStore();
    const [filter, setFilter] = useState<'all' | 'announcement' | 'event' | 'janazah'>('all');

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [newType, setNewType] = useState<'announcement' | 'event' | 'janazah'>('announcement');

    // Volunteer State
    const { postings, applications, addPosting, deletePosting, applyForRole } = useVolunteerStore();
    const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
    const [activePostId, setActivePostId] = useState<number | null>(null);
    const [volunteerRole, setVolunteerRole] = useState('');
    const [volunteerExp, setVolunteerExp] = useState('');

    // Admin Volunteer State
    const [isAdminVolModalOpen, setIsAdminVolModalOpen] = useState(false);
    const [newVolTitle, setNewVolTitle] = useState('');
    const [newVolDesc, setNewVolDesc] = useState('');
    const [newVolRoles, setNewVolRoles] = useState('');

    const handleVolunteerSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (activePostId) {
            applyForRole(activePostId, user?.username || 'Citizen', volunteerRole, volunteerExp);
        }
        setIsVolunteerModalOpen(false);
        setVolunteerExp('');
    };

    const handleAdminVolSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addPosting(newVolTitle, newVolDesc, newVolRoles.split(',').map(r => r.trim()));
        setIsAdminVolModalOpen(false);
        setNewVolTitle('');
        setNewVolDesc('');
        setNewVolRoles('');
    };

    const [posts, setPosts] = useState([
        {
            id: 1,
            type: 'announcement',
            title: "Jummah Prayer Timings & Etiquette",
            author: "Imam Malik",
            date: "Today, 09:00 AM",
            content: "First Jama'at will be held at 1:30 PM, led by Hafiz Zubair. Second Jama'at at 2:30 PM. Please park your vehicles considerately to avoid blocking the main road.",
            tags: ["Jummah", "Important"]
        },
        {
            id: 2,
            type: 'janazah',
            title: "Salat al-Janazah: Baba Rahmatullah",
            author: "Mosque Committee",
            date: "Yesterday, 08:30 PM",
            content: "Inna lillahi wa inna ilayhi raji'un. Baba Rahmatullah of Block C has passed away. The funeral prayer will take place after Asr (5:15 PM) at the Central Mosque ground. Please attend if possible.",
            tags: ["Funeral", "Urgent"]
        },
        {
            id: 3,
            type: 'event',
            title: "Weekly Tafseer-ul-Quran Class",
            author: "Ustadh Ali",
            date: "Mon, 10:00 AM",
            content: "Join us every Wednesday after Maghrib for a comprehensive Tafseer of Surah Al-Kahf. Specialized streams for young adults available in the library hall.",
            tags: ["Education", "Youth"]
        },
        {
            id: 4,
            type: 'announcement',
            title: "Neighborhood Security Meeting",
            author: "Admin - Sheikh Ahmed",
            date: "Sun, 02:15 PM",
            content: "Given recent incidents in the adjacent sector, we are organizing a Mahalla security briefing focusing on activating the MahallaHub SOS features properly. All heads of households requested.",
            tags: ["Security", "Meeting"]
        }
    ]);

    const handleAddSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle.trim() || !newContent.trim()) return;

        setPosts([{
            id: Date.now(),
            type: newType,
            title: newTitle,
            author: user?.username || 'Admin',
            date: "Just Now",
            content: newContent,
            tags: ["New"]
        }, ...posts]);

        setNewTitle('');
        setNewContent('');
        setNewType('announcement');
        setIsModalOpen(false);
    };

    const filteredPosts = posts.filter(p => filter === 'all' || p.type === filter);

    return (
        <div className="space-y-6 relative">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-card glassmorphism p-6 rounded-3xl border border-white/5">
                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <BookOpen className="w-6 h-6 text-[#14B8A6]" />
                        Mosque Notice Board
                    </h2>
                    <p className="text-muted mt-1">Stay updated with spiritual guidance, community events, and critical notices.</p>
                </div>

                <div className="flex bg-[#0F172A] p-1 rounded-xl border border-white/5 shadow-inner">
                    {['all', 'announcement', 'event', 'janazah'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f as 'all' | 'announcement' | 'event' | 'janazah')}
                            className={`px-4 md:px-6 py-2 rounded-lg text-sm font-medium transition-all ${filter === f ? 'bg-[#14B8A6] text-white shadow-[0_0_15px_rgba(20,184,166,0.3)]' : 'text-muted hover:text-white'}`}
                        >
                            <span className="capitalize">{f}</span>
                        </button>
                    ))}
                </div>
            </div>

            {user?.is_staff && (
                <div
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#14B8A6]/10 border border-[#14B8A6]/30 rounded-2xl p-4 text-center cursor-pointer hover:bg-[#14B8A6]/20 transition-all flex items-center justify-center gap-2 group shadow-sm hover:shadow-md"
                >
                    <Plus className="w-5 h-5 text-[#14B8A6] group-hover:scale-110 transition-transform" />
                    <span className="text-[#14B8A6] font-bold tracking-wide uppercase text-sm">Post Global Announcement (Admin Mode)</span>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {filteredPosts.map(post => (
                        <div key={post.id} className="bg-card glassmorphism p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-all">
                            <div className="flex justify-between items-start mb-4 border-b border-white/5 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${post.type === 'janazah' ? 'bg-red-500/20 text-red-500' : post.type === 'event' ? 'bg-[#8b5cf6]/20 text-[#8b5cf6]' : 'bg-[#14B8A6]/20 text-[#14B8A6]'}`}>
                                        {post.type === 'janazah' ? <Bell className="w-6 h-6" /> : post.type === 'event' ? <Calendar className="w-6 h-6" /> : <BookOpen className="w-6 h-6" />}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">{post.title}</h3>
                                        <p className="text-xs text-muted">Posted by <span className="text-[#14B8A6] font-semibold">{post.author}</span> • {post.date}</p>
                                    </div>
                                </div>
                            </div>
                            <p className="text-[#94A3B8] leading-relaxed mb-6">{post.content}</p>

                            <div className="flex items-center justify-between">
                                <div className="flex gap-2">
                                    {post.tags.map(tag => (
                                        <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-white/5 text-muted rounded-md border border-white/10">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-4">
                                    <button className="flex items-center gap-1 text-sm text-muted hover:text-[#14B8A6] transition-colors">
                                        <MessageCircle className="w-4 h-4" /> Reply
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sidebar for Mosque Info */}
                <div className="space-y-6">
                    <div className="bg-[#0F172A] p-6 rounded-3xl border border-white/5 space-y-4">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/5 pb-4">
                            <MapPin className="text-[#14B8A6] w-5 h-5" />
                            Central Mosque
                        </h3>

                        <div className="space-y-3 pt-2">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted">Fajr</span>
                                <span className="text-white font-bold">05:45 AM</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted">Dhuhr</span>
                                <span className="text-white font-bold">01:30 PM</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted">Asr</span>
                                <span className="text-white font-bold">05:15 PM</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted">Maghrib</span>
                                <span className="text-white font-bold">06:42 PM</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted">Isha</span>
                                <span className="text-white font-bold">08:15 PM</span>
                            </div>
                        </div>

                        <button className="w-full mt-4 py-3 bg-[#14B8A6]/10 text-[#14B8A6] font-bold rounded-xl hover:bg-[#14B8A6] hover:text-white transition-all text-sm uppercase tracking-wider">
                            Download Schedule PDF
                        </button>
                    </div>

                    {postings.map(posting => {
                        const userApp = applications.find(a => a.postId === posting.id && a.username === user?.username);
                        const hasApplied = !!userApp;
                        return (
                            <div key={posting.id} className="bg-card glassmorphism p-6 rounded-3xl border border-white/5 text-center relative group">
                                {user?.is_staff && (
                                    <button onClick={() => deletePosting(posting.id)} className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-400/20 rounded-full">
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                                <Users className="w-12 h-12 text-[#10B981] mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-white mb-2">{posting.title}</h3>
                                <p className="text-sm text-muted mb-4">{posting.description}</p>
                                {hasApplied ? (
                                    <button disabled className={`w-full py-2 border font-bold rounded-xl flex items-center justify-center gap-2 ${userApp.status === 'Approved' ? 'bg-[#10B981]/10 border-[#10B981]/30 text-[#10B981]' : userApp.status === 'Rejected' ? 'bg-red-500/10 border-red-500/30 text-red-500' : 'bg-secondary/10 border-secondary/30 text-secondary opacity-75 cursor-not-allowed'}`}>
                                        <Users className="w-4 h-4" /> Application {userApp.status}
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => { setActivePostId(posting.id); setVolunteerRole(posting.roles[0] || ''); setIsVolunteerModalOpen(true); }}
                                        className="w-full py-2 bg-transparent border border-[#10B981] text-[#10B981] hover:bg-[#10B981]/20 font-bold rounded-xl transition-all"
                                    >
                                        Apply Now
                                    </button>
                                )}
                            </div>
                        );
                    })}

                    {user?.is_staff && (
                        <div
                            onClick={() => setIsAdminVolModalOpen(true)}
                            className="bg-[#10B981]/10 border border-[#10B981]/30 rounded-3xl p-6 text-center cursor-pointer hover:bg-[#10B981]/20 transition-all flex flex-col items-center justify-center gap-2 group"
                        >
                            <Plus className="w-8 h-8 text-[#10B981] group-hover:scale-110 transition-transform" />
                            <span className="text-[#10B981] font-bold tracking-wide uppercase text-sm">Post Volunteer Need</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Visual Modal for Adding Post */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-[#0F172A] border border-white/10 rounded-3xl p-6 md:p-8 w-full max-w-lg shadow-2xl relative">
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <BookOpen className="w-6 h-6 text-[#14B8A6]" />
                            Create Global Announcement
                        </h3>
                        <form onSubmit={handleAddSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-muted mb-2">Category</label>
                                <div className="flex bg-[#1E293B] p-1 rounded-xl border border-white/5 gap-1">
                                    {['announcement', 'event', 'janazah'].map((typeOption) => (
                                        <button
                                            key={typeOption}
                                            type="button"
                                            onClick={() => setNewType(typeOption as 'announcement' | 'event' | 'janazah')}
                                            className={`flex-1 py-2 rounded-lg text-sm font-bold capitalize transition-all ${newType === typeOption
                                                ? typeOption === 'janazah' ? 'bg-red-500/20 text-red-500' :
                                                    typeOption === 'event' ? 'bg-[#8b5cf6]/20 text-[#8b5cf6]' :
                                                        'bg-[#14B8A6]/20 text-[#14B8A6]'
                                                : 'text-muted hover:text-white'
                                                }`}
                                        >
                                            {typeOption}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-muted mb-2">Title</label>
                                <input
                                    autoFocus
                                    required
                                    type="text"
                                    placeholder="e.g., Jummah Timings Changed"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    className="w-full bg-[#1E293B] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#14B8A6] transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-muted mb-2">Content Details</label>
                                <textarea
                                    required
                                    rows={4}
                                    placeholder="Detailed information about this post..."
                                    value={newContent}
                                    onChange={(e) => setNewContent(e.target.value)}
                                    className="w-full bg-[#1E293B] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#14B8A6] transition-colors resize-none"
                                />
                            </div>

                            <div className="flex gap-4 pt-4 mt-4 border-t border-white/5">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-transparent border border-white/10 text-muted hover:text-white font-bold rounded-xl transition-all">
                                    Cancel
                                </button>
                                <button type="submit" className="flex-1 py-3 bg-[#14B8A6] hover:bg-[#10B981] text-white font-bold rounded-xl transition-all shadow-lg neo-glow">
                                    Broadcast Post
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Visual Modal for Volunteer Application */}
            {isVolunteerModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-[#0F172A] border border-[#10B981]/30 rounded-3xl p-6 md:p-8 w-full max-w-lg shadow-2xl relative">
                        <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                            <Users className="w-6 h-6 text-[#10B981]" />
                            Join Volunteer Committee
                        </h3>
                        <p className="text-muted text-sm mb-6">Contribute your time and skills for the betterment of the Mahalla.</p>
                        <form onSubmit={handleVolunteerSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-muted mb-2">Preferred Role</label>
                                <select
                                    value={volunteerRole}
                                    onChange={(e) => setVolunteerRole(e.target.value)}
                                    className="w-full bg-[#1E293B] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#10B981] transition-colors appearance-none"
                                >
                                    {postings.find(p => p.id === activePostId)?.roles.map(r => (
                                        <option key={r} value={r}>{r}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-muted mb-2">Brief Cover Letter / Experience</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={volunteerExp}
                                    onChange={(e) => setVolunteerExp(e.target.value)}
                                    placeholder="I have experience in..."
                                    className="w-full bg-[#1E293B] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#10B981] transition-colors resize-none"
                                />
                            </div>

                            <div className="flex gap-4 pt-4 mt-4 border-t border-white/5">
                                <button type="button" onClick={() => setIsVolunteerModalOpen(false)} className="flex-1 py-3 bg-transparent border border-white/10 text-muted hover:text-white font-bold rounded-xl transition-all">
                                    Cancel
                                </button>
                                <button type="submit" className="flex-1 py-3 bg-[#10B981] hover:bg-emerald-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-[#10B981]/20">
                                    Submit Application
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Admin Add Posting Modal */}
            {isAdminVolModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-[#0F172A] border border-[#10B981]/30 rounded-3xl p-6 md:p-8 w-full max-w-lg shadow-2xl relative">
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <Users className="w-6 h-6 text-[#10B981]" />
                            Create Volunteer Posting
                        </h3>
                        <form onSubmit={handleAdminVolSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-muted mb-2">Title</label>
                                <input
                                    autoFocus
                                    required
                                    type="text"
                                    placeholder="e.g., General Maintenance & Events"
                                    value={newVolTitle}
                                    onChange={(e) => setNewVolTitle(e.target.value)}
                                    className="w-full bg-[#1E293B] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#10B981] transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-muted mb-2">Description</label>
                                <textarea
                                    required
                                    rows={3}
                                    placeholder="Detail what the mosque needs help with..."
                                    value={newVolDesc}
                                    onChange={(e) => setNewVolDesc(e.target.value)}
                                    className="w-full bg-[#1E293B] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#10B981] transition-colors resize-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-muted mb-2">Roles (Comma separated)</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="e.g., Security, Imam Assistant, Cleaning"
                                    value={newVolRoles}
                                    onChange={(e) => setNewVolRoles(e.target.value)}
                                    className="w-full bg-[#1E293B] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#10B981] transition-colors"
                                />
                            </div>
                            <div className="flex gap-4 pt-4 mt-4 border-t border-white/5">
                                <button type="button" onClick={() => setIsAdminVolModalOpen(false)} className="flex-1 py-3 bg-transparent border border-white/10 text-muted hover:text-white font-bold rounded-xl transition-all">
                                    Cancel
                                </button>
                                <button type="submit" className="flex-1 py-3 bg-[#10B981] hover:bg-emerald-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-[#10B981]/20">
                                    Publish Posting
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
