import { Request, Response } from 'express';
import { EHttpStatusCode } from '../enums/EHttpStatusCode';
import productService from '../services/product.service';

class ProductController {
    private discount = 0.5;

    public findAll = async (req: Request, res: Response) => {
        try {

            let { limit, page, search } = req.query;
            limit = !!limit ? String(limit) : '';
            page = !!page ? String(page) : '';
            search = !!search ? String(search) : '';

            const products = await productService.getProducts(search, limit, page, this.discount);

            return res.status(EHttpStatusCode.Ok).json(products);

        } catch (error) {
            return res.status(EHttpStatusCode.InternalServerError).json(error);
        }
    };

    public findById = async (req: Request, res: Response) => {
        try {

            const { id } = req.params;
            const product = await productService.getProductById(id, this.discount);

            if (!product) {
                return res.status(EHttpStatusCode.NotFound).json({
                    msg: "Producto no existe"
                });
            }

            return res.status(EHttpStatusCode.Ok).json(product);

        } catch (error) {
            return res.status(EHttpStatusCode.InternalServerError).json(error);
        }

    };
}

const productController = new ProductController();
export default productController;