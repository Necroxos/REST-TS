import { Router } from 'express';
import productValidator from '../middlewares/product-validate';
import validate from '../middlewares/validate';
import productController from '../controllers/product.controller';

class ProductRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/', productValidator.productSearchValidationRules(), validate, productController.findAll);
        this.router.get('/:id', productValidator.productIdentifierValidationRules(), validate, productController.findById);
    }
}

const productRoutes = new ProductRoutes();
export default productRoutes.router;