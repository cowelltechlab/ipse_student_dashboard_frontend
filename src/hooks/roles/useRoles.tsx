import { useEffect, useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { getRoles } from "../../services/roleServices";
import type { RoleType } from "../../types/RoleTypes";

type CacheEntry = { data: RoleType[]; ts: number };
const CACHE_TTL_MS = 5 * 60 * 1000; 
const rolesCache = new Map<string, CacheEntry>();
const inflight = new Map<string, Promise<RoleType[]>>();

const ROLES_CACHE_KEY = 'roles';

function getCached(): RoleType[] | null {
  const hit = rolesCache.get(ROLES_CACHE_KEY);
  if (!hit) return null;
  if (Date.now() - hit.ts > CACHE_TTL_MS) {
    rolesCache.delete(ROLES_CACHE_KEY);
    return null;
  }
  return hit.data;
}

const useRoles = () => {
  const [roles, setRoles] = useState<RoleType[]>(() =>
    getCached() || []
  );
  const [loading, setLoading] = useState<boolean>(!getCached());
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    // show cache immediately if present
    const cached = getCached();
    if (cached) {
      setRoles(cached);
      setLoading(false);
    } else {
      setLoading(true);
    }

    let cancelled = false;

    (async () => {
      try {
        let p = inflight.get(ROLES_CACHE_KEY);
        if (!p) {
          p = getRoles();
          inflight.set(ROLES_CACHE_KEY, p);
        }
        const fresh = await p;
        if (cancelled) return;
        inflight.delete(ROLES_CACHE_KEY);

        rolesCache.set(ROLES_CACHE_KEY, { data: fresh, ts: Date.now() });
        setRoles(fresh);
        setError(null);
      } catch (e) {
        if (cancelled) return;
        inflight.delete(ROLES_CACHE_KEY);
        console.error("Failed to fetch roles:", e);
        setError(e as ErrorType);
        // keep whatever we had before
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { roles, loading, error };
};

export default useRoles;
