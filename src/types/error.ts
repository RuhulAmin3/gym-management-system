export type IGenericErrMessage = {
    field: string | number;
    message: string;
  };
  
  export type IGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorDetails: IGenericErrMessage[];
  };