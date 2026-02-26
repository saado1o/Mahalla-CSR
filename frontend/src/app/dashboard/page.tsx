"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import {
  LayoutDashboard,
  ShieldCheck,
  BellRing,
  BookOpen,
  Briefcase,
  UtensilsCrossed,
  Calculator,
  Car,
  Settings,
  LogOut,
  Menu,
  X,
  User as UserIcon,
  Search,
  Bell,
  MapPin,
  Users,
  AlertTriangle,
  CheckCircle2,
  Info
} from 'lucide-react';
import { useNotificationStore } from '@/store/useNotificationStore';
import { useAlertStore } from '@/store/useAlertStore';
import ZakatCalculator from '@/components/ZakatCalculator';
import SkillBarter from '@/components/SkillBarter';
import MosqueBoard from '@/components/MosqueBoard';
import Verification from '@/components/Verification';
import RizqSharing from '@/components/RizqSharing';
import RidePooling from '@/components/RidePooling';
import SettingsView from '@/components/Settings';
import { useVolunteerStore } from '@/store/useVolunteerStore';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SidebarItem = ({
  icon: Icon,
  label,
  active = false,
  onClick
}: {
  icon: React.ElementType,
  label: string,
  active?: boolean,
  onClick?: () => void
}) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all duration-200 group text-sm",
      active
        ? "bg-primary text-white neo-glow"
        : "text-muted hover:bg-white/5 hover:text-foreground"
    )}
  >
    <Icon className={cn("w-4 h-4", active ? "text-white" : "text-muted group-hover:text-primary")} />
    <span className="font-semibold">{label}</span>
  </button>
);

export default function Dashboard() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { applications: volunteerApplications, updateApplicationStatus } = useVolunteerStore();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const [notifications, setNotifications] = useState([
    { id: 1, text: "Skill request from M. Usman", time: "2m ago", unread: true, link: 'Skill Barter' },
    { id: 2, text: "Ride confirmed by Omar F.", time: "1h ago", unread: true, link: 'Ride Pooling' },
    { id: 3, text: "New Mosque announcement posted", time: "3h ago", unread: false, link: 'Mosque Board' },
    { id: 4, text: "Water Maintenance Notice updated", time: "1d ago", unread: false, link: 'Dashboard' }
  ]);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const handleNotificationClick = (id: number, link: string) => {
    setActiveTab(link);
    setIsNotificationsOpen(false);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const executeSearch = (targetTab: string) => {
    setActiveTab(targetTab);
    setIsSearchFocused(false);
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // WebSocket and Alert Store integration
  const wsRef = useRef<WebSocket | null>(null);
  const { isEmergencyActive, emergencyData, triggerEmergency, resolveEmergency } = useAlertStore();

  useEffect(() => {
    // Connect to Django Channels WebSocket
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const wsProtocol = apiUrl.startsWith('https') ? 'wss' : 'ws';
    const wsHost = apiUrl.replace(/^https?:\/\//, '');
    const ws = new WebSocket(`${wsProtocol}://${wsHost}/ws/emergency/`);

    ws.onopen = () => console.log('Connected to Mahalla SOS network.');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'SOS_ALERT') {
        triggerEmergency({
          lat: data.lat,
          lon: data.lon,
          user_id: data.user_id,
          message: data.message
        });
      }
    };

    wsRef.current = ws;

    return () => {
      ws.close();
    };
  }, [triggerEmergency]);

  const handlePanicSOS = () => {
    const fallbackPayload = {
      lat: 24.86,
      lon: 67.00,
      user_id: user?.username || 'Citizen',
      message: 'Emergency Triggered!'
    };

    const triggerLocal = (lat: number, lon: number) => {
      triggerEmergency({
        lat,
        lon,
        user_id: user?.username || 'Citizen',
        message: 'Panic trigger initiated!'
      });
    };

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      // Simulate grabbing user's GPS
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          wsRef.current?.send(JSON.stringify({
            type: 'SOS',
            user_id: user?.username || 101,
            lat: pos.coords.latitude,
            lon: pos.coords.longitude
          }));
          triggerLocal(pos.coords.latitude, pos.coords.longitude);
        },
        () => {
          // Fallback if Geolocation fails or is blocked
          wsRef.current?.send(JSON.stringify({ type: 'SOS', ...fallbackPayload }));
          triggerLocal(fallbackPayload.lat, fallbackPayload.lon);
        }
      );
    } else {
      // Fallback for local demo if WS is disconnected
      navigator.geolocation.getCurrentPosition(
        (pos) => triggerLocal(pos.coords.latitude, pos.coords.longitude),
        () => triggerLocal(fallbackPayload.lat, fallbackPayload.lon)
      );
    }
  };

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard },
    { label: 'Verification', icon: ShieldCheck },
    { label: 'Mosque Board', icon: BookOpen },
    { label: 'Skill Barter', icon: Briefcase },
    { label: 'Rizq Sharing', icon: UtensilsCrossed },
    { label: 'Zakat Calc', icon: Calculator },
    { label: 'Ride Pooling', icon: Car },
    { label: 'Settings', icon: Settings },
  ];

  if (user?.is_staff) {
    menuItems.splice(1, 0, { label: 'Admin Panel', icon: Users });
  }

  if (!isAuthenticated || !user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <aside
        className={cn(
          "h-full glassmorphism transition-all duration-300 flex flex-col z-20 shrink-0 border-r border-white/5",
          isSidebarOpen ? "w-64" : "w-0 -translate-x-full md:w-20 md:translate-x-0"
        )}
      >
        <div className="pt-8 pb-4 flex flex-col items-center justify-center relative">
          <div className={cn("flex flex-col items-center", !isSidebarOpen && "md:hidden")}>
            <div className="w-28 h-28 rounded-full flex items-center justify-center neo-glow overflow-hidden border-2 border-[#14B8A6]/30 shadow-2xl shrink-0 bg-[#0F172A]">
              <img src="/mohalla-app/logo.png" alt="MahallaHub Logo" className="w-full h-full object-cover scale-110" />
            </div>
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="absolute top-4 right-4 p-2 hover:bg-white/5 rounded-lg md:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 py-4 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              label={isSidebarOpen ? item.label : ''}
              active={activeTab === item.label}
              onClick={() => setActiveTab(item.label)}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-border-custom space-y-2">
          <button
            onClick={handlePanicSOS}
            className="flex items-center gap-3 w-full px-3 py-2.5 text-red-400 hover:bg-red-400/10 rounded-xl transition-all group text-sm"
          >
            <BellRing className="w-4 h-4 group-hover:neo-glow-alert" />
            <span className={cn("font-bold uppercase tracking-wider", !isSidebarOpen && "md:hidden text-xs")}>
              Emergency SOS
            </span>
          </button>
          <button
            onClick={() => { logout(); router.push('/login'); }}
            className="flex items-center gap-3 w-full px-3 py-2.5 text-muted hover:bg-white/5 hover:text-white rounded-xl transition-all group text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span className={cn("font-semibold", !isSidebarOpen && "md:hidden text-xs")}>
              Log Out
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">

        {/* EMERGENCY FULL SCREEN OVERLAY */}
        {isEmergencyActive && emergencyData && (
          <div className="absolute inset-0 z-50 bg-red-900/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 border-4 border-red-500 animate-pulse">
            <BellRing className="w-24 h-24 text-white mb-6 animate-bounce" />
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-widest mb-4 drop-shadow-[0_0_15px_rgba(239,68,68,1)]">
              SOS Alert Active
            </h1>
            <p className="text-xl md:text-2xl text-red-100 mb-8 max-w-2xl font-medium">
              Neighbor {emergencyData.user_id} triggered a panic alarm nearby!
            </p>

            <div className="bg-black/40 p-6 rounded-2xl border border-red-500/30 mb-8 w-full max-w-lg">
              <div className="flex items-center justify-center gap-3 text-red-200 mb-2">
                <MapPin className="w-6 h-6" />
                <span className="text-lg font-mono">{emergencyData.lat.toFixed(4)}, {emergencyData.lon.toFixed(4)}</span>
              </div>
              <p className="text-sm text-red-300">Distance: ~300m Away</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <button
                className="flex-1 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-lg transition-all shadow-[0_0_20px_rgba(239,68,68,0.5)]"
                onClick={() => alert("Simulating route to neighbor...")}
              >
                I&apos;m Coming
              </button>
              <button
                onClick={resolveEmergency}
                className="flex-1 py-4 bg-transparent border-2 border-red-400 text-red-100 hover:bg-red-400/20 font-bold rounded-xl text-lg transition-all"
              >
                Ignore / Dismiss
              </button>
            </div>
          </div>
        )}

        {/* NOTIFICATION TOAST */}
        <NotificationToast />

        {/* Header */}
        <header className="h-16 glassmorphism flex items-center justify-between px-6 z-10 border-b border-white/5">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 hover:bg-white/5 rounded-lg text-muted hidden md:block"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold text-white">{activeTab}</h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden lg:block z-50">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim().length > 0) {
                    executeSearch('Search Results');
                  }
                }}
                placeholder="Search neighborhood..."
                className="bg-card w-64 pl-9 pr-4 py-1.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:neo-glow text-sm transition-all relative z-50 border border-white/5"
              />
              {isSearchFocused && searchQuery.length > 0 && (
                <div className="absolute top-full left-0 mt-2 w-full bg-[#0F172A] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in">
                  <div className="p-3">
                    <p className="text-xs text-muted font-bold uppercase tracking-wider mb-2 px-2">Global Results</p>
                    <div
                      onMouseDown={() => executeSearch('Search Results')}
                      className="px-2 py-2 hover:bg-white/5 rounded-lg cursor-pointer text-sm font-medium text-white transition-colors"
                    >
                      Search globally for &quot;{searchQuery}&quot;
                    </div>
                    <div
                      onMouseDown={() => executeSearch('Mosque Board')}
                      className="px-2 py-2 hover:bg-white/5 rounded-lg cursor-pointer text-sm font-medium text-white transition-colors"
                    >
                      Search for &quot;{searchQuery}&quot; in Mosque Board
                    </div>
                    <div
                      onMouseDown={() => executeSearch('Skill Barter')}
                      className="px-2 py-2 hover:bg-white/5 rounded-lg cursor-pointer text-sm font-medium text-white transition-colors"
                    >
                      Search for &quot;{searchQuery}&quot; in Skill Barter
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="relative z-50">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2.5 bg-card hover:bg-white/5 rounded-xl relative group transition-all"
              >
                <Bell className="w-5 h-5 text-muted group-hover:text-primary transition-colors" />
                {notifications.some(n => n.unread) && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                )}
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-[#0F172A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                  <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
                    <h3 className="font-bold text-white">Notifications</h3>
                    <button onClick={handleMarkAllRead} className="text-xs text-[#14B8A6] hover:underline font-semibold">Mark all as read</button>
                  </div>
                  <div className="max-h-80 overflow-y-auto custom-scrollbar p-2">
                    {notifications.map(notif => (
                      <div
                        key={notif.id}
                        onClick={() => handleNotificationClick(notif.id, notif.link)}
                        className="p-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer flex gap-3 items-start"
                      >
                        <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${notif.unread ? 'bg-[#14B8A6] shadow-[0_0_8px_rgba(20,184,166,0.6)]' : 'bg-transparent'}`} />
                        <div>
                          <p className={`text-sm ${notif.unread ? 'text-white font-semibold' : 'text-muted'}`}>{notif.text}</p>
                          <p className="text-xs text-muted mt-1">{notif.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-white/5 text-center bg-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                    <span className="text-xs font-bold text-muted uppercase tracking-wider hover:text-white transition-colors">View All History</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 pl-4 border-l border-border-custom">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-white capitalize">{user.username}</p>
                <p className="text-xs text-muted">{user.is_staff ? 'Administrator' : 'Verified Resident'}</p>
              </div>
              <div className="relative">
                <div
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  title="Profile Menu"
                  className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-white font-bold neo-glow uppercase overflow-hidden border-2 border-[#14B8A6] cursor-pointer hover:scale-105 transition-all shadow-lg"
                >
                  {/* Simulated persistent active avatar check (usually grabbed from User store) */}
                  {user?.avatar ? (
                    <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    user.username.slice(0, 2)
                  )}
                </div>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-[#0F172A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="p-4 border-b border-white/5 bg-white/5">
                      <p className="text-sm font-bold text-white capitalize">{user.username}</p>
                      <p className="text-xs text-muted mb-2">{user.is_staff ? 'Administrator' : 'Verified Resident'}</p>
                      <div className="flex items-center justify-center gap-1 text-[10px] text-[#14B8A6] font-bold tracking-wider uppercase bg-[#14B8A6]/10 px-2 py-1 rounded">
                        Citizen ID: #{user.username.length * 123}
                      </div>
                    </div>
                    <div className="p-2 space-y-1">
                      <button
                        onClick={() => { setActiveTab('Settings'); setIsProfileDropdownOpen(false); }}
                        className="w-full text-left px-3 py-2 text-sm text-muted hover:bg-[#14B8A6] hover:text-white font-medium rounded-xl transition-colors flex items-center gap-2"
                      >
                        <Settings className="w-4 h-4" /> Create / Edit Profile
                      </button>
                      <button
                        onClick={() => { logout(); router.push('/login'); }}
                        className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-400/20 font-medium rounded-xl transition-colors flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out Session
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#0F172A]/50 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-6">
            {activeTab === 'Dashboard' && (
              <>
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Active Neighbors', value: '1,248', trend: '+12%', color: 'var(--primary)' },
                    { label: 'Unread Notices', value: '3', trend: 'New', color: 'var(--secondary)' },
                    { label: 'Barter Points', value: '450', trend: '+50', color: '#8b5cf6' },
                    { label: 'Safety Index', value: '98%', trend: 'Good', color: '#10B981' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-card glassmorphism p-5 rounded-2xl hover:bg-white/5 transition-all cursor-pointer group border border-white/5">
                      <p className="text-xs text-muted font-medium mb-1">{stat.label}</p>
                      <div className="flex items-end justify-between">
                        <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                        <span className="text-xs font-semibold px-2 py-1 rounded-md bg-white/5 text-primary">
                          {stat.trend}
                        </span>
                      </div>
                      <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: '70%', background: stat.color }}></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Recent Alerts & Notices */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-card glassmorphism rounded-2xl overflow-hidden border border-white/5">
                      <div className="p-5 border-b border-white/5 flex items-center justify-between bg-white/5">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                          <BookOpen className="text-primary w-5 h-5" />
                          Mosque Notice Board
                        </h2>
                        <button className="text-primary text-sm font-semibold hover:underline">View All</button>
                      </div>
                      <div className="p-6 space-y-4">
                        {[
                          { icon: BookOpen, title: "Jummah Prayer Times", time: "2 hours ago", desc: "First Jama'at at 1:30 PM, Second Jama'at at 2:30 PM. Please arrive early.", type: 'Notice' },
                          { icon: BellRing, title: "Emergency Water Maintenance", time: "5 hours ago", desc: "Water supply will be suspended in Block C for 2 hours due to pipe repairs.", type: 'Alert' },
                          { icon: UtensilsCrossed, title: "Grand Community Iftar", time: "1 day ago", desc: "Registration open for the neighborhood Iftar on the 27th of Ramadan.", type: 'Event' },
                        ].map((item, idx) => (
                          <div key={idx} className="flex gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5">
                            <div className={cn(
                              "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                              item.type === 'Alert' ? "bg-red-400/20 text-red-400" : "bg-primary/20 text-primary"
                            )}>
                              <item.icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-semibold text-white">{item.title}</h4>
                                <span className="text-xs text-muted">{item.time}</span>
                              </div>
                              <p className="text-sm text-muted leading-relaxed line-clamp-2">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar Cards */}
                  <div className="space-y-6">
                    {/* Emergency Panic Widget */}
                    <div className="bg-red-500/10 glassmorphism p-8 rounded-3xl border border-red-500/20 text-center space-y-4">
                      <div
                        onClick={handlePanicSOS}
                        className="w-20 h-20 bg-red-500 rounded-full mx-auto flex items-center justify-center animate-pulse neo-glow-alert cursor-pointer hover:scale-105 transition-transform"
                      >
                        <BellRing className="w-10 h-10 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Emergency SOS</h3>
                        <p className="text-sm text-red-300 mt-1">Tap to notify up to 50 nearest neighbors</p>
                      </div>
                    </div>

                    {/* Zakat Quick Pay */}
                    <div className="bg-card glassmorphism p-5 rounded-2xl border border-white/5 space-y-3 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Calculator className="text-secondary w-5 h-5" />
                        Zakat Contribution
                      </h3>
                      <p className="text-xs text-muted">Contribute to the Mahalla Welfare Fund securely.</p>
                      <div className="bg-[#0F172A] p-3 rounded-xl border border-white/5 space-y-1.5">
                        <p className="text-[10px] text-muted font-bold uppercase tracking-wider">Official Trust Account</p>
                        <p className="text-sm font-semibold text-white">Meezan Bank Limited</p>
                        <p className="text-secondary font-mono text-xs tracking-widest bg-secondary/10 px-2 py-1 rounded inline-block border border-secondary/30">PK34 MEZN 0123</p>
                      </div>
                      <div className="flex gap-2 relative z-10 pt-1">
                        <button
                          onClick={() => executeSearch('Zakat Calc')}
                          className="flex-1 py-2.5 bg-secondary text-white font-bold rounded-lg neo-glow transition-all hover:scale-[1.02] text-sm"
                        >
                          Contribute Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'Zakat Calc' && <ZakatCalculator />}
            {activeTab === 'Skill Barter' && <SkillBarter />}
            {activeTab === 'Mosque Board' && <MosqueBoard />}
            {activeTab === 'Verification' && <Verification />}
            {activeTab === 'Rizq Sharing' && <RizqSharing />}
            {activeTab === 'Ride Pooling' && <RidePooling />}
            {activeTab === 'Settings' && <SettingsView />}

            {activeTab === 'Search Results' && (
              <div className="bg-card glassmorphism p-8 rounded-3xl border border-white/5 space-y-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Search className="text-primary w-6 h-6" />
                  Search Results for &quot;{searchQuery}&quot;
                </h2>
                <p className="text-muted pb-4 border-b border-white/5">Displaying results across all Mahalla modules...</p>

                {searchQuery ? (
                  <div className="flex flex-col gap-4">
                    <div
                      onClick={() => setActiveTab('Mosque Board')}
                      className="p-5 bg-white/5 rounded-2xl border border-white/10 hover:border-primary/50 cursor-pointer transition-all hover:bg-white/10"
                    >
                      <h4 className="text-white font-bold mb-1 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-primary" /> Mosque Board: Notice Match
                      </h4>
                      <p className="text-sm text-muted">A recent community post mentions &quot;<span className="text-primary font-semibold">{searchQuery}</span>&quot;. Click to view the board.</p>
                    </div>
                    <div
                      onClick={() => setActiveTab('Verification')}
                      className="p-5 bg-white/5 rounded-2xl border border-white/10 hover:border-primary/50 cursor-pointer transition-all hover:bg-white/10"
                    >
                      <h4 className="text-white font-bold mb-1 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-primary" /> Neighbors: Resident Match
                      </h4>
                      <p className="text-sm text-muted">We found multiple verified neighbors matching &quot;<span className="text-primary font-semibold">{searchQuery}</span>&quot; in Sector G.</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-red-400 font-medium">Please enter a valid search term to see results.</p>
                )}
              </div>
            )}

            {activeTab === 'Admin Panel' && user?.is_staff && (
              <div className="bg-card glassmorphism p-8 rounded-3xl border border-white/5">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <Users className="w-6 h-6 text-primary" />
                  Admin Panel: Citizen Database
                </h2>
                <p className="text-[#94A3B8] mb-6">You have administrative clearance. Here you can view and manage all Mahalla subjects.</p>
                <div className="bg-[#0F172A] border border-white/5 rounded-2xl p-6">
                  <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-4">
                    <span className="font-semibold text-white">citizen1</span>
                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-md">Verified</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-4">
                    <span className="font-semibold text-white">admin</span>
                    <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-md">Admin</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
function NotificationToast() {
  const { notification, clearNotification } = useNotificationStore();

  if (!notification) return null;

  const config = {
    error: { icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-500/50' },
    success: { icon: CheckCircle2, color: 'text-[#14B8A6]', bg: 'bg-[#14B8A6]/10', border: 'border-[#14B8A6]/50' },
    info: { icon: Info, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/50' }
  }[notification.type];

  const Icon = config.icon;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md px-4 animate-in slide-in-from-top-4 duration-300">
      <div className={cn("flex gap-3 p-4 rounded-2xl border backdrop-blur-xl shadow-2xl", config.bg, config.border)}>
        <Icon className={cn("w-6 h-6 shrink-0", config.color)} />
        <div className="flex-1">
          <h4 className={cn("text-sm font-bold uppercase tracking-wider mb-0.5", config.color)}>{notification.title}</h4>
          <p className="text-sm text-muted line-clamp-2">{notification.message}</p>
        </div>
        <button onClick={clearNotification} className="text-muted hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
