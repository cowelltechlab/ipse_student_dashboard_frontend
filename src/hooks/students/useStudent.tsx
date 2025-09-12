import { useEffect, useState } from "react";
import type { StudentProfileType } from "../../types/StudentTypes";
import type { ErrorType } from "../../types/ErrorType";
import { getStudentProfile } from "../../services/studentServices";


type CacheEntry = { data: StudentProfileType; ts: number };
const CACHE_TTL_MS = 5 * 60 * 1000; 
const studentCache = new Map<string, CacheEntry>();
const inflight = new Map<string, Promise<StudentProfileType>>();

function getCached(studentId?: string | null): StudentProfileType | null {
  if (!studentId) return null;
  const hit = studentCache.get(studentId);
  if (!hit) return null;
  if (Date.now() - hit.ts > CACHE_TTL_MS) {
    studentCache.delete(studentId);
    return null;
  }
  return hit.data;
}

const useStudent = (studentId: string | undefined, refetchTrigger?: number) => {
  const [student, setStudent] = useState<StudentProfileType | null>(() =>
    getCached(studentId)
  );
  const [loading, setLoading] = useState<boolean>(!getCached(studentId));
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    if (!studentId) {
      setStudent(null);
      setLoading(false);
      setError(null);
      return;
    }

    // show cache immediately if present
    const cached = getCached(studentId);
    if (cached) {
      setStudent(cached);
      setLoading(false);
    } else {
      setLoading(true);
    }

    let cancelled = false;

    (async () => {
      try {
        let p = inflight.get(studentId);
        if (!p) {
          p = getStudentProfile(studentId);
          inflight.set(studentId, p);
        }
        const fresh = await p;
        if (cancelled) return;
        inflight.delete(studentId);

        studentCache.set(studentId, { data: fresh, ts: Date.now() });
        setStudent(fresh);
        setError(null);
      } catch (e) {
        if (cancelled) return;
        inflight.delete(studentId);
        setError(e as ErrorType);
        // keep whatever we had before
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [studentId, refetchTrigger]);

  return { student, loading, error };
};

export default useStudent;
