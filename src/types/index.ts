
export type ModelType = 
  | 'ANN' 
  | 'CNN' 
  | 'Linear Regression' 
  | 'Logistic Regression'
  | 'LSTM'
  | 'Transformers';

export type ModeType = 'CPU' | 'GPU' | 'PySpark';

export interface FileInfo {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
}

export interface RunHistory {
  id: string;
  userId: string;
  username: string;
  modelType: ModelType;
  modeType: ModeType;
  fileName: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  startTime: Date;
  endTime?: Date;
  logs?: string[];
}
