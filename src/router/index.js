import { Router } from 'express';

import productsRouters from './product.router.js';
import cartsRouters from './carts.router.js';

const router = Router();

router.use('/products', productsRouters);

router.use('/carts', cartsRouters);

export default router;