/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, NextFunction } from 'express';
import ApiResponse from '../common/utils/apiResponse';
import logger from '../common/utils/logger';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validator = (schema: any) => async (req: any, res: Response, next: NextFunction) => {
    const paths = Object.keys(schema);
    if (!paths.length) return next();
    if (!paths.includes('body') && !paths.includes('query') && !paths.includes('params')) return next();

    for (const path of paths) {
        const dataForValidation = req[path];
        const { value, error } = schema[path].validate(dataForValidation, {
            allowUnknown: false,
            stripUnknown: true,
        });

        if (error) {
            logger.error(`VALIDATION ERROR: ${error}`);
            const context = error?.details;

            return ApiResponse.BAD_REQUEST({
                res,
                message: `Validation failed for ${path}.`,
                payload: { accepted_fields: Object.keys(schema[path].describe().keys), context },
            });
        }
        req[path] = value;
    }
    next();
};
