import { Response } from 'express';
import ApiResponse from '../common/utils/apiResponse';
import { Router } from 'express';

const router = Router();


import userRoute from './user.routes';
import githubRoute from './github.routes';

router.use('/user', userRoute); //* User Routes
router.use('/github', githubRoute); //* Github Routes

//* Root Route
router.get('/', async (_, res: Response) => {
    return ApiResponse.OK({ res, message: `Welcome to the Backend apis!` });
});

//* Wrong Route
router.use((_, res: Response) => {
    return ApiResponse.NOT_FOUND({ res, message: `Oops! Looks like you're lost.` });
});

export default router;
