
export type IOptions = {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: string;
  };
  
  export type IReturnOptions = {
    page: number;
    limit: number;
    skip: number;
    sortBy: string;
    sortOrder: string;
  };