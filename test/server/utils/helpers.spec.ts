import { checkPalindrome, generateOptionsPagination } from '../../../src/server/utils/helpers';

describe('Helpers', () => {

    describe('checkPalindrome', () => {
        it('should return false when the parameter given is an empty string', () => {
            const checkTxt = '';
            const result = checkPalindrome(checkTxt);

            expect(result).toBeFalsy();
        });

        it('should return false when the parameter given is not a palindrome', () => {
            const checkTxt = 'palindrome';
            const result = checkPalindrome(checkTxt);

            expect(result).toBeFalsy();
        });

        it('should return true when the parameter given is a palindrome', () => {
            const checkTxt = 'natan';
            const result = checkPalindrome(checkTxt);

            expect(result).toBeTruthy();
        });
    });

    describe('generateOptionsPagination', () => {
        it('should return object with Pagination Options when limit and page can be parse to int', () => {
            const limit = '7';
            const page = '2';
            const expectedResult = {
                query: {},
                limit: 7,
                page: 2,
                sort: { id: 1 }
            };
            const result = generateOptionsPagination(limit, page);

            expect(result).toEqual(expectedResult);
        });

        it('should return object with Pagination Options when limit and page can not be parse to int', () => {
            const limit = '';
            const page = '';
            const expectedResult = {
                query: {},
                limit: 10,
                page: 1,
                sort: { id: 1 }
            };
            const result = generateOptionsPagination(limit, page);

            expect(result).toEqual(expectedResult);
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});