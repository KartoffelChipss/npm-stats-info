const {
    formatDate,
    formatMonth,
    getMaxDownloads,
    getDownloadsPerMonth,
    getTotalDownloads,
    getDownloadsPerWeek,
} = require("../downloadsUtil.js");

/**
 *
 * @private
 * @param {string} endDate
 * @param {string} startDate
 */
async function getDownloads(endDate, startDate) {
    const response = await fetch(`https://api.npmjs.org/downloads/range/${endDate}:${startDate}`);
    const data = await response.json();
    return data;
}

/**
 * Get the amount of downloads from all packages on npm
 * @param {string} [start] - the start date (optional)
 * @param {string} [end] - the end date (optional)
 * @returns {Promise<PackageDownloads>}
 *
 * @example
 * let downloads = await npmStats.allDownloads();
 * console.log(downloads)
 */
async function allDownloads(start, end) {
    const now = new Date();
    const yesterday = ( function() { this.setDate(this.getDate()-1); return this } ).call(new Date);
    const lastMonth = ( function() { this.setDate(this.getMonth()-1); return this } ).call(new Date);

    start = start ? new Date(start) : new Date();
    end = end ? new Date(end) : new Date(new Date().setFullYear(new Date().getFullYear() - 1));

    const startDate = `${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()}`;
    const endDate = `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`;

    let downloadsRes = await getDownloads(endDate, startDate);

    if (downloadsRes.error) {
        throw new Error(downloadsRes.error);
        return;
    }

    let downloadsArr = downloadsRes.downloads;

    let maxDownloadsDay = getMaxDownloads(downloadsArr);

    let downloadsPerMonth = getDownloadsPerMonth(downloadsArr).unfiltered;

    let maxDownloadsMonth = getMaxDownloads(downloadsPerMonth);

    let weeklyDownloads = getDownloadsPerWeek(downloadsArr);

    let maxDownloadsWeek = getMaxDownloads(weeklyDownloads);

    return {
        total: getTotalDownloads(downloadsArr),
        yesterday: downloadsArr.find(d => d.day === formatDate(yesterday)),
        maxDownloadsDay: maxDownloadsDay,
        dailyDownloads: downloadsArr,
        thisWeek: weeklyDownloads[weeklyDownloads.length - 1] ?? [],
        lastWeek: weeklyDownloads[weeklyDownloads.length - 2] ?? [],
        weeklyDownloads,
        maxDownloadsWeek,
        thisMonth: downloadsPerMonth.find(d => d.month === formatMonth(now.getMonth(), now.getFullYear())),
        lastMonth: downloadsPerMonth.find(d => d.month === formatMonth(lastMonth.getMonth(), lastMonth.getFullYear())),
        maxDownloadsMonth: maxDownloadsMonth,
        monthlyDownloads: getDownloadsPerMonth(downloadsArr).filtered,
    }
}

module.exports = allDownloads;
