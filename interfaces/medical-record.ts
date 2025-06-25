export interface MedicalRecord {
  id: string;
  bloodType: string;
  allergies: {
    allergyId: string;
    description: string;
  }[];
  chronicDiseases: string[];
  selfMonitorId: string;
  createdAt: Date;
  updatedAt?: Date;
}