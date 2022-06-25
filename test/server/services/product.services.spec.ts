import productService from '../../../src/server/services/product.service';
import productController from '../../../src/server/controllers/product.controller';
import * as helpers from '../../../src/server/utils/helpers';
import { Product } from '../../../src/server/models/Product';
import {
    MOCK_PALINDROME_PRODUCT_PAGINATION_RESPONSE,
    MOCK_DISCOUNT_PRODUCT_PAGINATION_RESPONSE,
    MOCK_PRODUCT_PAGINATION_RESPONSE,
    MOCK_GENERIC_PRODUCT_PAGINATION_RESPONSE,
    MOCK_DISCOUNT_PRODUCT_RESPONSE,
    MOCK_PRODUCT_OBJECT_RESPONSE,
    MOCK_PRODUCT_RESPONSE,
    MOCK_NO_DISCOUNT_PRODUCT_RESPONSE
} from './product.services.mocks';

describe('ProductService', () => {
    let discount: number;

    beforeEach(() => {
        discount = (productController as any).discount;
    });

    describe('getProducts', () => {
        let limit: string;
        let page: string;

        beforeEach(() => {
            limit = '3';
            page = '1';
        });

        it('should return object as PaginationModel for palindrome search and discounted price for products', async () => {
            const expectedResultSpy = {
                query: {},
                limit: 3,
                page: 1,
                sort: { id: 1 }
            };
            const search = 'daad';

            const generateOptionsPaginationSpy = jest.spyOn(helpers, 'generateOptionsPagination').mockReturnValueOnce(expectedResultSpy);
            const paginateSpy = jest.spyOn(Product, 'paginate').mockResolvedValueOnce(MOCK_PALINDROME_PRODUCT_PAGINATION_RESPONSE as any);
            const generateQueryProductPaginationSpy = jest.spyOn(productService as any, 'generateQueryProductPagination');
            const checkPalindromeSpy = jest.spyOn(helpers, 'checkPalindrome');
            const applyDiscountProductSpy = jest.spyOn(productService as any, 'applyDiscountProduct');

            const result = await productService.getProducts(search, limit, page, discount);

            expect(paginateSpy).toHaveBeenCalled();
            expect(generateOptionsPaginationSpy).toHaveBeenCalled();
            expect(generateQueryProductPaginationSpy).toHaveBeenCalled();
            expect(checkPalindromeSpy).toHaveBeenCalled();
            expect(applyDiscountProductSpy).toHaveBeenCalled();
            expect(result).toEqual(MOCK_DISCOUNT_PRODUCT_PAGINATION_RESPONSE);
        });

        it('should return object as PaginationModel for not palindrome search and normal price for products', async () => {
            const expectedResultSpy = {
                query: {},
                limit: 3,
                page: 1,
                sort: { id: 1 }
            };
            const search = 'celi';

            const generateOptionsPaginationSpy = jest.spyOn(helpers, 'generateOptionsPagination').mockReturnValueOnce(expectedResultSpy);
            const paginateSpy = jest.spyOn(Product, 'paginate').mockResolvedValueOnce(MOCK_PRODUCT_PAGINATION_RESPONSE as any);
            const generateQueryProductPaginationSpy = jest.spyOn(productService as any, 'generateQueryProductPagination');
            const checkPalindromeSpy = jest.spyOn(helpers, 'checkPalindrome');
            const applyDiscountProductSpy = jest.spyOn(productService as any, 'applyDiscountProduct');

            const result = await productService.getProducts(search, limit, page, discount);

            expect(paginateSpy).toHaveBeenCalled();
            expect(generateOptionsPaginationSpy).toHaveBeenCalled();
            expect(generateQueryProductPaginationSpy).toHaveBeenCalled();
            expect(checkPalindromeSpy).toHaveBeenCalled();
            expect(applyDiscountProductSpy).not.toHaveBeenCalled();
            expect(result).not.toEqual(MOCK_PRODUCT_PAGINATION_RESPONSE);
        });

        it('should return object as PaginationModel with out search and normal price for products', async () => {
            const expectedResultSpy = {
                query: {},
                limit: 10,
                page: 1,
                sort: { id: 1 }
            };

            const generateOptionsPaginationSpy = jest.spyOn(helpers, 'generateOptionsPagination').mockReturnValueOnce(expectedResultSpy);
            const paginateSpy = jest.spyOn(Product, 'paginate').mockResolvedValueOnce(MOCK_GENERIC_PRODUCT_PAGINATION_RESPONSE as any);
            const generateQueryProductPaginationSpy = jest.spyOn(productService as any, 'generateQueryProductPagination');
            const checkPalindromeSpy = jest.spyOn(helpers, 'checkPalindrome');
            const applyDiscountProductSpy = jest.spyOn(productService as any, 'applyDiscountProduct');

            const result = await productService.getProducts('', '', '', discount);

            expect(paginateSpy).toHaveBeenCalled();
            expect(generateOptionsPaginationSpy).toHaveBeenCalled();
            expect(generateQueryProductPaginationSpy).toHaveBeenCalled();
            expect(checkPalindromeSpy).toHaveBeenCalled();
            expect(applyDiscountProductSpy).not.toHaveBeenCalled();
            expect(result).toEqual(MOCK_GENERIC_PRODUCT_PAGINATION_RESPONSE);
        });
    });

    describe('getProductById', () => {
        it('should return Product with discount', async () => {
            const id = '1';
            const findOneSpy = jest.spyOn(Product, 'findOne').mockResolvedValueOnce(MOCK_PRODUCT_OBJECT_RESPONSE as any);
            const checkPalindromeSpy = jest.spyOn(helpers, 'checkPalindrome');
            const applyDiscountProductSpy = jest.spyOn(productService as any, 'applyDiscountProduct');

            const result = await productService.getProductById(id, discount);

            expect(findOneSpy).toHaveBeenCalled();
            expect(checkPalindromeSpy).toHaveBeenCalled();
            expect(applyDiscountProductSpy).toHaveBeenCalled();
            expect(result).toEqual(MOCK_DISCOUNT_PRODUCT_RESPONSE);
        });

        it('should return Product with out discount', async () => {
            const id = '10';
            const findOneSpy = jest.spyOn(Product, 'findOne').mockResolvedValueOnce(MOCK_PRODUCT_RESPONSE as any);
            const checkPalindromeSpy = jest.spyOn(helpers, 'checkPalindrome');
            const applyDiscountProductSpy = jest.spyOn(productService as any, 'applyDiscountProduct');

            const result = await productService.getProductById(id, discount);

            expect(findOneSpy).toHaveBeenCalled();
            expect(checkPalindromeSpy).toHaveBeenCalled();
            expect(applyDiscountProductSpy).not.toHaveBeenCalled();
            expect(result).toEqual(MOCK_PRODUCT_RESPONSE);
        });

        it('should return null for no matching id to product', async () => {
            const id = '-1';
            const findOneSpy = jest.spyOn(Product, 'findOne').mockResolvedValueOnce(null);
            const checkPalindromeSpy = jest.spyOn(helpers, 'checkPalindrome');
            const applyDiscountProductSpy = jest.spyOn(productService as any, 'applyDiscountProduct');

            const result = await productService.getProductById(id, discount);

            expect(findOneSpy).toHaveBeenCalled();
            expect(checkPalindromeSpy).not.toHaveBeenCalled();
            expect(applyDiscountProductSpy).not.toHaveBeenCalled();
            expect(result).toEqual(null);
        });

        it('should return Product with out discount for discount value > 1', async () => {
            const id = '1';
            const invalidDiscount = 2;
            const findOneSpy = jest.spyOn(Product, 'findOne').mockResolvedValueOnce(MOCK_NO_DISCOUNT_PRODUCT_RESPONSE as any);
            const checkPalindromeSpy = jest.spyOn(helpers, 'checkPalindrome');
            const applyDiscountProductSpy = jest.spyOn(productService as any, 'applyDiscountProduct');

            const result = await productService.getProductById(id, invalidDiscount);

            expect(findOneSpy).toHaveBeenCalled();
            expect(checkPalindromeSpy).toHaveBeenCalled();
            expect(applyDiscountProductSpy).not.toHaveBeenCalled();
            expect(result).toEqual(MOCK_NO_DISCOUNT_PRODUCT_RESPONSE);
        });

        it('should return Product with out discount for discount value < 0', async () => {
            const id = '1';
            const invalidDiscount = -1;
            const findOneSpy = jest.spyOn(Product, 'findOne').mockResolvedValueOnce(MOCK_NO_DISCOUNT_PRODUCT_RESPONSE as any);
            const checkPalindromeSpy = jest.spyOn(helpers, 'checkPalindrome');
            const applyDiscountProductSpy = jest.spyOn(productService as any, 'applyDiscountProduct');

            const result = await productService.getProductById(id, invalidDiscount);

            expect(findOneSpy).toHaveBeenCalled();
            expect(checkPalindromeSpy).toHaveBeenCalled();
            expect(applyDiscountProductSpy).not.toHaveBeenCalled();
            expect(result).toEqual(MOCK_NO_DISCOUNT_PRODUCT_RESPONSE);
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});