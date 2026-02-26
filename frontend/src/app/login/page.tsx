"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, User as UserIcon, LogIn, AlertCircle, Mail, UserPlus } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useVerificationStore } from '@/store/useVerificationStore';
import Link from 'next/link';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const { login } = useAuthStore();
    const { addRequest } = useVerificationStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            if (isLogin) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/auth/login/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                const data = await res.json();

                if (res.ok) {
                    login(data.token, data.user);
                    router.push('/dashboard');
                } else {
                    setError(data.non_field_errors?.[0] || 'Invalid credentials or network error.');
                }
            } else {
                // Mock registration or handle actual endpoint
                // Assume success but require admin approval
                setTimeout(() => {
                    addRequest({
                        id: Math.random().toString(36).substr(2, 9),
                        name: email.split('@')[0],
                        email: email,
                        docType: 'Pending Upload',
                        date: new Date().toLocaleDateString('en-GB')
                    });
                    setSuccessMsg("Registration successful! Your profile is pending review. An admin must verify your residency before access is granted.");
                    setEmail('');
                    setIsLoading(false);
                }, 1000);
            }
        } catch (err) {
            setError('An unexpected error occurred connecting to the MahallaHub server.');
            setIsLoading(false);
        } finally {
            if (isLogin) setIsLoading(false);
        }
    };

    // Auto fill mock data for demonstration
    const handleAutoFill = (role: 'citizen' | 'admin') => {
        if (role === 'admin') {
            setUsername('admin');
            setPassword('admin');
        } else {
            setUsername('citizen1');
            setPassword('password123');
        }
    };

    return (
        <div className="min-h-screen bg-[#0F172A] flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-[#14B8A6]/30">

            {/* Background Decor */}
            <div className="absolute top-0 inset-x-0 h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#14B8A6]/5 blur-[120px]"></div>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="flex justify-center flex-col items-center">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center neo-glow overflow-hidden border-4 border-primary/50 shadow-2xl mb-4 cursor-pointer" onClick={() => router.push('/')}>
                        <img src="/mohalla-app/logo.png" alt="MahallaHub Logo" className="w-full h-full object-cover scale-110" />
                    </div>
                    <h2 className="mt-2 text-center text-3xl font-black tracking-tight text-white uppercase">
                        Mahalla<span className="text-[#14B8A6]">Hub</span>
                    </h2>
                    <p className="mt-2 text-center text-sm text-[#94A3B8] font-medium">
                        Secure Neighborhood Gateway
                    </p>
                </div>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="bg-[#1E293B]/80 backdrop-blur-xl py-8 px-4 shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/5 sm:rounded-3xl sm:px-10">

                    <form className="space-y-6" onSubmit={handleSubmit}>

                        <div className="flex bg-[#0F172A] rounded-xl p-1 mb-6 border border-white/10">
                            <button
                                type="button"
                                onClick={() => { setIsLogin(true); setError(''); setSuccessMsg(''); }}
                                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${isLogin ? 'bg-[#14B8A6] text-white shadow-lg' : 'text-[#94A3B8] hover:text-white'}`}
                            >
                                Sign In
                            </button>
                            <button
                                type="button"
                                onClick={() => { setIsLogin(false); setError(''); setSuccessMsg(''); }}
                                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${!isLogin ? 'bg-[#14B8A6] text-white shadow-lg' : 'text-[#94A3B8] hover:text-white'}`}
                            >
                                Register
                            </button>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl flex items-start gap-3 text-sm">
                                <AlertCircle className="w-5 h-5 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        {successMsg && !isLogin && (
                            <div className="bg-[#10B981]/10 border border-[#10B981]/50 text-[#10B981] p-4 rounded-xl flex items-start gap-3 text-sm">
                                <ShieldCheck className="w-5 h-5 shrink-0" />
                                <span>{successMsg}</span>
                            </div>
                        )}

                        {isLogin ? (
                            <div>
                                <label className="block text-sm font-medium text-[#94A3B8] mb-1">
                                    Username or ID
                                </label>
                                <div className="relative">
                                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                                    <input
                                        type="text"
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full bg-[#0F172A] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent transition-all"
                                        placeholder="Enter your registered username"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div>
                                <label className="block text-sm font-medium text-[#94A3B8] mb-1">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-[#0F172A] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent transition-all"
                                        placeholder="Enter your email address"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-[#94A3B8] mb-1">
                                Security Passphrase
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#0F172A] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent transition-all"
                                    placeholder="••••••••••"
                                />
                            </div>
                        </div>

                        {isLogin && (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-[#14B8A6] focus:ring-[#14B8A6] bg-[#0F172A]"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-[#94A3B8]">
                                        Remember this device
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="#" className="font-medium text-[#14B8A6] hover:text-[#10B981] transition-colors">
                                        Lost passphrase?
                                    </a>
                                </div>
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-[#14B8A6] hover:bg-[#10B981] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#14B8A6] focus:ring-offset-[#0F172A] transition-all neo-glow disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Authenticating...' : (
                                    isLogin ? (
                                        <>
                                            <LogIn className="w-5 h-5" />
                                            Enter the Mahalla
                                        </>
                                    ) : (
                                        <>
                                            <UserPlus className="w-5 h-5" />
                                            Join the Mahalla
                                        </>
                                    )
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/5">
                        <p className="text-sm text-center text-[#94A3B8] mb-4">Quick Demo Access (Development)</p>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => handleAutoFill('admin')}
                                className="py-2 px-4 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-semibold border border-white/10 transition-colors"
                            >
                                Auto-fill Admin
                            </button>
                            <button
                                onClick={() => handleAutoFill('citizen')}
                                className="py-2 px-4 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-semibold border border-white/10 transition-colors"
                            >
                                Auto-fill Citizen
                            </button>
                        </div>
                    </div>
                </div>

                <p className="mt-6 text-center text-sm text-[#94A3B8]">
                    Not verified yet?{' '}
                    <Link href="/protocols" className="font-bold text-white hover:text-[#14B8A6] transition-colors">
                        Read the protocols here.
                    </Link>
                </p>

            </div>
        </div>
    );
}
