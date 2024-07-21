declare namespace Express {
  export interface Request {
    search: string;
    page: { offset?: number; limit?: number };
  }
}
