import { SelfMonitor } from "@/contexts/UserContext";

export async function updateSelfMonitor(data: {
  token: string;
  logInputs: {
    mood: boolean;
    bloodSugar: boolean;
    bloodPressure: boolean;
    symptoms: boolean;
    imc: boolean;
    hydration: boolean;
  }
}): Promise<{ selfMonitor: SelfMonitor }> {
  const response = await fetch('https://sanare-api.vercel.app/self-monitor', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${data.token}`,
    },
    body: JSON.stringify({
      logInputs: data.logInputs,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to update self monitor');
  }

  const result = await response.json() as { selfMonitor: SelfMonitor };

  return result;
}