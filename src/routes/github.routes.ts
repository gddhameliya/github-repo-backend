import express from 'express';
import { githubController } from '../controllers/github.controller';
import auth from '../middlewares/auth';
const router = express.Router();

// //? GET
// //* Get all customers API
router.get('/:username', auth({ isTokenRequired: true, usersAllowed: ["*"] }), githubController.getGitRepo.validation, githubController.getGitRepo.handler);

export default router;
