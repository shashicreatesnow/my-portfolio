"use client";

import { useEffect, useRef } from "react";

export function useAutoSave<T>({
  value,
  delay = 3000,
  enabled = true,
  onSave,
}: {
  value: T;
  delay?: number;
  enabled?: boolean;
  onSave: (value: T) => Promise<void> | void;
}) {
  const firstRun = useRef(true);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    const timer = window.setTimeout(() => {
      void onSave(value);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [delay, enabled, onSave, value]);
}
