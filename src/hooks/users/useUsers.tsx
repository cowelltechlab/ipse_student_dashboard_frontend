import { useEffect, useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import type { UserType } from "../../types/UserTypes";
import { getUsers } from "../../services/userServices";

type CacheEntry = { data: UserType[]; ts: number };
const CACHE_TTL_MS = 5 * 60 * 1000; 
const usersCache = new Map<string, CacheEntry>();
const inflight = new Map<string, Promise<UserType[]>>();

function getCacheKey(roleId?: number): string {
  return String(roleId || '');
}

function getCached(roleId?: number): UserType[] | null {
  const key = getCacheKey(roleId);
  const hit = usersCache.get(key);
  if (!hit) return null;
  if (Date.now() - hit.ts > CACHE_TTL_MS) {
    usersCache.delete(key);
    return null;
  }
  return hit.data;
}

const useUsers = (refetchTrigger: number, roleId?: number) => {
  const [users, setUsers] = useState<UserType[]>(() =>
    getCached(roleId) || []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    if (!roleId) return; // Skip fetch

    const key = getCacheKey(roleId);
    
    // show cache immediately if present
    const cached = getCached(roleId);
    if (cached) {
      setUsers(cached);
      setLoading(false);
    } else {
      setLoading(true);
    }

    let cancelled = false;

    (async () => {
      try {
        let p = inflight.get(key);
        if (!p) {
          p = getUsers(roleId);
          inflight.set(key, p);
        }
        const fresh = await p;
        if (cancelled) return;
        inflight.delete(key);

        console.log(fresh)
        usersCache.set(key, { data: fresh, ts: Date.now() });
        setUsers(fresh);
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
  }, [roleId, refetchTrigger]);

  return { users, loading, error };
};

export default useUsers;

export function invalidateUsersCache(roleId?: number) {
  const key = String(roleId || "");
  usersCache.delete(key);
  inflight.delete(key);
}

export function upsertUserInCache(updated: UserType, roleId?: number) {
  const key = String(roleId || "");
  const hit = usersCache.get(key);
  if (!hit) return;
  const list = hit.data.slice();
  const idx = list.findIndex(u => u.id === updated.id);
  if (idx >= 0) list[idx] = { ...list[idx], ...updated };
  else list.unshift(updated);
  usersCache.set(key, { data: list, ts: Date.now() });
}

export function removeUserFromCache(userId: number, roleId?: number) {
  const key = String(roleId || "");
  const hit = usersCache.get(key);
  if (!hit) return;
  const list = hit.data.filter(u => u.id !== userId);
  usersCache.set(key, { data: list, ts: Date.now() });
}

