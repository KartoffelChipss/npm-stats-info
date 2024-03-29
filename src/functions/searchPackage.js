/**
 * Search for packages with text
 * @param {string} query - Full-text search to apply (required)
 * @param {number} [size] - how many results should be returned (default 20, max 250) (optional)
 * @param {number} [offset] - Offset to return results from (optional)
 * @returns {Promise<SearchResult>}
 * 
 * @description
 * Special search qualifiers can be provided in the full-text query:
 * 
 * - `author:bcoe`: Show/filter results in which bcoe is the author
 * - `maintainer:bcoe`: Show/filter results in which bcoe is qualifier as a maintainer
 * - `keywords:batman`: Show/filter results that have batman in the keywords
 *      - separating multiple keywords with
 *          - `,` acts like a logical OR
 *          - `+` acts like a logical AND
 *          - `,-` can be used to exclude keywords
 * - `not:unstable`: Exclude packages whose version is < 1.0.0
 * - `not:insecure`: Exclude packages that are insecure or have vulnerable dependencies (based on the nsp registry)
 * - `is:unstable`: Show/filter packages whose version is < 1.0.0
 * - `is:insecure`: Show/filter packages that are insecure or have vulnerable dependencies (based on the nsp registry)
 * - `boost-exact:false`: Do not boost exact matches, defaults to true
 * 
 * @example
 * // Search for "electron",
 * // Maximum of 20 results,
 * // Page 5 (4 * 20 results get skipped)
 * let result = await npmStats.searchPackages("electron", 20, 4 * 20);
 * console.log(result)// Output the result
 * 
 * // Search for packages by "kartoffelchips", that has the keywords "splatoon" and "splatoon3"
 * let myPackages = await npmStats.searchPackage("author:kartoffelchips keywords:splatoon+splatoon3");
 * console.log(myPackages)// Output the result
 */
async function searchPackage(query, size, offset) {
    if (query === undefined || query === null) query = "";
    if (size === undefined || size === null) size = 20;
    if (offset === undefined || offset === null) offset = 0;

    const response = await fetch(`https://registry.npmjs.org/-/v1/search?text=${query}&size=${size}&from=${offset}`);
    const data = await response.json();

    if (data.error) {
        throw new Error(data.error);
        return;
    }

    return data;
}

module.exports = searchPackage;