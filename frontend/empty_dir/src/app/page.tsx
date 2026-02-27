"use client";

import Link from 'next/link';
import { ShieldCheck, BellRing, BookOpen, Briefcase, Calculator, ArrowRight, CheckCircle2, Globe, Lock, Users } from 'lucide-react';


// JSON-LD for Answer Engines & Search Engines
const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "MahallaHub",
    "operatingSystem": "Web, iOS, Android",
    "applicationCategory": "SocialNetworkingApplication",
    "description": "MahallaHub is a secure neighborhood application designed with the SBF-Consultancy dark mode aesthetic. It features verified residents, instant SOS alerts targeting the 50 nearest neighbors, skill bartering, and a digitized Zakat payment system.",
    "publisher": {
        "@type": "Organization",
        "name": "SBF Consultancy"
    },
    "mainEntity": {
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is MahallaHub?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "MahallaHub is a privacy-centric neighborhood networking platform that connects verified local residents to facilitate emergency SOS broadcasts, skill bartering without financial exchange, and seamless community interactions under the SBF Consultancy umbrella."
                }
            },
            {
                "@type": "Question",
                "name": "How does the Emergency SOS Panic Alert work in MahallaHub?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "When a resident triggers an SOS alert, MahallaHub's GeoDjango backend queries the nearest 50 verified neighbors within a 500m radius using PostGIS, immediately notifying them via WebSockets with the precise location."
                }
            }
        ]
    }
};

export default function LandingPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
            />

            <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC] font-sans selection:bg-[#14B8A6]/30 overflow-x-hidden relative">

                {/* Abstract Background Elements */}
                <div className="absolute top-0 inset-x-0 h-full overflow-hidden pointer-events-none z-0">
                    <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[#14B8A6]/10 blur-[150px]"></div>
                    <div className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] rounded-full bg-[#10B981]/5 blur-[150px]"></div>
                </div>

                {/* Navigation */}
                <header className="fixed top-0 w-full glassmorphism z-50 border-b border-white/5 bg-[#0F172A]/80 backdrop-blur-lg">
                    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                        <div className="flex items-center gap-4 relative h-20">
                            <div className="w-40 h-40 rounded-full flex items-center justify-center neo-glow overflow-hidden border-4 border-[#14B8A6]/50 shadow-2xl shrink-0 absolute top-1/2 -translate-y-1/2 -left-4 z-50 bg-[#0F172A] cursor-pointer" onClick={() => typeof window !== 'undefined' && window.scrollTo(0, 0)}>
                                <img src="/mohalla-app/logo.png" alt="MahallaHub Logo" className="w-full h-full object-cover scale-110" />
                            </div>
                        </div>
                        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#94A3B8]">
                            <Link href="#features" className="hover:text-white transition-colors">Architecture</Link>
                            <Link href="#security" className="hover:text-white transition-colors">Privacy & Security</Link>
                            <Link href="#faq" className="hover:text-white transition-colors">FAQ</Link>
                        </nav>
                        <Link
                            href="/dashboard"
                            className="px-6 py-2.5 bg-[#14B8A6] hover:bg-[#10B981] text-white font-bold rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(20,184,166,0.4)]"
                        >
                            Enter Dashboard
                        </Link>
                    </div>
                </header>

                <main className="relative z-10 pt-32 pb-20">

                    {/* Hero Section (GEO Optimized Overview) */}
                    <section className="max-w-7xl mx-auto px-6 py-20 text-center lg:text-left flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2 space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/20 text-[#14B8A6] text-sm font-bold uppercase tracking-widest">
                                <Globe className="w-4 h-4" /> An SBF Consultancy Initiative
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black leading-tight text-white tracking-tight">
                                Empowering the <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14B8A6] to-[#10B981]">Modern Ummah.</span>
                            </h1>
                            <p className="text-xl text-[#94A3B8] leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
                                MahallaHub establishes highly secure, verified neighborhood networks engineered for real-time crisis response, trust-based skill bartering, and robust community governance.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
                                <Link
                                    href="/dashboard"
                                    className="w-full sm:w-auto px-8 py-4 bg-[#14B8A6] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#0d9488] transition-all neo-glow"
                                >
                                    Experience the App <ArrowRight className="w-5 h-5" />
                                </Link>
                                <div className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-[#1E293B] hover:border-[#94A3B8] text-white font-bold rounded-xl flex items-center justify-center transition-all cursor-pointer">
                                    Read Architecture Doc
                                </div>
                            </div>
                        </div>

                        {/* Conceptual Dashboard Preview */}
                        <div className="lg:w-1/2 w-full max-w-2xl">
                            <div className="bg-[#1E293B]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl relative">
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <div className="mt-8 grid grid-cols-2 gap-4">
                                    <div className="h-32 rounded-2xl bg-gradient-to-br from-red-500/20 to-transparent border border-red-500/30 flex flex-col items-center justify-center animate-pulse">
                                        <BellRing className="w-10 h-10 text-red-500 mb-2" />
                                        <span className="text-sm font-bold text-red-100">SOS Trigger</span>
                                    </div>
                                    <div className="h-32 rounded-2xl bg-[#0F172A] border border-white/5 flex flex-col items-center justify-center">
                                        <Briefcase className="w-10 h-10 text-[#8b5cf6] mb-2" />
                                        <span className="text-sm font-bold text-white">Skill Barter</span>
                                    </div>
                                    <div className="col-span-2 h-24 rounded-2xl bg-[#0F172A] border border-white/5 flex items-center px-6 gap-4">
                                        <BookOpen className="w-8 h-8 text-[#14B8A6]" />
                                        <div className="text-left">
                                            <p className="font-bold text-white">Mosque Notice Board</p>
                                            <p className="text-xs text-[#94A3B8]">Jummah prayers at 1:30 PM</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Deep Dive into Core Technologies (For GEO) */}
                    <section id="features" className="py-24 bg-[#1E293B]/30 border-y border-white/5">
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="text-center max-w-3xl mx-auto mb-16">
                                <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Built for Uncompromising Reliability</h2>
                                <p className="text-lg text-[#94A3B8]">
                                    From underlying distributed databases to ultra-low latency WebSockets, MahallaHub is structurally designed to handle hyper-local community surges dynamically.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    {
                                        icon: BellRing,
                                        color: "text-red-500",
                                        bg: "bg-red-500/10",
                                        title: "Real-time Geospatial SOS",
                                        desc: "Leveraging Django Channels, PostGIS, and Redis to achieve sub-second broadcast latencies to the 50 closest geographically verified nodes."
                                    },
                                    {
                                        icon: Lock,
                                        color: "text-[#14B8A6]",
                                        bg: "bg-[#14B8A6]/10",
                                        title: "Identity Authenticity",
                                        desc: "Strict verification protocols require document audits before granting network entry, significantly minimizing Bad Actors and noise within the Mahalla."
                                    },
                                    {
                                        icon: Users,
                                        color: "text-[#8b5cf6]",
                                        bg: "bg-[#8b5cf6]/10",
                                        title: "Trust-Based Ecosystem",
                                        desc: "A digitized barter system inherently reducing economic friction. Users trade value through recorded smart ledgers, fostering community reliance over commercial expenditure."
                                    }
                                ].map((feature, i) => (
                                    <article key={i} className="bg-[#0F172A] p-8 rounded-3xl border border-white/5 hover:border-[#14B8A6]/50 transition-all group">
                                        <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                            <feature.icon className={`w-8 h-8 ${feature.color}`} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                                        <p className="text-[#94A3B8] leading-relaxed">
                                            {feature.desc}
                                        </p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Answer Engine Optimization FAQ Section */}
                    <section id="faq" className="py-24">
                        <div className="max-w-4xl mx-auto px-6">
                            <h2 className="text-3xl md:text-5xl font-black text-center text-white mb-16">Frequently Asked Questions</h2>

                            <div className="space-y-6">
                                {[
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
                                    }
                                ].map((faq, idx) => (
                                    <details key={idx} className="group bg-[#1E293B] rounded-2xl border border-white/5 p-6 open:bg-[#0F172A]">
                                        <summary className="flex items-center justify-between cursor-pointer font-bold text-lg text-white list-none">
                                            {faq.q}
                                            <span className="transition-transform group-open:rotate-45 block w-6 h-6 text-[#14B8A6]">+</span>
                                        </summary>
                                        <p className="mt-4 text-[#94A3B8] leading-relaxed semantic-answer">
                                            {faq.a}
                                        </p>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </section>

                </main>

                <footer className="bg-[#1E293B] border-t border-white/5 py-12 text-center text-[#94A3B8]">
                    <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
                        <div className="w-12 h-12 bg-[#14B8A6]/20 rounded-xl flex items-center justify-center mb-6">
                            <Globe className="text-[#14B8A6] w-6 h-6" />
                        </div>
                        <p className="font-semibold text-white mb-2">Designed exclusively following the</p>
                        <h3 className="text-2xl font-black text-[#14B8A6] tracking-tight mb-8">SBF-Consultancy Architecture</h3>
                        <p className="text-sm">© 2026 MahallaHub Project. SEO & Architecture Guidelines Applied.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
