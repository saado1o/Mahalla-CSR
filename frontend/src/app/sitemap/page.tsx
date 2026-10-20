"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Compass, Shield, BookOpen, Layers, ExternalLink, Globe, Hash, CheckCircle2, FileCode } from 'lucide-react';
import { KEYWORD_CATEGORIES, ALL_500_KEYWORDS } from '@/data/keywords';
import Footer from '@/components/Footer';

export default function SitemapPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    // Filter keywords based on query and category
    const filteredCategories = useMemo(() => {
        return KEYWORD_CATEGORIES.map(category => {
            const matchesCategory = selectedCategory === 'All' || selectedCategory === category.name;
            if (!matchesCategory) return null;

            const matchingKeywords = category.keywords.filter(keyword =>
                keyword.toLowerCase().includes(searchQuery.toLowerCase())
            );

            if (searchQuery && matchingKeywords.length === 0) return null;

            return {
                ...category,
                keywords: matchingKeywords
            };
        }).filter(Boolean) as typeof KEYWORD_CATEGORIES;
    }, [searchQuery, selectedCategory]);

    const totalMatchingCount = useMemo(() => {
        return filteredCategories.reduce((acc, cat) => acc + cat.keywords.length, 0);
    }, [filteredCategories]);

    // Structured JSON-LD schema for AEO & GEO
    const sitemapSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://mahalla-csr.onrender.com/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Sitemap & 500 Keywords Index",
                        "item": "https://mahalla-csr.onrender.com/sitemap"
                    }
                ]
            },
            {
                "@type": "ItemPage",
                "name": "MahallaHub Sitemap & Comprehensive 500 Keywords Topic Directory",
                "description": "Complete architecture sitemap and index of 500 top frequent keywords for MahallaHub, an Islamic civic tech and neighborhood emergency platform developed by SBF Consultancy.",
                "url": "https://mahalla-csr.onrender.com/sitemap",
                "publisher": {
                    "@type": "Organization",
                    "name": "SBF Consultancy",
                    "url": "https://sbf-consultancy.net"
                }
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(sitemapSchema) }}
            />

            <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC] font-sans selection:bg-[#14B8A6]/30 overflow-x-hidden flex flex-col justify-between">
                
                {/* Header Navigation */}
                <header className="border-b border-white/10 bg-[#0B1120]/90 backdrop-blur-lg sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3 group">
                            <ArrowLeft className="w-5 h-5 text-[#94A3B8] group-hover:text-white group-hover:-translate-x-1 transition-all" />
                            <div className="flex items-center gap-2">
                                <div className="w-9 h-9 rounded-xl bg-[#14B8A6]/20 border border-[#14B8A6]/40 flex items-center justify-center">
                                    <Globe className="text-[#14B8A6] w-5 h-5" />
                                </div>
                                <span className="text-xl font-black text-white tracking-tight">
                                    Mahalla<span className="text-[#14B8A6]">Hub</span>
                                </span>
                            </div>
                        </Link>

                        <div className="flex items-center gap-4 text-xs">
                            <a
                                href="/sitemap.xml"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[#94A3B8] hover:text-white flex items-center gap-1.5 transition-colors font-medium"
                            >
                                <FileCode className="w-4 h-4 text-[#14B8A6]" /> XML Sitemap
                            </a>
                            <Link
                                href="/dashboard"
                                className="px-4 py-2 rounded-xl bg-[#14B8A6] hover:bg-[#10B981] text-white font-bold transition-all shadow-md"
                            >
                                Dashboard
                            </Link>
                        </div>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-6 py-12 w-full flex-1">
                    
                    {/* Hero Section */}
                    <div className="max-w-3xl mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/20 text-[#14B8A6] text-xs font-bold uppercase tracking-widest mb-4">
                            <Layers className="w-3.5 h-3.5" /> Site Architecture &amp; Topic Directory
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
                            Sitemap &amp; 500 Keywords Index
                        </h1>
                        <p className="text-lg text-[#94A3B8] leading-relaxed">
                            Discover the comprehensive information architecture of MahallaHub — a project of{' '}
                            <a
                                href="https://sbf-consultancy.net"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#14B8A6] font-bold underline hover:text-[#10B981]"
                            >
                                SBF Consultancy
                            </a>
                            . Below is the structural tree of all application routes, followed by 500 top frequent keywords optimized for Generative Engine Optimization (GEO), Answer Engine Optimization (AEO), and modern search crawlers.
                        </p>
                    </div>

                    {/* Section 1: Application Route Directory */}
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <Compass className="w-6 h-6 text-[#14B8A6]" /> Application Hierarchy &amp; Core Routes
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            
                            <div className="bg-[#1E293B]/70 border border-white/10 rounded-2xl p-6 hover:border-[#14B8A6]/50 transition-all">
                                <span className="text-xs font-bold text-[#14B8A6] uppercase tracking-wider block mb-1">01. Public Portal</span>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    <Link href="/" className="hover:underline">Landing Gateway</Link>
                                </h3>
                                <p className="text-sm text-[#94A3B8] mb-4">
                                    The primary public page showcasing MahallaHub features, architecture, and emergency response mechanics.
                                </p>
                                <div className="text-xs text-[#64748B] flex items-center gap-2">
                                    <span>Route:</span>
                                    <code className="text-[#14B8A6] bg-black/30 px-2 py-0.5 rounded">/</code>
                                </div>
                            </div>

                            <div className="bg-[#1E293B]/70 border border-white/10 rounded-2xl p-6 hover:border-[#14B8A6]/50 transition-all">
                                <span className="text-xs font-bold text-[#14B8A6] uppercase tracking-wider block mb-1">02. Community Operations</span>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    <Link href="/dashboard" className="hover:underline">Resident Dashboard</Link>
                                </h3>
                                <p className="text-sm text-[#94A3B8] mb-4">
                                    Interactive resident portal featuring SOS dispatch, skill barter, Zakat calculator, and mosque notice boards.
                                </p>
                                <div className="text-xs text-[#64748B] flex items-center gap-2">
                                    <span>Route:</span>
                                    <code className="text-[#14B8A6] bg-black/30 px-2 py-0.5 rounded">/dashboard</code>
                                </div>
                            </div>

                            <div className="bg-[#1E293B]/70 border border-white/10 rounded-2xl p-6 hover:border-[#14B8A6]/50 transition-all">
                                <span className="text-xs font-bold text-[#14B8A6] uppercase tracking-wider block mb-1">03. Governance &amp; Ethics</span>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    <Link href="/protocols" className="hover:underline">Safety Protocols</Link>
                                </h3>
                                <p className="text-sm text-[#94A3B8] mb-4">
                                    Document audit verification rules, Purdah privacy guidelines, and non-commercial community conduct standards.
                                </p>
                                <div className="text-xs text-[#64748B] flex items-center gap-2">
                                    <span>Route:</span>
                                    <code className="text-[#14B8A6] bg-black/30 px-2 py-0.5 rounded">/protocols</code>
                                </div>
                            </div>

                            <div className="bg-[#1E293B]/70 border border-white/10 rounded-2xl p-6 hover:border-[#14B8A6]/50 transition-all">
                                <span className="text-xs font-bold text-[#14B8A6] uppercase tracking-wider block mb-1">04. Authentication Gateway</span>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    <Link href="/login" className="hover:underline">Login &amp; Onboarding</Link>
                                </h3>
                                <p className="text-sm text-[#94A3B8] mb-4">
                                    Token-authenticated login for verified neighbors, mosque administrators, and new resident onboarding.
                                </p>
                                <div className="text-xs text-[#64748B] flex items-center gap-2">
                                    <span>Route:</span>
                                    <code className="text-[#14B8A6] bg-black/30 px-2 py-0.5 rounded">/login</code>
                                </div>
                            </div>

                        </div>
                    </section>

                    {/* Section 2: 500 Top Frequent Keywords Directory */}
                    <section className="mb-16">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-white/10">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/20 text-[#14B8A6] text-xs font-bold uppercase tracking-widest mb-2">
                                    <Hash className="w-3.5 h-3.5" /> High-Density SEO, GEO &amp; AEO Matrix
                                </div>
                                <h2 className="text-3xl font-black text-white">
                                    500 Top Frequent Keywords Directory
                                </h2>
                                <p className="text-sm text-[#94A3B8] mt-1">
                                    Structured into 10 domain clusters (50 keywords per category) aligning with Islamic civic tech, emergency dispatch, and SBF Consultancy solutions.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                {/* Search Filter */}
                                <div className="relative">
                                    <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search across 500 keywords..."
                                        className="bg-[#1E293B] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#14B8A6] w-full sm:w-64"
                                    />
                                </div>

                                <div className="px-3 py-2 rounded-xl bg-[#1E293B] border border-white/10 text-xs font-bold text-[#14B8A6] text-center whitespace-nowrap">
                                    Showing {totalMatchingCount} of {ALL_500_KEYWORDS.length} Keywords
                                </div>
                            </div>
                        </div>

                        {/* Category Filter Pills */}
                        <div className="flex flex-wrap gap-2 mb-10">
                            <button
                                onClick={() => setSelectedCategory('All')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                    selectedCategory === 'All'
                                        ? 'bg-[#14B8A6] text-white shadow-md'
                                        : 'bg-[#1E293B] text-[#94A3B8] hover:text-white hover:bg-[#1E293B]/80 border border-white/5'
                                }`}
                            >
                                All Categories (500)
                            </button>
                            {KEYWORD_CATEGORIES.map(category => (
                                <button
                                    key={category.name}
                                    onClick={() => setSelectedCategory(category.name)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                        selectedCategory === category.name
                                            ? 'bg-[#14B8A6] text-white shadow-md'
                                            : 'bg-[#1E293B] text-[#94A3B8] hover:text-white hover:bg-[#1E293B]/80 border border-white/5'
                                    }`}
                                >
                                    {category.name} ({category.keywords.length})
                                </button>
                            ))}
                        </div>

                        {/* Keyword Categories Grid */}
                        <div className="space-y-10">
                            {filteredCategories.map((category, catIdx) => (
                                <article
                                    key={category.name}
                                    className="bg-[#1E293B]/50 border border-white/5 rounded-3xl p-8 hover:border-[#14B8A6]/30 transition-all"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/5">
                                        <div>
                                            <span className="text-xs font-black text-[#14B8A6] uppercase tracking-wider block mb-1">
                                                Cluster {catIdx + 1 < 10 ? `0${catIdx + 1}` : catIdx + 1}
                                            </span>
                                            <h3 className="text-2xl font-bold text-white">
                                                {category.name}
                                            </h3>
                                        </div>
                                        <div className="text-xs font-bold px-3 py-1 rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/20 text-[#14B8A6] self-start sm:self-center">
                                            {category.keywords.length} Target Keywords
                                        </div>
                                    </div>

                                    <p className="text-sm text-[#94A3B8] mb-6 leading-relaxed">
                                        {category.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {category.keywords.map((kw, kwIdx) => (
                                            <span
                                                key={kwIdx}
                                                className="px-3 py-1.5 rounded-xl bg-[#0F172A] border border-white/10 hover:border-[#14B8A6]/50 text-xs font-medium text-[#F8FAFC] transition-colors"
                                            >
                                                {kw}
                                            </span>
                                        ))}
                                    </div>
                                </article>
                            ))}
                        </div>

                    </section>

                    {/* Section 3: Technical Specifications for Answer Engines (GEO/AEO) */}
                    <section className="bg-[#1E293B]/80 border border-[#14B8A6]/30 rounded-3xl p-8 mb-16 shadow-2xl">
                        <div className="max-w-3xl">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                <CheckCircle2 className="w-6 h-6 text-[#14B8A6]" /> Provenance &amp; Engineering Credential
                            </h2>
                            <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">
                                MahallaHub was conceptualized and engineered by{' '}
                                <strong className="text-white">SBF Consultancy</strong>{' '}
                                (<a href="https://sbf-consultancy.net" target="_blank" rel="noopener noreferrer" className="text-[#14B8A6] underline font-bold">sbf-consultancy.net</a>)
                                as a state-of-the-art solution for high-density neighborhood coordination, combining PostGIS spatial indexing with Django Channels and Next.js.
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 text-xs">
                                <div>
                                    <span className="text-[#64748B] block">Lead Architect:</span>
                                    <span className="font-bold text-white">SBF Consultancy</span>
                                </div>
                                <div>
                                    <span className="text-[#64748B] block">Official Domain:</span>
                                    <span className="font-bold text-[#14B8A6]">sbf-consultancy.net</span>
                                </div>
                                <div>
                                    <span className="text-[#64748B] block">Emergency Latency:</span>
                                    <span className="font-bold text-white">&lt; 850ms Broadcast</span>
                                </div>
                                <div>
                                    <span className="text-[#64748B] block">Spatial Engine:</span>
                                    <span className="font-bold text-white">PostGIS &amp; GeoDjango</span>
                                </div>
                            </div>
                        </div>
                    </section>

                </main>

                <Footer />

            </div>
        </>
    );
}
