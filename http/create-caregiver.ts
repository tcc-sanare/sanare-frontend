import { Caregiver } from "@/contexts/UserContext";

export async function createCaregiver(data: {
  token: string;
}): Promise<{ caregiver: Caregiver }> {
  const response = await fetch('https://sanare-api.vercel.app/caregiver', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${data.token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to create caregiver');
  }

  const result = await response.json() as { caregiver: Caregiver };
  
  return result;
}