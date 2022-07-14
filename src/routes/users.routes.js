import { Router } from 'express';

const router = Router();

import * as usersController from '../controllers/users.controller';
import { verifyToken, verifyAdmin, verifyRoleExist } from '../middlewares/';

router.get('/', [verifyToken, verifyAdmin], usersController.getUsers);
router.post(
  '/',
  verifyToken,
  verifyAdmin,
  verifyRoleExist,
  usersController.createUser
);

export default router;
