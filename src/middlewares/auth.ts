/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { ApiResponse, helper } from '../common/utils/index';
import { message } from '../common/constants/index';
import db from "../model/index"

//* Interface for auth options parameters
export interface AuthOptions {
    isTokenRequired?: boolean;
    usersAllowed?: string[];
}

//* Interface for find user from database
export interface userTokenDecoded {
    id: string;
    email: string;
    roles: [string];
}

const auth = ({ isTokenRequired = true, usersAllowed = [] }: AuthOptions) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        //* get token from request header and remove Bearer from it
        const token = (req.header('x-auth-token') || req.header('Authorization'))?.replace(/Bearer +/g, '') || '';

        //* check if token is required and token is present in the request header or not`
        if (token === undefined) return ApiResponse.UNAUTHORIZED({ res, message: message.TOKEN_REQUIRED });

        //* check if token is required and token is present in the request header or not
        if (isTokenRequired && !token) return ApiResponse.UNAUTHORIZED({ res, message: message.TOKEN_REQUIRED });

        //* check if token is not required and token is present in the request header or not
        if (!isTokenRequired && !token) return next();

        const userTokenDecoded: any = await helper.decodeToken({ token });

        //* find user from database
        const user = await db.USER.findOne({ _id: userTokenDecoded._id }, { password: 0 }).lean();
        if (!user) return ApiResponse.UNAUTHORIZED({ res, message: message.INVALID_TOKEN });

        //* Make user object and assign decoded token to it
        req.user = {
            ...userTokenDecoded,
            _id: userTokenDecoded._id,
        };

        //* check if user is allowed to access the route or not

        //? check if all are allowed to access the route or not
        if (usersAllowed.includes('*')) return next();

        return ApiResponse.UNAUTHORIZED({ res, message: message.ACCESS_DENIED });
    };
};

export default auth;
