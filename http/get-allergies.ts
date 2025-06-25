import { Allergy } from "@/interfaces/allergy";

export async function getAllergies(): Promise<{ allergies: Allergy[] }> {
  const response = await fetch('https://sanare-api.vercel.app/allergies', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch allergies');
  }

  const data = await response.json() as { allergies: Allergy[] };

  return data;
}