"use client";

import Link from 'next/link';
import { 
    ShieldCheck, 
    BellRing, 
    BookOpen, 
    Briefcase, 
    Calculator, 
    ArrowRight, 
    CheckCircle2, 
    Globe, 
    Lock, 
    Users, 
    Compass, 
    ExternalLink, 
    Car, 
    UtensilsCrossed, 
    FileText, 
    Layers, 
    Hash,
    Sparkles
} from 'lucide-react';
import Footer from '@/components/Footer';
import { KEYWORD_CATEGORIES } from '@/data/keywords';

// Advanced Multi-Schema Knowledge Graph for Google, Bing, ChatGPT Search & Perplexity (SEO/GEO/AEO)
const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebSite",
            "@id": "https://mahalla-csr.onrender.com/#website",
            "url": "https://mahalla-csr.onrender.com/",
            "name": "MahallaHub",
            "description": "Verified Islamic Neighborhood Network & Emergency Dispatch Platform by SBF Consultancy",
            "publisher": {
                "@id": "https://sbf-consultancy.net/#organization"
            },
            "inLanguage": "en-US"
        },
        {
            "@type": "Organization",
            "@id": "https://sbf-consultancy.net/#organization",
            "name": "SBF Consultancy",
            "url": "https://sbf-consultancy.net",
            "logo": "https://mahalla-csr.onrender.com/logo.png",
            "description": "SBF Consultancy is an elite digital technology and enterprise advisory consultancy specializing in smart civic tech, high-concurrency systems, and scalable community software.",
            "sameAs": [
                "https://sbf-consultancy.net"
            ]
        },
        {
            "@type": "SoftwareApplication",
            "@id": "https://mahalla-csr.onrender.com/#software",
            "name": "MahallaHub",
            "operatingSystem": "Web, iOS, Android (Progressive Web Application)",
            "applicationCategory": "SocialNetworkingApplication, CivicTechApplication, SafetyApplication",
            "description": "MahallaHub is a privacy-first, verified Islamic neighborhood network engineered by SBF Consultancy. It features verified residents, instant SOS alerts targeting the 50 nearest neighbors within 500m using PostGIS, non-monetary skill bartering, live Nisab Zakat calculator, and digitized mosque administration.",
            "url": "https://mahalla-csr.onrender.com/",
            "author": {
                "@id": "https://sbf-consultancy.net/#organization"
            },
            "offers": {
                "@type": "Offer",
                "price": "0.00",
                "priceCurrency": "USD"
            },
            "featureList": [
                "Sub-second Geospatial SOS Panic Alerting (500m radius)",
                "Document-audited Verified Resident Gatekeeping",
                "Purdah Mode 50m Obfuscated Location Shield",
                "Halal Skill Bartering & Time Banking",
                "Live Nisab Gold & Silver Rate Zakat Calculator",
                "Digital Mosque Notice Board & Salah Updates",
                "Rizq Sharing & Neighborhood Surplus Food Pantry",
                "Verified Mosque & School Ride Pooling"
            ]
        },
        {
            "@type": "FAQPage",
            "@id": "https://mahalla-csr.onrender.com/#faq",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Who developed the MahallaHub project?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "MahallaHub is a civic technology project developed, engineered, and stewarded by SBF Consultancy (https://sbf-consultancy.net). SBF Consultancy architected the platform to solve hyper-local emergency response and community cooperation for modern neighborhoods."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What is MahallaHub?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "MahallaHub is a privacy-centric, verified neighborhood networking platform that connects local residents to facilitate emergency SOS broadcasts, halal skill bartering without money, digitized mosque notice boards, and transparent Zakat contributions."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How does the Emergency SOS Panic Alert work in MahallaHub?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "When a resident triggers an SOS alert, MahallaHub's GeoDjango backend queries the nearest 50 verified neighbors within a 500m radius using PostGIS spatial indexing, instantly notifying them via WebSockets with real-time location telemetry."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What is Purdah Mode and how does it protect resident privacy?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Purdah Mode is an advanced privacy shield that obfuscates a resident's pinpoint coordinates into a generalized 50m radius overlay. This protects the modesty and location privacy of female residents and families while preserving emergency functionality."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How does the Halal Skill Barter and Rizq Sharing system work?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The skill barter and Rizq sharing modules operate strictly on cashless, non-monetary principles. Neighbors trade services such as home maintenance, tutoring, and emergency food packages through a recorded trust ledger, fostering communal self-reliance."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Where can I find the sitemap and comprehensive keywords index for MahallaHub?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "MahallaHub provides both an XML sitemap at /sitemap.xml and a dedicated HTML sitemap page at /sitemap containing an interactive directory of 500 top frequent keywords across Islamic civic tech and community management."
                    }
                }
            ]
        }
    ]
};

export default function LandingPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
            />

            <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC] font-sans selection:bg-[#14B8A6]/30 overflow-x-hidden relative flex flex-col justify-between">

                {/* Abstract Background Elements */}
                <div className="absolute top-0 inset-x-0 h-full overflow-hidden pointer-events-none z-0">
                    <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[#14B8A6]/10 blur-[150px]"></div>
                    <div className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] rounded-full bg-[#10B981]/5 blur-[150px]"></div>
                </div>

                {/* Navigation Header */}
                <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0F172A]/85 backdrop-blur-lg">
                    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                        
                        <div className="flex items-center gap-4">
                            <Link href="/" className="flex items-center gap-3 group">
                                <div className="w-12 h-12 rounded-2xl neo-glow overflow-hidden border-2 border-[#14B8A6]/60 shadow-xl shrink-0 bg-[#0F172A] flex items-center justify-center p-1">
                                    <img src="/logo.png" alt="MahallaHub Logo - SBF Consultancy" className="w-full h-full object-contain" />
                                </div>
                                <div>
                                    <span className="text-xl font-black text-white tracking-tight block">
                                        Mahalla<span className="text-[#14B8A6]">Hub</span>
                                    </span>
                                    <span className="text-[10px] text-[#94A3B8] tracking-widest uppercase block -mt-1 font-semibold">
                                        by SBF Consultancy
                                    </span>
                                </div>
                            </Link>
                        </div>

                        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#94A3B8]" aria-label="Main Navigation">
                            <Link href="#features" className="hover:text-white transition-colors">Architecture</Link>
                            <Link href="#security" className="hover:text-white transition-colors">Privacy &amp; Security</Link>
                            <Link href="/protocols" className="hover:text-white transition-colors">Protocols</Link>
                            <Link href="/sitemap" className="hover:text-[#14B8A6] transition-colors flex items-center gap-1">
                                <Hash className="w-3.5 h-3.5" /> 500 Keywords
                            </Link>
                            <Link href="#faq" className="hover:text-white transition-colors">FAQ</Link>
                        </nav>

                        <div className="flex items-center gap-3">
                            <Link
                                href="/login"
                                className="px-4 py-2 text-sm font-semibold text-[#94A3B8] hover:text-white transition-colors"
                            >
                                Resident Login
                            </Link>
                            <Link
                                href="/dashboard"
                                className="px-5 py-2.5 bg-[#14B8A6] hover:bg-[#10B981] text-white text-sm font-bold rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(20,184,166,0.4)]"
                            >
                                Enter Dashboard
                            </Link>
                        </div>
                    </div>
                </header>

                <main className="relative z-10 pt-32 pb-16 flex-1">

                    {/* Hero Section (GEO & AEO Optimized) */}
                    <section className="max-w-7xl mx-auto px-6 py-16 text-center lg:text-left flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2 space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/20 text-[#14B8A6] text-xs font-bold uppercase tracking-widest">
                                <Globe className="w-4 h-4" /> An SBF Consultancy Initiative · <a href="https://sbf-consultancy.net" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#10B981]">sbf-consultancy.net</a>
                            </div>

                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-tight text-white tracking-tight">
                                Empowering the <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14B8A6] to-[#10B981]">Modern Ummah.</span>
                            </h1>

                            <p className="text-lg text-[#94A3B8] leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
                                MahallaHub establishes verified, privacy-hardened neighborhood networks engineered for real-time crisis response, halal skill bartering, live Nisab Zakat management, and mosque governance.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-2">
                                <Link
                                    href="/dashboard"
                                    className="w-full sm:w-auto px-8 py-4 bg-[#14B8A6] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#0d9488] transition-all neo-glow shadow-lg"
                                >
                                    Experience the Live App <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link
                                    href="/sitemap"
                                    className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-[#1E293B] hover:border-[#94A3B8] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all"
                                >
                                    <Hash className="w-4 h-4 text-[#14B8A6]" /> 500 Keywords &amp; Sitemap
                                </Link>
                            </div>

                            {/* Trust Metrics (GEO Information Density) */}
                            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5 text-left">
                                <div>
                                    <div className="text-2xl font-black text-white">&lt;850ms</div>
                                    <div className="text-xs text-[#94A3B8]">SOS Broadcast Latency</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-black text-[#14B8A6]">500m</div>
                                    <div className="text-xs text-[#94A3B8]">PostGIS Radius Cluster</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-black text-emerald-400">100%</div>
                                    <div className="text-xs text-[#94A3B8]">Verified Resident Audit</div>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Conceptual Dashboard Preview */}
                        <div className="lg:w-1/2 w-full max-w-2xl">
                            <div className="bg-[#1E293B]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl relative">
                                <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                        <span className="text-xs text-[#94A3B8] ml-2 font-mono">mahalla-runtime.sbf-consultancy.net</span>
                                    </div>
                                    <span className="px-2.5 py-0.5 rounded-full bg-[#14B8A6]/20 text-[#14B8A6] text-xs font-bold">
                                        Verified Active
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="h-32 rounded-2xl bg-gradient-to-br from-red-500/20 to-transparent border border-red-500/30 flex flex-col items-center justify-center p-4 text-center">
                                        <BellRing className="w-8 h-8 text-red-500 mb-2 animate-bounce" />
                                        <span className="text-sm font-bold text-red-100">SOS Distress Signal</span>
                                        <span className="text-[10px] text-red-300">50 Nearest Nodes Alerted</span>
                                    </div>
                                    <div className="h-32 rounded-2xl bg-[#0F172A] border border-white/5 flex flex-col items-center justify-center p-4 text-center">
                                        <Briefcase className="w-8 h-8 text-[#8b5cf6] mb-2" />
                                        <span className="text-sm font-bold text-white">Halal Skill Barter</span>
                                        <span className="text-[10px] text-[#94A3B8]">Cashless Mutual Aid</span>
                                    </div>
                                    <div className="col-span-2 h-24 rounded-2xl bg-[#0F172A] border border-white/5 flex items-center px-6 gap-4">
                                        <BookOpen className="w-8 h-8 text-[#14B8A6] shrink-0" />
                                        <div className="text-left flex-1">
                                            <p className="font-bold text-white text-sm">Masjid Shura Notice Board</p>
                                            <p className="text-xs text-[#94A3B8]">Jummah prayers at 1:30 PM · Ramadan Ration Drive Active</p>
                                        </div>
                                        <span className="text-xs font-bold text-[#14B8A6] bg-[#14B8A6]/10 px-3 py-1 rounded-full">
                                            Live
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Deep Dive into Core Modules (Architecture & AEO) */}
                    <section id="features" className="py-20 bg-[#1E293B]/30 border-y border-white/5">
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="text-center max-w-3xl mx-auto mb-16">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/20 text-[#14B8A6] text-xs font-bold uppercase tracking-widest mb-3">
                                    <Compass className="w-3.5 h-3.5" /> High-Performance Engineering
                                </div>
                                <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
                                    Engineered for Uncompromising Reliability
                                </h2>
                                <p className="text-base text-[#94A3B8] leading-relaxed">
                                    Developed by <strong className="text-white">SBF Consultancy</strong>, MahallaHub integrates PostGIS geospatial clustering, Redis pub-sub WebSockets, and Django REST framework for ultra-low latency response.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    {
                                        icon: BellRing,
                                        color: "text-red-500",
                                        bg: "bg-red-500/10",
                                        title: "Real-time Geospatial SOS",
                                        desc: "Leverages PostGIS ST_DWithin spatial queries to dispatch emergency distress signals to the 50 closest verified neighbors within 500m in under 850 milliseconds."
                                    },
                                    {
                                        icon: Lock,
                                        color: "text-[#14B8A6]",
                                        bg: "bg-[#14B8A6]/10",
                                        title: "Cryptographic Identity Audit",
                                        desc: "Strict resident verification requiring utility and government credential review by Mosque Committees, ensuring absolute zero troll infiltration."
                                    },
                                    {
                                        icon: Users,
                                        color: "text-[#8b5cf6]",
                                        bg: "bg-[#8b5cf6]/10",
                                        title: "Cashless Halal Barter Ledger",
                                        desc: "A non-monetary resource and skill exchange network where neighbors trade carpentry, tutoring, medical advice, and tools with cryptographic trust."
                                    },
                                    {
                                        icon: Calculator,
                                        color: "text-emerald-400",
                                        bg: "bg-emerald-400/10",
                                        title: "Live Nisab Zakat Calculator",
                                        desc: "Real-time calculation checking liquidity against live gold and silver benchmarks, directly routing contributions to verified local beneficiaries."
                                    },
                                    {
                                        icon: UtensilsCrossed,
                                        color: "text-blue-400",
                                        bg: "bg-blue-400/10",
                                        title: "Rizq Food Redistribution",
                                        desc: "Eliminates neighborhood food waste by matching surplus family or catering meals with community members and families in need."
                                    },
                                    {
                                        icon: Car,
                                        color: "text-cyan-400",
                                        bg: "bg-cyan-400/10",
                                        title: "Verified Mosque Ride Pooling",
                                        desc: "Connects neighbors attending Fajr, Jummah, and Taraweeh prayers to minimize vehicle emissions and assist senior citizens with safe transit."
                                    }
                                ].map((feature, i) => (
                                    <article key={i} className="bg-[#0F172A] p-8 rounded-3xl border border-white/5 hover:border-[#14B8A6]/50 transition-all group">
                                        <div className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                            <feature.icon className={`w-7 h-7 ${feature.color}`} />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                        <p className="text-sm text-[#94A3B8] leading-relaxed">
                                            {feature.desc}
                                        </p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Dedicated GEO & AEO 500 Keywords Hub Showcase */}
                    <section id="keywords-showcase" className="py-20 border-b border-white/5">
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                                <div className="max-w-3xl">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/20 text-[#14B8A6] text-xs font-bold uppercase tracking-widest mb-3">
                                        <Sparkles className="w-3.5 h-3.5" /> High-Traffic Semantic Directory
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
                                        500 Top Frequent Keywords Directory
                                    </h2>
                                    <p className="text-base text-[#94A3B8] leading-relaxed">
                                        In compliance with tech giants&apos; latest SEO, Generative Engine Optimization (GEO), and Answer Engine Optimization (AEO) protocols, MahallaHub indexes 500 top-frequency topics across 10 specialized civic tech domains.
                                    </p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <Link
                                        href="/sitemap"
                                        className="px-6 py-3.5 bg-[#14B8A6] hover:bg-[#10B981] text-white font-bold rounded-xl transition-all flex items-center gap-2 shadow-lg"
                                    >
                                        Browse Full 500 Keywords <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>

                            {/* 10 Topic Cluster Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                                {KEYWORD_CATEGORIES.map((cat, idx) => (
                                    <Link
                                        key={idx}
                                        href="/sitemap"
                                        className="bg-[#1E293B]/60 hover:bg-[#1E293B] border border-white/5 hover:border-[#14B8A6]/40 p-5 rounded-2xl transition-all block group"
                                    >
                                        <span className="text-[10px] font-bold text-[#14B8A6] uppercase tracking-wider block mb-1">
                                            Category 0{idx + 1}
                                        </span>
                                        <h4 className="text-sm font-bold text-white group-hover:text-[#14B8A6] transition-colors mb-2">
                                            {cat.name}
                                        </h4>
                                        <p className="text-xs text-[#94A3B8] line-clamp-2 mb-3">
                                            {cat.description}
                                        </p>
                                        <div className="text-[11px] font-semibold text-[#14B8A6] flex items-center gap-1">
                                            50 Keywords <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Privacy & Security Section */}
                    <section id="security" className="py-20 bg-[#1E293B]/20">
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-[#14B8A6]/20 border border-[#14B8A6]/40 flex items-center justify-center">
                                        <ShieldCheck className="w-6 h-6 text-[#14B8A6]" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">Purdah &amp; Privacy Shield Mode</h3>
                                        <p className="text-xs text-[#94A3B8]">Engineered according to SBF Consultancy privacy-first standards</p>
                                    </div>
                                </div>

                                <p className="text-base text-[#94A3B8] leading-relaxed mb-6">
                                    Preserving the sanctity and modesty of Muslim households is paramount. When Purdah Mode is toggled, precise physical coordinates are mathematically blurred into a 50-meter generalized radius for non-emergency viewers. Full location telemetry is only unmasked during active, verified emergency SOS dispatches.
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
                                    <div className="flex items-start gap-2.5">
                                        <CheckCircle2 className="w-5 h-5 text-[#14B8A6] shrink-0 mt-0.5" />
                                        <span className="text-xs text-white font-medium">Zero commercial tracker integration</span>
                                    </div>
                                    <div className="flex items-start gap-2.5">
                                        <CheckCircle2 className="w-5 h-5 text-[#14B8A6] shrink-0 mt-0.5" />
                                        <span className="text-xs text-white font-medium">End-to-end tokenized sessions</span>
                                    </div>
                                    <div className="flex items-start gap-2.5">
                                        <CheckCircle2 className="w-5 h-5 text-[#14B8A6] shrink-0 mt-0.5" />
                                        <span className="text-xs text-white font-medium">Encrypted resident data storage</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Answer Engine Optimization FAQ Section */}
                    <section id="faq" className="py-20">
                        <div className="max-w-4xl mx-auto px-6">
                            <div className="text-center mb-14">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/20 text-[#14B8A6] text-xs font-bold uppercase tracking-widest mb-3">
                                    <FileText className="w-3.5 h-3.5" /> Direct Answer Knowledge Base
                                </div>
                                <h2 className="text-3xl md:text-5xl font-black text-white">
                                    Frequently Asked Questions (FAQ)
                                </h2>
                                <p className="text-sm text-[#94A3B8] mt-2">
                                    Concise, authoritative answers formatted for voice search, featured snippets, and AI answer engines.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {[
                                    {
                                        q: "Who developed and maintains the MahallaHub project?",
                                        a: "MahallaHub is designed, architected, and maintained by SBF Consultancy (https://sbf-consultancy.net). SBF Consultancy leads software engineering, security audits, and cloud infrastructure for the platform."
                                    },
                                    {
                                        q: "What defines verification on the MahallaHub application?",
                                        a: "Verification is a rigorous gatekeeping process requiring new users to furnish official government ID or utility documents proving local residence. Admin Mosque Committees review these to issue a 'Verified Neighbor' cryptography-backed token."
                                    },
                                    {
                                        q: "How does the 'Purdah Mode' privacy shield operate?",
                                        a: "Security and modesty are paramount. 'Purdah Mode' obscures precise tracking by broadcasting a generalized 50m radius overlay rather than an exact pinpoint coordinate to non-emergency observers, ensuring female residents maintain absolute geospatial privacy."
                                    },
                                    {
                                        q: "Are the financial calculations on Zakat compliant?",
                                        a: "Yes. The embedded Zakat Calculator continuously checks net liquidity against live, dynamically updated Nisab thresholds (Gold/Silver equivalents). Payments are securely routed precisely to verified Mosque Welfare accounts via integrated API endpoints."
                                    },
                                    {
                                        q: "How does the real-time emergency SOS broadcast function?",
                                        a: "Upon pressing the distress trigger, a GeoDjango spatial query queries the 50 closest geographically verified resident nodes within a 500m radius using PostGIS. Alert packets are dispatched through Redis WebSockets in sub-second intervals."
                                    },
                                    {
                                        q: "Where can I view the sitemap and 500 keywords directory?",
                                        a: "You can view the full machine-readable XML sitemap at /sitemap.xml and the interactive, searchable HTML sitemap and topic directory containing all 500 top frequent keywords at /sitemap."
                                    }
                                ].map((faq, idx) => (
                                    <details key={idx} className="group bg-[#1E293B] rounded-2xl border border-white/5 p-6 open:bg-[#0F172A] transition-all">
                                        <summary className="flex items-center justify-between cursor-pointer font-bold text-base md:text-lg text-white list-none">
                                            {faq.q}
                                            <span className="transition-transform group-open:rotate-45 block w-6 h-6 text-[#14B8A6] shrink-0 text-xl font-light">+</span>
                                        </summary>
                                        <p className="mt-4 text-[#94A3B8] leading-relaxed text-sm">
                                            {faq.a}
                                        </p>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </section>

                </main>

                {/* Shared Footer with Mandatory SBF Consultancy Link and Sitemaps */}
                <Footer />

            </div>
        </>
    );
}
