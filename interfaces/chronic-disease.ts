export interface ChronicDisease {
  id: string; // Identificador único da doença crônica
  name: string; // Nome da doença crônica
  description: string; // Descrição opcional da doença crônica
  createdAt: Date; // Data de criação do registro
  updatedAt?: Date; // Data de atualização do registro, opcional
}