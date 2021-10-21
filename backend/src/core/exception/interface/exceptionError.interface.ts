export interface ExceptionError {
  key: string;
  message?: string[];
  children?: ExceptionError[];
}
