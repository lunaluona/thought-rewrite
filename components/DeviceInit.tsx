"use client";

import { useEffect } from "react";

// Generates a UUID v4
function uuidv4(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export function getOrCreateDeviceId(): string {
  const key = "tr_device_id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = uuidv4();
    localStorage.setItem(key, id);
  }
  return id;
}

export default function DeviceInit() {
  useEffect(() => {
    const id = getOrCreateDeviceId();
    // Sync to cookie so server components can read it
    document.cookie = `tr_device_id=${id}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
  }, []);

  return null;
}
