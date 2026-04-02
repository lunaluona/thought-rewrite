import { cookies } from "next/headers";

export async function getDeviceId(): Promise<string | null> {
  const store = await cookies();
  return store.get("tr_device_id")?.value ?? null;
}
