import React, { useState, useEffect, useCallback } from 'react';
import { ClipboardIcon, CheckIcon } from './ui';

interface ProposalDisplayProps {
  proposalText: string;
}

const formatProposalTextToHTML = (text: string): string => {
  let html = text;
  // Escape HTML to prevent XSS from unexpected output
  html = html.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Basic Markdown-like conversions
  html = html.replace(/^\s*# (.*$)/gim, '<h1 class="text-2xl font-bold text-white mb-4 mt-6">$1</h1>');
  html = html.replace(/^\s*## (.*$)/gim, '<h2 class="text-xl font-semibold text-slate-100 mb-3 mt-5 border-b border-slate-700 pb-2">$1</h2>');
  html = html.replace(/^\s*### (.*$)/gim, '<h3 class="text-lg font-semibold text-slate-200 mb-2 mt-4">$1</h3>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Handle lists (simple conversion)
  html = html.replace(/^\s*[\-\*] (.*$)/gim, '<li class="ml-4 list-disc">$1</li>');
  html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
  html = html.replace(/<\/ul>\s*<ul>/g, ''); // Fix multiple ul tags

  // Replace newlines with <br> for spacing
  html = html.replace(/\n/g, '<br />');

  return html;
};


// FIX: Corrected component definition to properly receive props.
// The original syntax `=> {` was incorrect and has been changed to `= ({ proposalText }) => {`
// to destructure `proposalText` from the component's props.
export const ProposalDisplay: React.FC<ProposalDisplayProps> = ({ proposalText }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(proposalText).then(() => {
        setIsCopied(true);
    });
  }, [proposalText]);
  
  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  if (!proposalText) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 p-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4"><path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1V14H6c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2h-1.5V3.6c0-.4-.2-.8-.5-1.1-.3-.3-.7-.5-1.1-.5z"/><path d="M12 12h.01"/><path d="M16 12h.01"/><path d="M8 12h.01"/><path d="M12 16h.01"/><path d="M16 16h.01"/><path d="M8 16h.01"/></svg>
            <h3 className="text-lg font-semibold text-slate-400">Your generated proposal will appear here.</h3>
            <p className="text-sm">Fill out the form on the left and click "Generate Proposal" to get started.</p>
        </div>
    );
  }
  
  const formattedHtml = formatProposalTextToHTML(proposalText);
  
  return (
    <div className="relative h-full">
      <div className="absolute top-4 right-4 z-10">
        <button 
          onClick={handleCopy}
          className="bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold py-2 px-3 rounded-md flex items-center gap-2 transition-colors duration-200"
        >
          {isCopied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <ClipboardIcon className="w-5 h-5" />}
          {isCopied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div 
        className="prose prose-invert prose-p:text-slate-300 prose-li:text-slate-300 text-slate-300 leading-relaxed p-6"
        dangerouslySetInnerHTML={{ __html: formattedHtml }}
      />
    </div>
  );
};
