
import React, { useState, useCallback } from 'react';
import { ProposalForm } from './components/ProposalForm';
import { ProposalDisplay } from './components/ProposalDisplay';
import { LoadingSpinner, BotMessageSquareIcon, CheckIcon } from './components/ui';
import { generateProposal } from './services/geminiService';
import type { ProposalInputs } from './types';
import { BillingPreference } from './types';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/80 backdrop-blur-sm text-white p-4 shadow-md sticky top-0 z-20 border-b border-slate-700">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BotMessageSquareIcon className="w-8 h-8 text-indigo-400" />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">AI Proposal Generator</h1>
        </div>
        <p className="text-sm text-slate-400 hidden sm:block">
          Your AI-powered consulting assistant
        </p>
      </div>
    </header>
  );
};

const PricingSection: React.FC = () => {
  return (
    <div className="mt-16 text-center">
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Flexible Plans for Every Consultant
      </h2>
      <p className="mt-4 text-lg leading-8 text-slate-400">
        Choose the plan that's right for you. No hidden fees.
      </p>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card 1: Solo */}
        <div className="bg-slate-900 rounded-lg p-8 border border-slate-700 shadow-lg flex flex-col">
          <h3 className="text-xl font-semibold text-white">Solo</h3>
          <p className="mt-2 text-4xl font-bold text-white">$19<span className="text-base font-medium text-slate-400">/mo</span></p>
          <p className="mt-4 text-slate-400 h-12">For individual consultants getting started.</p>
          <ul className="mt-8 space-y-4 text-left">
            <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-indigo-400 flex-shrink-0" /> 10 Proposals / month</li>
            <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-indigo-400 flex-shrink-0" /> Standard Templates</li>
            <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-indigo-400 flex-shrink-0" /> Email Support</li>
          </ul>
          <div className="mt-auto pt-8">
            <button className="w-full bg-slate-700 text-white font-bold py-3 px-4 rounded-md hover:bg-slate-600 transition-colors">
              Get Started
            </button>
          </div>
        </div>

        {/* Card 2: Professional (Highlighted) */}
        <div className="bg-slate-900 rounded-lg p-8 border-2 border-indigo-500 shadow-lg flex flex-col relative">
          <div className="absolute top-0 -translate-y-1/2 bg-indigo-500 text-white text-sm font-semibold px-3 py-1 rounded-full">Most Popular</div>
          <h3 className="text-xl font-semibold text-white">Professional</h3>
          <p className="mt-2 text-4xl font-bold text-white">$49<span className="text-base font-medium text-slate-400">/mo</span></p>
          <p className="mt-4 text-slate-400 h-12">For professionals who need more power and customization.</p>
          <ul className="mt-8 space-y-4 text-left">
            <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-indigo-400 flex-shrink-0" /> Unlimited Proposals</li>
            <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-indigo-400 flex-shrink-0" /> Custom Branding</li>
            <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-indigo-400 flex-shrink-0" /> Premium Templates</li>
            <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-indigo-400 flex-shrink-0" /> Priority Support</li>
          </ul>
          <div className="mt-auto pt-8">
            <button className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors">
              Choose Plan
            </button>
          </div>
        </div>

        {/* Card 3: Agency */}
        <div className="bg-slate-900 rounded-lg p-8 border border-slate-700 shadow-lg flex flex-col">
          <h3 className="text-xl font-semibold text-white">Agency</h3>
          <p className="mt-2 text-4xl font-bold text-white">Custom</p>
          <p className="mt-4 text-slate-400 h-12">For teams and agencies with advanced needs.</p>
          <ul className="mt-8 space-y-4 text-left">
            <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-indigo-400 flex-shrink-0" /> Everything in Professional</li>
            <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-indigo-400 flex-shrink-0" /> Team Collaboration</li>
            <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-indigo-400 flex-shrink-0" /> API Access</li>
            <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-indigo-400 flex-shrink-0" /> Dedicated Account Manager</li>
          </ul>
          <div className="mt-auto pt-8">
            <button className="w-full bg-slate-700 text-white font-bold py-3 px-4 rounded-md hover:bg-slate-600 transition-colors">
              Contact for Pricing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export const App: React.FC = () => {
  const [proposalInputs, setProposalInputs] = useState<ProposalInputs>({
    clientName: 'InnovateTech',
    industry: 'Enterprise SaaS',
    problemStatement: 'InnovateTech is struggling with low user engagement and retention for their flagship product. Their current onboarding process is confusing, leading to high drop-off rates within the first 7 days.',
    solution: 'A complete redesign of the user onboarding experience, focusing on a guided, personalized workflow. We will implement interactive tutorials, a progress tracking system, and proactive in-app messaging to guide new users.',
    scope: 'Phase 1: User research and journey mapping. Phase 2: Wireframing and prototyping. Phase 3: UI/UX design and implementation support. Phase 4: A/B testing and analytics integration.',
    timeline: '12 Weeks',
    budget: '$50,000',
    risks: 'Potential for scope creep during the design phase. Mitigation: Establish a clear and mutually agreed-upon scope of work before Phase 2 begins. Weekly check-ins to monitor progress against the plan.',
    deliverables: '1. User research report. 2. High-fidelity interactive prototypes. 3. Complete UI design system and style guide. 4. Final implementation-ready design assets.',
    billingPreference: BillingPreference.Milestone,
  });
  const [generatedProposal, setGeneratedProposal] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateProposal = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setGeneratedProposal('');

    const result = await generateProposal(proposalInputs);
    
    if (result.startsWith('Error:')) {
      setError(result);
    } else {
      setGeneratedProposal(result);
    }

    setIsLoading(false);
  }, [proposalInputs]);

  return (
    <div className="min-h-screen bg-slate-800 text-white">
      <Header />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-900 rounded-lg p-6 border border-slate-700 shadow-lg">
            <ProposalForm
              inputs={proposalInputs}
              setInputs={setProposalInputs}
              onSubmit={handleGenerateProposal}
              isLoading={isLoading}
            />
          </div>
          <div className="bg-slate-900 rounded-lg border border-slate-700 shadow-lg min-h-[600px] lg:h-full overflow-y-auto relative">
            {isLoading && (
              <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm flex flex-col justify-center items-center z-10">
                <LoadingSpinner />
                <p className="mt-4 text-slate-300">Generating proposal...</p>
              </div>
            )}
            {error && <div className="p-6 text-red-400 bg-red-900/20 m-4 rounded-md">{error}</div>}
            {!isLoading && <ProposalDisplay proposalText={generatedProposal} />}
          </div>
        </div>
        <PricingSection />
      </main>
      <footer className="text-center p-4 text-slate-500 text-sm">
        <p>Powered by Google Gemini. Built for modern consultants.</p>
      </footer>
    </div>
  );
};
