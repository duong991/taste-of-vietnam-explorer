import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useRecentSearches } from "@/hooks/useRecentSearches";

const STORAGE_KEY = "recentSearches";

describe("useRecentSearches", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("initialises with empty array when localStorage is empty", () => {
    const { result } = renderHook(() => useRecentSearches());
    expect(result.current.searches).toEqual([]);
  });

  it("initialises with existing localStorage data", () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(["pho", "bun cha"]));
    const { result } = renderHook(() => useRecentSearches());
    expect(result.current.searches).toEqual(["pho", "bun cha"]);
  });

  it("addSearch prepends new query", () => {
    const { result } = renderHook(() => useRecentSearches());
    act(() => result.current.addSearch("pho"));
    expect(result.current.searches[0]).toBe("pho");
  });

  it("addSearch deduplicates and moves to top", () => {
    const { result } = renderHook(() => useRecentSearches());
    act(() => result.current.addSearch("pho"));
    act(() => result.current.addSearch("bun cha"));
    act(() => result.current.addSearch("pho"));
    expect(result.current.searches).toEqual(["pho", "bun cha"]);
  });

  it("addSearch persists to localStorage", () => {
    const { result } = renderHook(() => useRecentSearches());
    act(() => result.current.addSearch("cao lau"));
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    expect(stored).toContain("cao lau");
  });

  it("addSearch ignores empty/whitespace strings", () => {
    const { result } = renderHook(() => useRecentSearches());
    act(() => result.current.addSearch("   "));
    expect(result.current.searches).toHaveLength(0);
  });

  it("addSearch caps at 10 items", () => {
    const { result } = renderHook(() => useRecentSearches());
    for (let i = 0; i < 12; i++) {
      act(() => result.current.addSearch(`query-${i}`));
    }
    expect(result.current.searches).toHaveLength(10);
    expect(result.current.searches[0]).toBe("query-11");
  });

  it("clearSearches empties the list and removes from localStorage", () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(["pho"]));
    const { result } = renderHook(() => useRecentSearches());
    act(() => result.current.clearSearches());
    expect(result.current.searches).toHaveLength(0);
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it("handles corrupt localStorage gracefully", () => {
    localStorage.setItem(STORAGE_KEY, "not-valid-json");
    const { result } = renderHook(() => useRecentSearches());
    expect(result.current.searches).toEqual([]);
  });
});
