import type { Request, Response, NextFunction } from 'express';

export function validateQueryParams(requiredParams: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const missingParams = requiredParams.filter((param) => !(param in req.query));
    if (missingParams.length > 0) {
      return res.status(410).json({
        status: 410,
        detail: `Missing query parameters: ${missingParams.join(', ')}`,
      });
    }
    next();
  };
}
