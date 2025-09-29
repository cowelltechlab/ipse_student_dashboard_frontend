import { useEffect, useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import type { StudentDetailsType } from "../../types/StudentGroupTypes";
import { getStudentsWithDetails } from "../../services/studentGroupsServices";

type CacheEntry = { data: StudentDetailsType[]; ts: number };
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const studentsDetailsCache = new Map<string, CacheEntry>();
const inflight = new Map<string, Promise<StudentDetailsType[]>>();

function getCacheKey(): string {
  return "studentsWithDetails";
}

function getCached(): StudentDetailsType[] | null {
  const key = getCacheKey();
  const hit = studentsDetailsCache.get(key);
  if (!hit) return null;
  if (Date.now() - hit.ts > CACHE_TTL_MS) {
    studentsDetailsCache.delete(key);
    return null;
  }
  return hit.data;
}

const useStudentsWithDetails = (refetchTrigger?: number) => {
  const [students, setStudents] = useState<StudentDetailsType[]>(() =>
    getCached() || []
  );
  const [loading, setLoading] = useState<boolean>(!getCached());
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const key = getCacheKey();

    // // Show cache immediately if present
    // const cached = getCached();
    // if (cached) {
    //   setStudents(cached);
    //   setLoading(false);
    // } else {
    //   setLoading(true);
    // }

    let cancelled = false;

    (async () => {
      try {
        let p = inflight.get(key);
        if (!p) {
          p = getStudentsWithDetails();
          inflight.set(key, p);
        }
        const fresh = await p;
        if (cancelled) return;
        inflight.delete(key);

        studentsDetailsCache.set(key, { data: fresh, ts: Date.now() });
        setStudents(fresh);
        setError(null);
      } catch (e) {
        if (cancelled) return;
        inflight.delete(key);
        setError(e as ErrorType);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [refetchTrigger]);

  return { students, loading, error };
};

export default useStudentsWithDetails;