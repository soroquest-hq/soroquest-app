import React from 'react';
import type { BountyStatus } from '@/types';

const statusStyles: Record<BountyStatus, string> = {
  open:      'bg-green-100 text-green-800',
  claimed:   'bg-yellow-100 text-yellow-800',
  completed: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-gray-100 text-gray-600',
};

export default function StatusBadge({ status }: { status: BountyStatus }) {
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusStyles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
