/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { ApiResponse, logger } from '../common/utils/index';

// TODO /* Create error handler function */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {
    //* Log error
    logger.warn(`ERROR at PATH: [${req.path}] METHOD: [${req.method}] MESSAGE: [${err.message}]`);
    console.log('Error caught in error handler', err);

    //* Handling JSON syntax error
    if (err instanceof SyntaxError && err.message.includes('JSON')) return ApiResponse.BAD_REQUEST({ res, message: 'Invalid JSON syntax' });


    //* Handling sendgrid error
    // if (err instanceof ResponseError) return ApiResponse.BAD_REQUEST({ res, message: err.message });

    logger.error(`STACK_ERROR: ${err}`);

    return ApiResponse.CATCH_ERROR({ res, message: err.message });
};

export default errorHandler;
