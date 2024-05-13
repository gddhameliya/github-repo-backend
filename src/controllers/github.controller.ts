/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { ApiResponse } from '../common/utils/index';
import { githubService } from '../services/github.service';
import { validator } from '../middlewares/validator';
import Joi from 'joi';
import { message } from '../common/constants';

//* Function based github controller modules
export const githubController = {
    //? get git repo controller
    getGitRepo: {
        //* Validation for create github
        validation: validator({
            params: Joi.object({
                username: Joi.string().trim().required(),
            }),
        }),

        //* create github controller function
        handler: async (req: Request, res: Response) => {
            //* Get the data from github service 
            const data = await githubService.getRepo(req);

            //* Check if data is not found 
            if (data === message.NOT_FOUND) return ApiResponse.NOT_FOUND({ res, message: message.NOT_FOUND });

            //* Check if data is failed 
            if (data === message.FAILED) return ApiResponse.CATCH_ERROR({ res, message: message.FAILED });

            return ApiResponse.OK({ res, message: message.SUCCESS, payload: data });
        },
    },
};
