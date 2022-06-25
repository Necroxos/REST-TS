import { Response, Request, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { EHttpStatusCode } from '../enums/EHttpStatusCode';


const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        // Handle your request as if no errors happened
        return next();
    }
    // Response error if no pass validation
    return res.status(EHttpStatusCode.UnprocessableEntity).json({ errors: errors.array() });
};

export default validate;