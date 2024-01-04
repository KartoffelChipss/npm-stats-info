const {
    formatDate,
    formatMonth,
    getMaxDownloads,
    getDownloadsPerMonth,
    getTotalDownloads,
    
} = require("../downloadsUtil.js");

/**
 *
 * @private
 * @param {string} package - The package name
 * @param {string} endDate
 * @param {string} startDate
 */
async function getDownloads(package, endDate, startDate) {
    const response = await fetch(`https://api.npmjs.org/downloads/range/${endDate}:${startDate}/${package}`);
    const data = await response.json();
    return data;
}

/**
 * Get the amount of downloads of a certain package
 * @param {string} package - the name of the package (required)
 * @param {string} [start] - the start date (optional)
 * @param {string} [end] - the end date (optional)
 * @returns {Promise<PackageDownloads>}
 *
 * @example
 * // Get download statistics for "example-package"
 * let downloads = await npmStats.packageDownloads("example-package");
 * console.log(downloads)
 * 
 * // Get download statistics for "example-package" from 2023-12-01 until 2022-12-01 (Default is now to one year ago)
 * // !!! When using a custom time span, "yesterday", "thisMonth" and "lastMonth" might be undefined!
 * let downloads = await npmStats.packageDownloads("splatoon3api", "2023-12-01", "2022-12-01")
 * console.log(downloads)
 */
async function packageDownloads(package, start, end) {
    if (package === undefined || package === null) size = "";

    const now = new Date();
    const yesterday = ( function() { this.setDate(this.getDate()-1); return this } ).call(new Date);
    const lastMonth = ( function() { this.setDate(this.getMonth()-1); return this } ).call(new Date);

    start = start ? new Date(start) : new Date();
    end = end ? new Date(end) : new Date(new Date().setFullYear(new Date().getFullYear() - 1));

    const startDate = `${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()}`;
    const endDate = `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`;

    let downloadsRes = await getDownloads(package, endDate, startDate);

    if (downloadsRes.error) {
        throw new Error(downloadsRes.error);
        return;
    }

    let downloadsArr = downloadsRes.downloads;

    let maxDownloadsDay = getMaxDownloads(downloadsArr);

    let downloadsPerMonth = getDownloadsPerMonth(downloadsArr).unfiltered;

    let maxDownloadsMonth = getMaxDownloads(downloadsPerMonth);

    return {
        total: getTotalDownloads(downloadsArr),
        yesterday: downloadsArr.find(d => d.day === formatDate(yesterday)),
        maxDownloadsDay: maxDownloadsDay,
        dailyDownloads: downloadsArr,
        thisMonth: downloadsPerMonth.find(d => d.month === formatMonth(now.getMonth(), now.getFullYear())),
        lastMonth: downloadsPerMonth.find(d => d.month === formatMonth(lastMonth.getMonth(), lastMonth.getFullYear())),
        maxDownloadsMonth: maxDownloadsMonth,
        monthlyDownloads: getDownloadsPerMonth(downloadsArr).filtered,
    }
}

module.exports = packageDownloads;
