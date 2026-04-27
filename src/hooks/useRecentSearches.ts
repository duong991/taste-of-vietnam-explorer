import { useState, useCallback } from 'react';

const STORAGE_KEY = 'recentSearches';
const MAX_ITEMS = 10;

function readStorage(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function useRecentSearches() {
  const [searches, setSearches] = useState<string[]>(readStorage);

  const addSearch = useCallback((query: string) => {
    const q = query.trim();
    if (!q) return;
    setSearches((prev) => {
      const next = [q, ...prev.filter((s) => s !== q)].slice(0, MAX_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const clearSearches = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setSearches([]);
  }, []);

  return { searches, addSearch, clearSearches };
}
