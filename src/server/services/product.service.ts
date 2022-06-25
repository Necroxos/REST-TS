/********************************************************************************************
*                                     IMPORT CONSTANTS                                      *
*********************************************************************************************/
import { Product } from '../models/Product';
import { PaginationModel } from '../models/Pagination';
import { checkPalindrome, generateOptionsPagination } from '../utils/helpers';


class ProductService {

    /**
     * Function that get all products based in the params given, and applies to all products getted if search param is palindrome
     * @param {string} search represent the value to find
     * @param {string} limit represent the total of element per array
     * @param {string} page represent the number of page to view
     * @returns {PaginationModel} object with Product[]
     */
    public getProducts = async (search: string, limit: string, page: string, discount: number): Promise<PaginationModel> => {
        const options = generateOptionsPagination(limit, page);
        options.query = this.generateQueryProductPagination(search);

        const products = await Product.paginate(options) as PaginationModel;

        if (checkPalindrome(String(search)) && this.validDiscountValue(discount)) {
            products.docs = products.docs.map((product) => this.applyDiscountProduct(product, discount));
        }

        return products;
    };

    /**
     * Function that get one product by id given, and applies discount if id is palindrome
     * @param {string} id represent id to find
     * @param {number} discount represent discount to apply
     * @returns {...} promise that return a product or null
     */
    public getProductById = async (id: string, discount: number): Promise<any | null> => {

        let product = await Product.findOne({ id });

        if (!product) { return null; }

        if (checkPalindrome(id) && this.validDiscountValue(discount)) {
            product = this.applyDiscountProduct(product.toObject(), discount);
        }

        return product;
    };

    /********************************************************************************************
    *                                     PAGINATION LOGIC                                      *
    *********************************************************************************************/

    /**
     * Generate a valid object to find product regex with a search word
     * @param {string} search 
     * @returns {} if search is not send, otherwise return a valid object to regex data
     */
    private generateQueryProductPagination = (search: string) => search
        ?
        {
            $or: [
                { brand: { $regex: new RegExp(search), $options: 'i' } },
                { description: { $regex: new RegExp(search), $options: 'i' } }
            ]
        }
        : {};

    /********************************************************************************************
    *                                      DISCOUNT LOGIC                                       *
    *********************************************************************************************/

    /**
     * Get a valid discount to apply
     * @param {number} discount represent discount to apply
     * @returns {number} the actual discount to apply
     */
    private getDiscount = (discount: number): number => 1 - discount;

    /**
     * Function that check valid value for discount
     * @param {number} discount represent the value for discount
     * @returns {boolean} if value is between 1 and 0 return true, otherwise return false
     */
    private validDiscountValue = (discount: number): boolean => {
        if (discount < 0 || discount > 1) { return false; }
        return true;
    };

    /**
     * Function that apply discount to the price and return it
     * @param {numer} price represent the original price of product
     * @param {numer} discount represent discount to apply
     * @returns {number} the price with the discount already applied
     */
    private applyDiscountPrice = (price: number, discount: number): number => Math.round(price * this.getDiscount(discount));

    /**
     * Generate object of a product with a discount applied for the price
     * @param {any} product refence to product for apply discount
     * @param {number} discount represent discount to apply
     * @returns {...} with the data of the product and the price with the discount applied 
     */
    private applyDiscountProduct = (product: any, discount: number) => ({
        ...product,
        price: this.applyDiscountPrice(product.price, discount),
        isPalindrome: true,
        discount: (discount * 100)
    });
}

const productService = new ProductService();
export default productService;
