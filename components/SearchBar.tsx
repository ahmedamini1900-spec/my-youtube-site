'use client';
import { useState } from 'react';

export default function SearchBar({ onSearch }: { onSearch: (q: string) => void }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="جستجو در ویدیوها..."
          className="w-full bg-zinc-900 border border-zinc-700 rounded-full py-4 px-6 text-lg focus:outline-none focus:border-purple-500 transition-colors"
        />
        <button
          type="submit"
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-purple-600 hover:bg-purple-700 px-8 py-2.5 rounded-full font-medium transition"
        >
          جستجو
        </button>
      </div>
    </form>
  );
}