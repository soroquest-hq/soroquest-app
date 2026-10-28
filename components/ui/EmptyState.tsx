import React from 'react';
import Link from 'next/link';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
}

export default function EmptyState({
  title = 'No bounties found',
  description = 'There are currently no bounties matching your search or filter criteria.',
  actionText = 'Post a Bounty',
  actionHref = '/post',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-gray-200 rounded-xl my-6">
      <div className="text-4xl mb-3">🔍</div>
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm mb-6">{description}</p>
      {actionHref && (
        <Link
          href={actionHref}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
}
