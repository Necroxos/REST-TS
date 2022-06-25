/********************************************************************************************
*                                     IMPORT CONSTANTS                                      *
*********************************************************************************************/
import { DEFAULT_PAGINATION_LIMIT, DEFAULT_PAGINATION_PAGE } from '../constants';

/********************************************************************************************
*                                     PALINDROME LOGIC                                      *
*********************************************************************************************/

/**
 * Verify if the search text or id is a palindrome
 * @param value 
 * @returns true if is a palindrome, otherwise false
 */
export const checkPalindrome = (value: string): boolean => {
    const regex = /[\W_]/g;
    const searchTxt = value.toLowerCase().replace(regex, '');
    const reverseTxt = searchTxt.split('').reverse().join('');
    const lenghtTxt = searchTxt.length >= 1;

    return lenghtTxt && searchTxt === reverseTxt;
};

/********************************************************************************************
*                                     PAGINATION LOGIC                                      *
*********************************************************************************************/

/**
 * Generate object with options for paginate products
 * @param limit 
 * @param page
 * @returns a object with the information of the pagination options
 */
export const generateOptionsPagination = (limit: string, page: string) => (
    {
        query: {},
        limit: parseInt(limit, 10) || DEFAULT_PAGINATION_LIMIT,
        page: parseInt(page, 10) || DEFAULT_PAGINATION_PAGE,
        sort: { id: 1 }
    }
);