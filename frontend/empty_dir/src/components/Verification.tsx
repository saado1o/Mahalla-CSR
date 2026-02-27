"use client";

import React, { useState } from 'react';
import { ShieldCheck, Upload, CheckCircle2, XCircle, AlertCircle, FileText, Briefcase } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useVolunteerStore } from '@/store/useVolunteerStore';
import { useVerificationStore } from '@/store/useVerificationStore';
import { useNotificationStore } from '@/store/useNotificationStore';

export default function Verification() {
    const { user } = useAuthStore();
    const { requests, updateStatus } = useVerificationStore();
    const { notify } = useNotificationStore();
    const { applications: volunteerApplications, updateApplicationStatus } = useVolunteerStore();
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<'pending' | 'verified' | 'rejected'>(user?.is_verified ? 'verified' : 'pending');

    const pendingResidents = requests.filter(r => r.status === 'Pending');

    const handleApprove = (id: string, name: string) => {
        updateStatus(id, 'Approved');
        notify({ title: "Citizen Verified", message: `Account for ${name} has been successfully activated.`, type: "success" });
    };

    const handleReject = (id: string, name: string) => {
        updateStatus(id, 'Rejected');
        notify({ title: "Citizen Rejected", message: `Verification for ${name} was denied.`, type: "error" });
    };

    if (user?.is_staff) {
        return (
            <div className="space-y-6">
                <div className="bg-card glassmorphism p-6 rounded-3xl border border-white/5">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-primary/20 text-primary rounded-xl">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Pending Verifications</h2>
                            <p className="text-sm text-muted">Review neighbor documents to grant Mahalla access.</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {pendingResidents.length === 0 ? (
                            <div className="text-center py-12 border-2 border-dashed border-white/5 rounded-2xl">
                                <p className="text-muted italic">All neighbors are currently verified.</p>
                            </div>
                        ) : (
                            pendingResidents.map(req => (
                                <div key={req.id} className="bg-[#0F172A] p-4 rounded-2xl border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-primary/20">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold border border-primary/20">
                                            {req.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white">{req.name}</h3>
                                            <p className="text-xs text-muted font-medium">{req.email} • {req.date}</p>
                                            <div className="flex items-center gap-1 mt-1 text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-md border border-primary/20">
                                                <FileText className="w-3 h-3" />
                                                {req.docType}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                                        <button
                                            onClick={() => handleReject(req.id, req.name)}
                                            className="flex-1 sm:flex-none px-4 py-2 bg-red-400/10 text-red-400 hover:bg-red-400 hover:text-white font-bold rounded-xl transition-all flex justify-center items-center gap-2 border border-red-400/20"
                                        >
                                            <XCircle className="w-4 h-4" /> Reject
                                        </button>
                                        <button
                                            onClick={() => handleApprove(req.id, req.name)}
                                            className="flex-1 sm:flex-none px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white font-bold rounded-xl transition-all flex justify-center items-center gap-2 border border-primary/20"
                                        >
                                            <CheckCircle2 className="w-4 h-4" /> Approve
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="bg-card glassmorphism p-8 rounded-3xl border border-white/5 w-full">
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                        <Briefcase className="w-6 h-6 text-[#10B981]" />
                        Review Volunteer Applications
                    </h2>
                    <p className="text-[#94A3B8] mb-6">Approve or reject community members applying for volunteer roles at the Central Mosque.</p>

                    {volunteerApplications.length === 0 ? (
                        <p className="text-muted italic">No active volunteer applications at this time.</p>
                    ) : (
                        <div className="space-y-4">
                            {volunteerApplications.map((app) => (
                                <div key={app.id} className="bg-[#0F172A] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center gap-2">
                                            <h4 className="text-lg font-bold text-white capitalize">{app.username}</h4>
                                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${app.status === 'Pending' ? 'bg-secondary/10 text-secondary border-secondary/20' : app.status === 'Approved' ? 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                                                {app.status}
                                            </span>
                                        </div>
                                        <p className="text-sm font-semibold text-[#10B981]">Applied for: {app.role}</p>
                                        <p className="text-sm text-[#94A3B8] italic bg-white/5 p-3 rounded-xl border border-white/5">
                                            &quot;{app.experience}&quot;
                                        </p>
                                    </div>

                                    {app.status === 'Pending' && (
                                        <div className="flex gap-2 w-full md:w-auto mt-4 md:mt-0">
                                            <button
                                                onClick={() => updateApplicationStatus(app.id, 'Approved')}
                                                className="flex-1 md:flex-none px-4 py-2 bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30 hover:bg-[#10B981] hover:text-white font-bold rounded-xl transition-all"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => updateApplicationStatus(app.id, 'Rejected')}
                                                className="flex-1 md:flex-none px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500 hover:text-white font-bold rounded-xl transition-all"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-3xl">
            <div className="bg-card glassmorphism p-6 md:p-8 rounded-3xl border border-white/5">
                <h2 className="text-2xl font-bold text-white mb-2">Identity Verification</h2>
                <p className="text-muted mb-8">To ensure a secure Mahalla, all neighbors must be verified by the admin community board.</p>

                {status === 'verified' && (
                    <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 text-center">
                        <div className="w-16 h-16 bg-primary rounded-full mx-auto flex items-center justify-center neo-glow mb-4">
                            <CheckCircle2 className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">You are Verified!</h3>
                        <p className="text-muted">You have full access to the MahallaHub features.</p>
                    </div>
                )}

                {status === 'pending' && (
                    <div className="space-y-6">
                        <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-200 p-4 rounded-xl flex items-start gap-3 text-sm">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            <p>Your account is currently under limited access. Please upload a utility bill or CNIC to gain full verified status.</p>
                        </div>

                        <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center hover:bg-white/5 transition-colors cursor-pointer group">
                            <div className="w-16 h-16 bg-white/5 rounded-full mx-auto flex items-center justify-center mb-4 group-hover:neo-glow group-hover:bg-primary/20 transition-all">
                                <Upload className="w-8 h-8 text-muted group-hover:text-primary transition-colors" />
                            </div>
                            <p className="text-white font-medium mb-1">Click to upload document</p>
                            <p className="text-sm text-muted">PNG, JPG, or PDF (Max 5MB)</p>
                        </div>

                        <button className="w-full py-4 bg-primary text-white font-bold rounded-xl neo-glow transition-all hover:scale-[1.01]">
                            Submit for Verification
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
