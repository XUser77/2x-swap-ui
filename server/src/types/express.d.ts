declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        wallet: string;
      };
    }
  }
}

export {};
