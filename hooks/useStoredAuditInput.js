"use client";

import { useMemo, useSyncExternalStore } from "react";

export const AUDIT_FORM_STORAGE_KEY = "stacksave.auditForm.v1";

function subscribe(callback) {
  window.addEventListener("storage", callback);

  return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
  return window.localStorage.getItem(AUDIT_FORM_STORAGE_KEY);
}

function getServerSnapshot() {
  return null;
}

export function useStoredAuditInput() {
  const rawValue = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  return useMemo(() => {
    if (!rawValue) return null;

    try {
      return JSON.parse(rawValue);
    } catch {
      return null;
    }
  }, [rawValue]);
}
