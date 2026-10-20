"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ArrowLeft, CheckCircle2, AlertTriangle, FileText, Scale, Globe } from 'lucide-react';
import Footer from '@/components/Footer';

export default function ProtocolPage() {
    const router = useRouter();

    const sections = [
        {
            title: "Identity Verification Protocol",
            icon: ShieldCheck,
            content: "To maintain the sanctity and safety of the Mahalla, every new resident must undergo a mandatory document audit. This includes submitting a valid government-issued ID (CNIC) or a verified Utility Bill from the current sector. Admin Mosque Shura approval is required before access to neighborhood features is granted."
        },
        {
            title: "Community Ethics & Conduct",
            icon: Scale,
            content: "MahallaHub is built on mutual respect and Islamic neighborly trust. Any form of harassment, unauthorized data sharing (Purdah violation), or misuse of the Emergency SOS feature will result in immediate permanent expulsion from the digital registry."
        },
        {
            title: "Purdah & Privacy Shield Mode",
            icon: FileText,
            content: "Residents have the right to 'Purdah Mode'. When enabled, your exact house location and profile picture are masked from general search results with a 50-meter generalized radius overlay. Only verified community admins and emergency first responders can override these settings during active SOS alerts."
        },
        {
            title: "Resource Sharing & Halal Barter Guidelines",
            icon: CheckCircle2,
            content: "The Skill Barter and Rizq Sharing modules are strictly non-commercial and cashless. No interest, usury, or unauthorized commercial transactions are permitted within these sectors. All trades must be grounded in mutual community support, tool sharing, and voluntary cooperation."
        },
        {
            title: "Misuse & Emergency False Alarm Penalties",
            icon: AlertTriangle,
            content: "Emergency SOS panic alerts trigger rapid sub-second dispatch to 50 nearest neighbors. False alarms breach community trust and safety protocols, resulting in temporary suspension and mandatory review by the Mahalla Audit Committee."
        }
    ];

    return (
        <div className="min-h-screen bg-[#0F172A] selection:bg-[#14B8A6]/30 flex flex-col justify-between">
            <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full flex-1">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-[#94A3B8] hover:text-white transition-colors font-medium group text-sm cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Gateway
                    </button>
                    <div className="flex flex-col items-end">
                        <Link href="/" className="text-2xl font-black text-white uppercase tracking-tighter">
                            Mahalla<span className="text-[#14B8A6]">Hub</span> Protocols
                        </Link>
                        <div className="h-1 w-24 bg-[#14B8A6] rounded-full mt-1"></div>
                        <span className="text-[10px] text-[#94A3B8] tracking-widest uppercase font-semibold mt-1">
                            An SBF Consultancy Project
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 gap-6">
                    {sections.map((section, idx) => (
                        <div
                            key={idx}
                            className="bg-[#1E293B]/60 backdrop-blur-xl p-8 rounded-3xl border border-white/5 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700"
                            style={{ animationDelay: `${idx * 100}ms` }}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-[#14B8A6]/10 text-[#14B8A6] rounded-2xl border border-[#14B8A6]/20">
                                    <section.icon className="w-6 h-6" />
                                </div>
                                <h2 className="text-xl font-bold text-white tracking-tight">{section.title}</h2>
                            </div>
                            <p className="text-[#94A3B8] leading-relaxed">
                                {section.content}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center p-8 bg-[#14B8A6]/5 border border-[#14B8A6]/10 rounded-3xl">
                    <p className="text-sm text-[#94A3B8] max-w-2xl mx-auto leading-loose italic">
                        By entering this digital jurisdiction, you agree to uphold the dignity of the neighborly bond and the collective safety of the Mahalla. Engineered in partnership with{' '}
                        <a href="https://sbf-consultancy.net" target="_blank" rel="noopener noreferrer" className="text-[#14B8A6] font-bold underline">
                            SBF Consultancy
                        </a>
                        .
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    );
}
