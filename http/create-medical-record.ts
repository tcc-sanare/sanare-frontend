import { MedicalRecord } from "@/interfaces/medical-record";

export async function createMedicalRecord(data: {
  token: string;
  allergies: {
    allergyId: string;
    description: string;
  }[];
  chronicDiseases: string[];
  bloodType: string;
}): Promise<{ medicalRecord: MedicalRecord }> {
  const response = await fetch('https://sanare-api.vercel.app/medical-record', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${data.token}`,
    },
    body: JSON.stringify({
      allergies: data.allergies,
      chronicDiseases: data.chronicDiseases,
      bloodType: data.bloodType,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create medical record');
  }

  const result = await response.json() as { medicalRecord: MedicalRecord };
  
  return result;
}