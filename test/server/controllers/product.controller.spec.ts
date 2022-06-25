import { EHttpStatusCode } from '../../../src/server/enums/EHttpStatusCode';
import productController from '../../../src/server/controllers/product.controller';
import productService from '../../../src/server/services/product.service';

describe('ProductController', () => {
    let jsonSpy: any;
    let statusSpy: any;
    let responseParam: any;
    let discount: number;

    beforeEach(() => {
        jsonSpy = jest.fn().mockReturnValueOnce({});
        statusSpy = jest.fn().mockReturnValueOnce({ json: jsonSpy });
        responseParam = { status: statusSpy };
        discount = (productController as any).discount;
    });

    describe('findAll', () => {

        let expectedResponse: any;

        beforeEach(() => {
            expectedResponse = { data: [] };
        });

        it('should get the products for a valid search, limit and page parameters', async () => {
            const requestParam: any = { query: { limit: '10', page: '1', search: 'daad' } };
            const getProductsSpy = jest.spyOn(productService, 'getProducts').mockResolvedValueOnce(expectedResponse);
            await productController.findAll(requestParam, responseParam);

            const { limit, page, search } = requestParam.query;

            expect(getProductsSpy).toHaveBeenCalled();
            expect(getProductsSpy).toHaveBeenCalledWith(search, limit, page, discount);
            expect(jsonSpy).toHaveBeenCalled();
            expect(jsonSpy).toHaveBeenCalledWith(expectedResponse);
            expect(statusSpy).toHaveBeenCalled();
            expect(statusSpy).toHaveBeenCalledWith(EHttpStatusCode.Ok);
        });

        it('should get the products for undefined search, limit and page parameters', async () => {
            const requestParam: any = { query: {} };
            const getProductsSpy = jest.spyOn(productService, 'getProducts').mockResolvedValueOnce(expectedResponse);
            await productController.findAll(requestParam, responseParam);

            expect(getProductsSpy).toHaveBeenCalled();
            expect(getProductsSpy).toHaveBeenCalledWith('', '', '', discount);
            expect(jsonSpy).toHaveBeenCalled();
            expect(jsonSpy).toHaveBeenCalledWith(expectedResponse);
            expect(statusSpy).toHaveBeenCalled();
            expect(statusSpy).toHaveBeenCalledWith(EHttpStatusCode.Ok);
        });

        it('should get throw error when try get products', async () => {
            const requestParam: any = { query: {} };
            const errorResponse = new Error('Error test');
            const getProductsSpy = jest.spyOn(productService, 'getProducts').mockImplementationOnce(() => {
                throw errorResponse;
            });
            await productController.findAll(requestParam, responseParam);

            expect(getProductsSpy).toHaveBeenCalled();
            expect(getProductsSpy).toHaveBeenCalledWith('', '', '', discount);
            expect(jsonSpy).toHaveBeenCalled();
            expect(jsonSpy).toHaveBeenCalledWith(errorResponse);
            expect(statusSpy).toHaveBeenCalled();
            expect(statusSpy).toHaveBeenCalledWith(EHttpStatusCode.InternalServerError);
        });
    });

    describe('findById', () => {

        it('should get product for a valid id parameter', async () => {
            const requestParam: any = { params: { id: 1 } };
            const expectedResponse = { data: {} };
            const getProductByIdSpy = jest.spyOn(productService, 'getProductById').mockResolvedValueOnce(expectedResponse);
            await productController.findById(requestParam, responseParam);

            const { id } = requestParam.params;

            expect(getProductByIdSpy).toHaveBeenCalled();
            expect(getProductByIdSpy).toHaveBeenCalledWith(id, discount);
            expect(jsonSpy).toHaveBeenCalled();
            expect(jsonSpy).toHaveBeenCalledWith(expectedResponse);
            expect(statusSpy).toHaveBeenCalled();
            expect(statusSpy).toHaveBeenCalledWith(EHttpStatusCode.Ok);
        });

        it('should not found product for an id parameter', async () => {
            const requestParam: any = { params: { id: 999999 } };
            const getProductByIdSpy = jest.spyOn(productService, 'getProductById').mockResolvedValueOnce(null);
            await productController.findById(requestParam, responseParam);
            
            const expectedResponse = { msg: "Producto no existe" };
            const { id } = requestParam.params;

            expect(getProductByIdSpy).toHaveBeenCalled();
            expect(getProductByIdSpy).toHaveBeenCalledWith(id, discount);
            expect(jsonSpy).toHaveBeenCalled();
            expect(jsonSpy).toHaveBeenCalledWith(expectedResponse);
            expect(statusSpy).toHaveBeenCalled();
            expect(statusSpy).toHaveBeenCalledWith(EHttpStatusCode.NotFound);
        });

        it('should get throw error when try get product', async () => {
            const requestParam: any = { params: { id: 'a' } };
            const errorResponse = new Error('Error test');
            const getProductByIdSpy = jest.spyOn(productService, 'getProductById').mockImplementationOnce(() => {
                throw errorResponse;
            });
            await productController.findById(requestParam, responseParam);

            const { id } = requestParam.params;

            expect(getProductByIdSpy).toHaveBeenCalled();
            expect(getProductByIdSpy).toHaveBeenCalledWith(id, discount);
            expect(jsonSpy).toHaveBeenCalled();
            expect(jsonSpy).toHaveBeenCalledWith(errorResponse);
            expect(statusSpy).toHaveBeenCalled();
            expect(statusSpy).toHaveBeenCalledWith(EHttpStatusCode.InternalServerError);
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});