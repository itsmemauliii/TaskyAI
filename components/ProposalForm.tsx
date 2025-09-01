
import React from 'react';
import { BillingPreference } from '../types';
import type { ProposalInputs } from '../types';
import { SparklesIcon } from './ui';

interface ProposalFormProps {
  inputs: ProposalInputs;
  setInputs: React.Dispatch<React.SetStateAction<ProposalInputs>>;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

interface FormGroupProps {
    label: string;
    name: keyof ProposalInputs;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    placeholder?: string;
    type?: 'text' | 'textarea' | 'select';
    rows?: number;
    required?: boolean;
    children?: React.ReactNode;
}

const FormGroup: React.FC<FormGroupProps> = ({ label, name, value, onChange, placeholder, type = 'text', rows = 3, required = true, children }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-slate-300 mb-1">{label}</label>
        {type === 'textarea' ? (
            <textarea
                id={name}
                name={name}
                rows={rows}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm p-2 text-white focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
        ) : type === 'select' ? (
             <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm p-2 text-white focus:ring-indigo-500 focus:border-indigo-500 transition"
            >
                {children}
            </select>
        ) : (
            <input
                type="text"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm p-2 text-white focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
        )}
    </div>
);


export const ProposalForm: React.FC<ProposalFormProps> = ({ inputs, setInputs, onSubmit, isLoading }) => {
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setInputs(prev => ({...prev, [name]: value}));
    };
    
    return (
        <form onSubmit={onSubmit} className="space-y-4 p-1">
            <h2 className="text-xl font-semibold text-white mb-4 border-b border-slate-700 pb-2">Proposal Details</h2>
            <FormGroup label="Client Name" name="clientName" value={inputs.clientName} onChange={handleChange} placeholder="e.g., Acme Corporation" />
            <FormGroup label="Industry" name="industry" value={inputs.industry} onChange={handleChange} placeholder="e.g., E-commerce" />
            <FormGroup label="Problem Statement" name="problemStatement" value={inputs.problemStatement} onChange={handleChange} type="textarea" rows={4} placeholder="Describe the client's main challenge." />
            <FormGroup label="Proposed Solution" name="solution" value={inputs.solution} onChange={handleChange} type="textarea" rows={4} placeholder="Outline your proposed solution." />
            <FormGroup label="Scope of Work" name="scope" value={inputs.scope} onChange={handleChange} type="textarea" placeholder="Detail the key activities and work to be done." />
            <FormGroup label="Timeline" name="timeline" value={inputs.timeline} onChange={handleChange} placeholder="e.g., 6 weeks, Q3 2024" />
            <FormGroup label="Budget" name="budget" value={inputs.budget} onChange={handleChange} placeholder="e.g., $15,000 USD" />
            <FormGroup label="Key Risks" name="risks" value={inputs.risks} onChange={handleChange} type="textarea" placeholder="List potential risks and mitigation strategies." />
            <FormGroup label="Deliverables" name="deliverables" value={inputs.deliverables} onChange={handleChange} type="textarea" placeholder="List the final deliverables." />
            <FormGroup label="Billing Preference" name="billingPreference" value={inputs.billingPreference} onChange={handleChange} type="select">
                <option value={BillingPreference.Milestone}>Milestone-based</option>
                <option value={BillingPreference.Monthly}>Monthly</option>
                <option value={BillingPreference.Upfront}>Upfront</option>
            </FormGroup>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-900 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-all duration-200"
            >
                {isLoading ? 'Generating...' : 'Generate Proposal'}
                {!isLoading && <SparklesIcon className="w-5 h-5" />}
            </button>
        </form>
    );
};
