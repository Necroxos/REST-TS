import { Router } from 'express';
import productRoutes from './product.routes';

class IndexRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.use('/product', productRoutes);
    }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;