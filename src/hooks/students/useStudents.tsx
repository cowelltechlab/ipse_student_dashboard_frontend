import { useEffect, useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import type { StudentType } from "../../types/StudentTypes";
import { getStudents } from "../../services/studentServices";

type CacheEntry = { data: StudentType[]; ts: number };
const CACHE_TTL_MS = 5 * 60 * 1000; 
const studentsCache = new Map<string, CacheEntry>();
const inflight = new Map<string, Promise<StudentType[]>>();

function getCacheKey(searchTerm?: string | null, year_id?: number | null): string {
  return `${searchTerm || ''}-${year_id || ''}`;
}

function getCached(searchTerm?: string | null, year_id?: number | null): StudentType[] | null {
  const key = getCacheKey(searchTerm, year_id);
  const hit = studentsCache.get(key);
  if (!hit) return null;
  if (Date.now() - hit.ts > CACHE_TTL_MS) {
    studentsCache.delete(key);
    return null;
  }
  return hit.data;
}

const useStudents = (
  searchTerm?: string | null,
  year_id?: number | null,
  refetchTrigger?: number
) => {
  const [students, setStudents] = useState<StudentType[]>(() =>
    getCached(searchTerm, year_id) || []
  );
  const [loading, setLoading] = useState<boolean>(!getCached(searchTerm, year_id));
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const key = getCacheKey(searchTerm, year_id);
    
    // show cache immediately if present
    const cached = getCached(searchTerm, year_id);
    if (cached) {
      setStudents(cached);
      setLoading(false);
    } else {
      setLoading(true);
    }

    let cancelled = false;

    (async () => {
      try {
        let p = inflight.get(key);
        if (!p) {
          p = getStudents(searchTerm, year_id);
          inflight.set(key, p);
        }
        const fresh = await p;
        if (cancelled) return;
        inflight.delete(key);

        studentsCache.set(key, { data: fresh, ts: Date.now() });
        setStudents(fresh);
        setError(null);
      } catch (e) {
        if (cancelled) return;
        inflight.delete(key);
        setError(e as ErrorType);
        // keep whatever we had before
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [searchTerm, year_id, refetchTrigger]);

  return { students, loading, error };
};

export default useStudents;
