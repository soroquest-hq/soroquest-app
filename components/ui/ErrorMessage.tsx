import React from 'react';

export default function ErrorMessage({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded">
      <p className="text-red-700">{message}</p>
    </div>
  );
}
