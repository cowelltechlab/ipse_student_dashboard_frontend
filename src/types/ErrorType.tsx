// export interface ErrorType {
//     code: string
//     message: string
// }


// types/ErrorType.ts
export interface ErrorType {
  response?: {
    data?: {
      detail?: string;
    };
    status?: number;
  };
  message?: string;
}