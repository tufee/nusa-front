export interface Recipe {
  medico: string;
  paciente: string;
  medicamento: string;
  data_prescricao: Date;
}

export interface RecipeRequest {
  medicamento: {
    id: string;
  }
  paciente: {
    id: string;
  },
  userId: string;
  data_prescricao: Date;
}

export interface RecipePayLoad {
  data_prescricao: Date;
  nome_medico: string;
  nome_paciente: string;
  nome_medicamento: string;
}
