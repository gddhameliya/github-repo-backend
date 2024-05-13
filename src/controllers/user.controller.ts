import { Request, Response } from 'express';
import { ApiResponse } from '../common/utils/index';
import { userService } from '../services/user.service';
import { validator } from '../middlewares/validator';
import Joi from 'joi';
import { message } from '../common/constants';

//* Function based user controller modules
export const userController = {
    //? Register user Controller Function
    registerUser: {
        //* Validation for register user
        validation: validator({
            body: Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string()
                    .trim()
                    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
                    .message('password must be valid').required(),
            })
        }),

        //* Register user controller function
        handler: async (req: Request, res: Response) => {
            //* Register user service function
            const user = await userService.registerUser(req);

            if (user === message.FAILED) return ApiResponse.CATCH_ERROR({ res, message: message.FAILED });

            if (user === message.ALREADY_EXIST) return ApiResponse.DUPLICATE_VALUE({ res, message: message.ALREADY_EXIST });

            return ApiResponse.OK({ res, message: message.SUCCESS, payload: user });
        },
    },

    //? Sign in user Controller Function
    signIn: {
        //* Login user validation
        validation: validator({
            body: Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string()
                    .trim()
                    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
                    .message('password must be valid').required(),
            })
        }),

        //* Sign in user controller function
        handler: async (req: Request, res: Response) => {
            //* Login user service function
            const user = await userService.loginUser(req);

            //* Check if user is not found 
            if (user === message.FAILED) return ApiResponse.CATCH_ERROR({ res, message: message.FAILED });

            //* Check if user is not found 
            if (user === message.NOT_FOUND) return ApiResponse.DUPLICATE_VALUE({ res, message: message.NOT_FOUND });

            return ApiResponse.OK({ res, message: message.SUCCESS, payload: user });
        },
    },
};
