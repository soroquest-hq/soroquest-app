import React from 'react';

export default function BountySkeleton() {
  return (
    <div className="p-4 border rounded animate-pulse space-y-3">
      <div className="flex items-start justify-between">
        <div className="h-5 bg-gray-200 rounded w-2/3"></div>
        <div className="h-5 bg-gray-200 rounded w-16"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      <div className="space-y-1">
        <div className="h-3 bg-gray-100 rounded w-full"></div>
        <div className="h-3 bg-gray-100 rounded w-4/5"></div>
      </div>
    </div>
  );
}
