'use client';
import React, { useState } from 'react';
import { copyToClipboard } from '@/lib/clipboard';

interface CopyButtonProps {
  text: string;
  label?: string;
}

export default function CopyButton({ text, label }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800 transition-colors"
      title="Copy to clipboard"
    >
      {copied ? (
        <span className="text-green-600 font-medium">Copied!</span>
      ) : (
        <span>{label || 'Copy'}</span>
      )}
    </button>
  );
}

