import { SelfMonitor } from "@/contexts/UserContext";

export async function createSelfMonitor(data: {
  token: string;
}): Promise<{ selfMonitor: SelfMonitor }> {
  const response = await fetch('https://sanare-api.vercel.app/self-monitor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${data.token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to create self monitor');
  }

  const result = await response.json();
  
  return result;
}
