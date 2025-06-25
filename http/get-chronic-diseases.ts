import { ChronicDisease } from "@/interfaces/chronic-disease";

export async function getChronicDiseases (): Promise<{ chronicDiseases: ChronicDisease[]}> {
  const response = await fetch('https://sanare-api.vercel.app/chronic-diseases', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch chronic diseases');
  }

  const data = await response.json() as { chronicDiseases: ChronicDisease[] };
  
  return data;
}