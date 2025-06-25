export interface Allergy {
  id: string; // Identificador único da alergia
  name: string; // Nome da alergia
  type: string;
  createdAt: Date; // Data de criação do registro
  updatedAt?: Date; // Data de atualização do registro, opcional
}