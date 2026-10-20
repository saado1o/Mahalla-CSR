"use client";

import React from 'react';
import Link from 'next/link';
import { Globe, Shield, HeartHandshake, MapPin, ExternalLink, FileCode, Compass } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#0B1120] border-t border-white/10 pt-16 pb-12 text-[#94A3B8] relative z-20">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Main 4-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
                    
                    {/* Brand & Provenance */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#14B8A6]/20 border border-[#14B8A6]/40 flex items-center justify-center">
                                <Globe className="text-[#14B8A6] w-5 h-5" />
                            </div>
                            <span className="text-xl font-black text-white tracking-tight">
                                Mahalla<span className="text-[#14B8A6]">Hub</span>
                            </span>
                        </div>
                        <p className="text-sm text-[#94A3B8] leading-relaxed">
                            Privacy-first, verified Islamic neighborhood network engineered for real-time crisis dispatch, halal barter economy, and community governance.
                        </p>
                        
                        {/* Mandatory SBF Consultancy Provenance Box */}
                        <div className="pt-2">
                            <div className="p-4 rounded-2xl bg-[#1E293B]/80 border border-[#14B8A6]/30 shadow-lg hover:border-[#14B8A6]/60 transition-all">
                                <p className="text-xs uppercase tracking-wider text-[#94A3B8] font-bold mb-1">
                                    Project Stewardship
                                </p>
                                <p className="text-sm font-semibold text-white">
                                    This is a project of{' '}
                                    <a
                                        href="https://sbf-consultancy.net"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#14B8A6] hover:text-[#10B981] font-bold underline decoration-2 decoration-[#14B8A6]/50 hover:decoration-[#10B981] transition-all inline-flex items-center gap-1"
                                    >
                                        SBF Consultancy
                                        <ExternalLink className="w-3.5 h-3.5 inline" />
                                    </a>
                                </p>
                                <p className="text-xs text-[#64748B] mt-1">
                                    Official portal:{' '}
                                    <a
                                        href="https://sbf-consultancy.net"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#94A3B8] hover:text-white transition-colors"
                                    >
                                        sbf-consultancy.net
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Platform Architecture */}
                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Compass className="w-4 h-4 text-[#14B8A6]" /> Core Modules
                        </h4>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link href="/dashboard" className="hover:text-white transition-colors flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6]"></span>
                                    Emergency SOS Broadcast
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="hover:text-white transition-colors flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]"></span>
                                    Halal Skill Barter Ledger
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="hover:text-white transition-colors flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                    Live Nisab Zakat Calculator
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="hover:text-white transition-colors flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                                    Masjid Notice Board & Salah
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="hover:text-white transition-colors flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                                    Rizq Sharing & Food Pantry
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="hover:text-white transition-colors flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                                    Verified Mosque Ride Pooling
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Governance, Trust & Protocols */}
                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Shield className="w-4 h-4 text-[#14B8A6]" /> Security & Protocols
                        </h4>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link href="/protocols" className="hover:text-white transition-colors">
                                    Identity Verification Protocol
                                </Link>
                            </li>
                            <li>
                                <Link href="/protocols" className="hover:text-white transition-colors">
                                    Purdah & Privacy Shield Mode
                                </Link>
                            </li>
                            <li>
                                <Link href="/protocols" className="hover:text-white transition-colors">
                                    Community Shura Ethics & Conduct
                                </Link>
                            </li>
                            <li>
                                <Link href="/login" className="hover:text-white transition-colors">
                                    Resident Authentication Gateway
                                </Link>
                            </li>
                            <li>
                                <Link href="/sitemap" className="hover:text-white transition-colors">
                                    Top 500 Frequent Keywords Directory
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* SEO & Discoverability (Sitemaps) */}
                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                            <FileCode className="w-4 h-4 text-[#14B8A6]" /> Sitemaps & Search
                        </h4>
                        <p className="text-xs text-[#94A3B8] mb-3 leading-relaxed">
                            Search engines, answer engines (AEO), and generative AI models (GEO) can index all routes via our sitemaps:
                        </p>
                        <div className="space-y-2">
                            <Link
                                href="/sitemap"
                                className="block p-3 rounded-xl bg-[#1E293B] border border-white/5 hover:border-[#14B8A6]/50 text-white font-medium text-xs transition-all hover:bg-[#1E293B]/80"
                            >
                                <span className="text-[#14B8A6] font-bold block mb-0.5">HTML Sitemap Page</span>
                                Browse all pages, architecture, and 500 keyword clusters
                            </Link>
                            <a
                                href="/sitemap.xml"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block p-3 rounded-xl bg-[#1E293B] border border-white/5 hover:border-[#14B8A6]/50 text-white font-medium text-xs transition-all hover:bg-[#1E293B]/80"
                            >
                                <span className="text-[#14B8A6] font-bold flex items-center gap-1 mb-0.5">
                                    XML Sitemap <ExternalLink className="w-3 h-3" />
                                </span>
                                Raw XML index for Googlebot, Bingbot, and AI crawlers
                            </a>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar with Copyright, SBF Consultancy link, and Sitemap Quick Links */}
                <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
                    <div>
                        <p>
                            © 2026 <strong className="text-[#94A3B8]">MahallaHub</strong>. This is a project of{' '}
                            <a
                                href="https://sbf-consultancy.net"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#14B8A6] hover:underline font-semibold"
                            >
                                SBF Consultancy
                            </a>
                            {' '}(<a href="https://sbf-consultancy.net" target="_blank" rel="noopener noreferrer" className="hover:text-white">sbf-consultancy.net</a>). All rights reserved.
                        </p>
                    </div>

                    <div className="flex items-center gap-6">
                        <Link href="/sitemap" className="hover:text-white transition-colors">
                            HTML Sitemap
                        </Link>
                        <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                            XML Sitemap
                        </a>
                        <Link href="/protocols" className="hover:text-white transition-colors">
                            Privacy Protocols
                        </Link>
                        <a
                            href="https://sbf-consultancy.net"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#14B8A6] hover:text-[#10B981] font-semibold flex items-center gap-1"
                        >
                            SBF Consultancy
                            <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
}
