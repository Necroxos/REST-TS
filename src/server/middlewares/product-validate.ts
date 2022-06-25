import { check } from 'express-validator';

class ProductValidator {

    public productIdentifierValidationRules = () => check('id').isInt({ min: 1 });

    public productSearchValidationRules = () => [
        check('search')
            .isString()
            .isLength({ min: 4 })
            .optional(),

        check('limit')
            .isInt({ min: 1 })
            .optional(),

        check('page')
            .isInt({ min: 1 })
            .optional()
    ];
}

const productValidator = new ProductValidator();
export default productValidator;
