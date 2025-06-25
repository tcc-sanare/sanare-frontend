import { MedicalRecord } from "@/interfaces/medical-record";

export async function getMedicalRecord(data: {
  token: string;
}): Promise<{ medicalRecord: MedicalRecord }> {
  const response = await fetch('https://sanare-api.vercel.app/medical-record', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${data.token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch medical record');
  }

  const result = await response.json() as { medicalRecord: MedicalRecord };
  console.log("getMedicalRecord result", result);
  
  return result;
}