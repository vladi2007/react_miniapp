import type { Request, Response, NextFunction } from 'express';
export function returnError(status: number, message: string, res: Response) {
  return res.status(status).json({
    detail: message,
  });
}
export function validateQueryParams(requiredParams: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const missingParams = requiredParams.filter((param) => !(param in req.query));
    if (missingParams.length > 0) {
      return res.status(410).json({
        status: 410,
        detail: `Missing query parameters: ${missingParams.join(', ')}`,
      });
    }
    for (const param of requiredParams) {
      const valueParam = req.query[param];
      switch (param) {
        case 'telegram_id':
          if (isNaN(Number(valueParam))) returnError(410, 'telegram_id must be integer', res);
          break;
        case 'name':
        case 'organization_name':
          if (typeof valueParam !== 'string' || !valueParam) {
            return returnError(410, `${param} must be a non-empty string`, res);
          }
          if ((valueParam as string).length < 3 || (valueParam as string).length > 32) {
            return returnError(410, `${param} must be between 3 and 32 characters`, res);
          }
          break;
        case 'organization_description':
          if (typeof valueParam !== 'string' || !valueParam) {
            return returnError(410, `${param} must be a non-empty string`, res);
          }
          if ((valueParam as string).length < 0 || (valueParam as string).length > 200) {
            return returnError(410, `${param} must be less than 200 symbols`, res);
          }
          break;
        case 'filter_part':
          if (!['all', 'admin', 'leader'].includes(valueParam as string)) {
            return returnError(410, 'role must be "all" or "admin" or "leader"', res);
          }
          break;
        case 'patch_role':
          if (!['admin', 'leader', 'remote'].includes(valueParam as string)) {
            return returnError(410, 'role must be \'admin\' or \'leader\' or \'remote\'', res);
          }
          break;
        case 'patch_participant_id':
          if (isNaN(Number(valueParam))) {
            return returnError(410, 'patch_participant_id must be an integer', res);
          }
          break;
        case 'patch_participant_username':
          if (typeof valueParam !== 'string' || !valueParam) {
            return returnError(410, `${param} must be a non-empty string`, res);
          }
          if ((valueParam as string).length < 3 || (valueParam as string).length > 32) {
            return returnError(410, `${param} must be between 3 and 32 characters`, res);
          }
          break;
      }
    }
    next();
  };
}
