"use client";

import React, { useState } from 'react';
import { Calculator, Wallet, Coins, CircleDollarSign, ArrowRight, Building2, Plus, Target } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useNotificationStore } from '@/store/useNotificationStore';

export default function ZakatCalculator() {
    const { user } = useAuthStore();
    const { notify } = useNotificationStore();

    // Zakat Calculation States
    const [assets, setAssets] = useState({
        cash: 0,
        bank: 0,
        gold: 0,
        silver: 0,
        investments: 0
    });

    const [liabilities, setLiabilities] = useState({
        debts: 0,
        expenses: 0
    });

    // Contribution Admin States
    const [contributionHeads, setContributionHeads] = useState([
        { id: 1, name: "General Welfare Fund" },
        { id: 2, name: "Widows & Orphans Support" },
        { id: 3, name: "Mosque Maintenance" },
        { id: 4, name: "Ration Distribution Drive" }
    ]);
    const [newHeadName, setNewHeadName] = useState("");
    const [selectedHead, setSelectedHead] = useState<number>(1);

    const [ledger, setLedger] = useState([
        { id: 1, name: "Ali K.", amount: 5000, headId: 1, date: "12/10/2023" },
        { id: 2, name: "Usman M.", amount: 15000, headId: 2, date: "14/10/2023" },
        { id: 3, name: "Ayesha S.", amount: 2000, headId: 3, date: "15/10/2023" },
        { id: 4, name: "Omar F.", amount: 10000, headId: 1, date: "18/10/2023" },
    ]);

    const handleAssetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAssets({ ...assets, [e.target.name]: parseFloat(e.target.value) || 0 });
    };

    const handleLiabilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLiabilities({ ...liabilities, [e.target.name]: parseFloat(e.target.value) || 0 });
    };

    const handleAddHead = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newHeadName.trim()) {
            notify({ title: "Validation Error", message: "Head name cannot be empty.", type: "error" });
            return;
        }
        if (contributionHeads.some(h => h.name.toLowerCase() === newHeadName.trim().toLowerCase())) {
            notify({ title: "Duplicate Entry", message: "A contribution head with this name already exists.", type: "error" });
            return;
        }
        setContributionHeads([
            ...contributionHeads,
            { id: Date.now(), name: newHeadName }
        ]);
        notify({ title: "Success", message: `New head "${newHeadName}" added successfully.`, type: "success" });
        setNewHeadName("");
    };

    const totalAssets = Object.values(assets).reduce((a, b) => a + b, 0);
    const totalLiabilities = Object.values(liabilities).reduce((a, b) => a + b, 0);
    const netWealth = Math.max(0, totalAssets - totalLiabilities);

    const nisabThreshold = 150000;
    const zakatPayable = netWealth >= nisabThreshold ? netWealth * 0.025 : 0;

    return (
        <div className="space-y-8 animate-in fade-in duration-500 relative">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                    <h2 className="text-3xl font-bold text-white flex items-center justify-center md:justify-start gap-3">
                        <Calculator className="w-8 h-8 text-secondary" />
                        Zakat & Contributions
                    </h2>
                    <p className="text-muted mt-2">Calculate your Zakat and directly support verified Mahalla causes.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Input Section */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="bg-card glassmorphism p-6 rounded-3xl border border-white/5 space-y-6">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <Wallet className="w-5 h-5 text-primary" />
                            Zakatable Assets
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { label: 'Cash in Hand', name: 'cash', icon: Coins },
                                { label: 'Bank Balance', name: 'bank', icon: Wallet },
                                { label: 'Gold Value (PKR)', name: 'gold', icon: CircleDollarSign },
                                { label: 'Silver Value (PKR)', name: 'silver', icon: CircleDollarSign },
                                { label: 'Investments / Shares', name: 'investments', icon: ArrowRight },
                            ].map((item) => (
                                <div key={item.name} className="relative">
                                    <label className="text-sm font-medium text-muted mb-1 block">{item.label}</label>
                                    <div className="relative">
                                        <item.icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                                        <input
                                            type="number"
                                            name={item.name}
                                            onChange={handleAssetChange}
                                            placeholder="0.00"
                                            className="w-full bg-[#1E293B] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:neo-glow transition-all"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-card glassmorphism p-6 rounded-3xl border border-white/5 space-y-6">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <ArrowRight className="w-5 h-5 text-red-400 transform rotate-45" />
                            Deductible Liabilities
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { label: 'Outstanding Debts', name: 'debts' },
                                { label: 'Immediate Expenses', name: 'expenses' },
                            ].map((item) => (
                                <div key={item.name} className="relative">
                                    <label className="text-sm font-medium text-muted mb-1 block">{item.label}</label>
                                    <input
                                        type="number"
                                        name={item.name}
                                        onChange={handleLiabilityChange}
                                        placeholder="0.00"
                                        className="w-full bg-[#1E293B] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-red-400 transition-all"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Official Bank Account Details */}
                    <div className="bg-[#10B981]/10 glassmorphism p-6 rounded-3xl border border-[#10B981]/20 space-y-4">
                        <h3 className="text-xl font-bold text-[#10B981] flex items-center gap-2 mb-2">
                            <Building2 className="w-5 h-5" />
                            Official Mahalla Trust Account
                        </h3>
                        <p className="text-sm text-emerald-100">For direct Bank Transfers or Wire deposits.</p>

                        <div className="bg-[#0F172A] p-4 rounded-2xl border border-white/5 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-muted font-bold uppercase tracking-wider mb-1">Bank Name</p>
                                <p className="text-white font-semibold">Meezan Bank Limited</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted font-bold uppercase tracking-wider mb-1">Account Title</p>
                                <p className="text-white font-semibold">MahallaHub Welfare Trust</p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-xs text-muted font-bold uppercase tracking-wider mb-1">IBAN / Account Number</p>
                                <p className="text-emerald-400 font-mono text-lg tracking-widest bg-emerald-400/10 px-3 py-2 rounded-lg inline-block border border-emerald-400/30">PK34 MEZN 0123 4567 8901</p>
                            </div>
                        </div>
                    </div>

                    {/* Admin Panel for Contribution Heads */}
                    {user?.is_staff && (
                        <div className="bg-primary/10 p-6 rounded-3xl border border-primary/20 space-y-4">
                            <div className="flex items-center justify-between border-b border-primary/20 pb-4">
                                <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                                    <Target className="w-5 h-5" />
                                    Manage Contribution Heads
                                </h3>
                                <span className="text-xs font-bold uppercase tracking-widest px-2 py-1 bg-primary text-white rounded-md">Admin Mode</span>
                            </div>

                            <form onSubmit={handleAddHead} className="flex flex-col md:flex-row gap-3 pt-2">
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g., Block 4 Water Plant"
                                    value={newHeadName}
                                    onChange={(e) => setNewHeadName(e.target.value)}
                                    className="flex-1 bg-[#1E293B] border border-primary/30 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary transition-colors"
                                />
                                <button type="submit" className="py-3 px-6 bg-primary hover:bg-[#14B8A6] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg whitespace-nowrap">
                                    <Plus className="w-5 h-5" /> Add Head
                                </button>
                            </form>
                        </div>
                    )}
                </div>

                {/* Results Section */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] glassmorphism p-6 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl"></div>

                        <h3 className="text-lg font-bold text-white mb-6">Payment Summary</h3>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted">Total Assets:</span>
                                <span className="text-white font-medium">PKR {totalAssets.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted">Total Liabilities:</span>
                                <span className="text-red-400 font-medium">- PKR {totalLiabilities.toLocaleString()}</span>
                            </div>
                            <div className="h-px w-full bg-white/10 my-2"></div>
                            <div className="flex justify-between items-center">
                                <span className="text-white font-semibold">Net Wealth:</span>
                                <span className="text-white font-bold">PKR {netWealth.toLocaleString()}</span>
                            </div>

                            <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-muted flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${netWealth >= nisabThreshold ? 'bg-secondary' : 'bg-red-400'}`}></div>
                                {netWealth >= nisabThreshold ? 'You are eligible to pay Zakat.' : 'Net wealth is below Nisab threshold.'}
                            </div>
                        </div>

                        <div className="text-center p-6 bg-secondary/10 rounded-2xl border border-secondary/20 relative z-10 neo-glow mb-6">
                            <p className="text-sm text-secondary font-bold uppercase tracking-widest mb-2">Zakat Payable</p>
                            <h1 className="text-4xl font-black text-white">PKR {zakatPayable.toLocaleString()}</h1>
                        </div>

                        {/* Cause Selection */}
                        <div className="mb-6 space-y-2">
                            <label className="text-xs font-bold text-muted uppercase tracking-wider block">Select Contribution Head</label>
                            <div className="bg-[#1E293B] border border-white/10 rounded-xl overflow-hidden p-1">
                                {contributionHeads.map(head => (
                                    <div
                                        key={head.id}
                                        onClick={() => setSelectedHead(head.id)}
                                        className={`px-4 py-3 text-sm font-semibold rounded-lg cursor-pointer transition-colors ${selectedHead === head.id ? 'bg-secondary text-white shadow-md' : 'text-muted hover:bg-white/5 hover:text-white'}`}
                                    >
                                        {head.name}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                if (zakatPayable <= 0) {
                                    notify({ title: "Payment Failed", message: "You must have a zakat payable amount to contribute.", type: "error" });
                                    return;
                                }
                                setLedger([
                                    {
                                        id: Date.now(),
                                        name: user?.username || 'Citizen',
                                        amount: zakatPayable,
                                        headId: selectedHead,
                                        date: new Date().toLocaleDateString('en-GB')
                                    },
                                    ...ledger
                                ]);
                                notify({
                                    title: "Contribution Successful",
                                    message: `Successfully processed payment of PKR ${zakatPayable.toLocaleString()} towards: ${contributionHeads.find(h => h.id === selectedHead)?.name}`,
                                    type: "success"
                                });
                            }}
                            disabled={zakatPayable <= 0}
                            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${zakatPayable > 0
                                ? 'bg-secondary hover:bg-[#10B981] text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-[1.02]'
                                : 'bg-white/5 text-muted cursor-not-allowed border border-white/5'
                                }`}
                        >
                            Pay Securely
                        </button>
                    </div>
                </div>

                {/* Open Ledger Section */}
                <div className="xl:col-span-3 space-y-6">
                    <div className="bg-card glassmorphism p-6 md:p-8 rounded-3xl border border-white/5 space-y-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                                <Target className="w-6 h-6 text-[#10B981]" />
                                Transparent Community Ledger
                            </h3>
                            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 bg-[#10B981]/10 text-[#10B981] rounded-full border border-[#10B981]/20">
                                Open Source Finances
                            </span>
                        </div>
                        <p className="text-[#94A3B8]">A public, transparent record of all community contributions mapped to their respective heads. Accountability is our priority.</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 pt-4">
                            {contributionHeads.map(head => {
                                const headContributions = ledger.filter(l => l.headId === head.id);
                                const totalAmount = headContributions.reduce((sum, current) => sum + current.amount, 0);

                                return (
                                    <div key={head.id} className="bg-[#0F172A] p-6 rounded-2xl border border-white/5 h-full flex flex-col transition-all hover:border-white/10">
                                        <div className="flex justify-between items-start mb-4 pb-4 border-b border-white/5">
                                            <h4 className="text-white font-bold text-lg">{head.name}</h4>
                                            <span className="text-xs font-black tracking-wider text-secondary bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20 whitespace-nowrap">
                                                PKR {totalAmount.toLocaleString()}
                                            </span>
                                        </div>

                                        <div className="flex-1">
                                            {headContributions.length > 0 ? (
                                                <div className="space-y-4">
                                                    {headContributions.map(contribution => (
                                                        <div key={contribution.id} className="flex justify-between items-center text-sm">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs text-white font-bold uppercase border border-white/10">
                                                                    {contribution.name.substring(0, 2)}
                                                                </div>
                                                                <span className="text-white font-medium capitalize">{contribution.name}</span>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className="text-emerald-400 font-bold">+ PKR {contribution.amount.toLocaleString()}</div>
                                                                <div className="text-[10px] text-[#94A3B8] font-medium">{contribution.date}</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="h-full flex flex-col items-center justify-center text-center py-6 text-muted italic bg-white/5 rounded-xl border border-dashed border-white/10">
                                                    No contributions mapped to this head yet.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
