import { Router } from 'express';

const router = Router();

import * as productsController from '../controllers/products.controller';
import { verifyToken, verifyAdmin, verifyModerator } from '../middlewares/';

router.get('/', productsController.getProducts);
router.get('/:id', productsController.getProductById);
router.post(
  '/',
  [verifyToken, verifyModerator],
  productsController.createProduct
);
router.put(
  '/:id',
  [verifyToken, verifyAdmin],
  productsController.updateProductById
);
router.delete(
  '/:id',
  [verifyToken, verifyAdmin],
  productsController.deleteProductById
);

export default router;
