import { Router } from 'express';

import * as authController from '../controllers/auth.controller';
import { verifyRoleExist } from '../middlewares';
import { verifyDuplicateUsernameOrEmail } from '../middlewares/verifySignup';

const router = Router();

router.post(
  '/signup',
  verifyDuplicateUsernameOrEmail,
  verifyRoleExist,
  authController.signUp
);
router.post('/signin', authController.signIn);

export default router;
