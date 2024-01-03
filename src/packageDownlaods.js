/**
 * 
 * @param {Date} date
 * @returns {string}
 */
function formatDate(date) {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) month = `0${month}`;
    let day = date.getDate();
    if (day < 10) day = `0${day}`;

    return `${year}-${month}-${day}`;
}

/**
 * 
 * @param {number} month
 * @param {string} year
 * @returns {string}
 */
function formatMonth(month, year) {
    month++;
    if (month < 10) month = `0${month}`;

    return `${year}-${month}`;
}

/**
 * 
 * @param {object[]} downloadsArr - Array of downloads per day or month
 * @returns {number}
 */
function getMaxDownloads(downloadsArr) {
    return downloadsArr.reduce((max, current) => {
        return current.downloads > max.downloads ? current : max;
    }, downloadsArr[0] || {});
}

/**
 * @typedef {Object} GetDownloadsResult
 * @property {object[]} filtered
 * @property {object[]} unfiltered
 */

/**
 * 
 * @param {Object[]} downloadsArr - Array of Downloads per day
 * @returns {GetDownloadsResult}
 */
function getDownloadsPerMonth(downloadsArr) {
    const downloadsByMonth = {};

    downloadsArr.forEach(item => {
        const [year, month] = item.day.split('-');
        const monthKey = `${year}-${month}`;

        if (!downloadsByMonth[monthKey]) {
            downloadsByMonth[monthKey] = {
                totalDownloads: item.downloads,
                days: 1
            };
        } else {
            downloadsByMonth[monthKey].totalDownloads += item.downloads;
            downloadsByMonth[monthKey].days += 1;
        }
    });

    const unfiltered = Object.keys(downloadsByMonth)
        .map(monthKey => ({
            month: monthKey,
            downloads: downloadsByMonth[monthKey].totalDownloads
        }));

    const filtered = Object.keys(downloadsByMonth)
        .filter(monthKey => downloadsByMonth[monthKey].days >= 30)
        .map(monthKey => ({
            month: monthKey,
            downloads: downloadsByMonth[monthKey].totalDownloads
        }));

    return {
        filtered,
        unfiltered
    };
}

/**
 *
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
 * let downloads = await npmStats.packageDownloads("splatoon3api");
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

    let downloadsArr = downloadsRes.downloads;

    let maxDownloadsDay = getMaxDownloads(downloadsArr);

    let downloadsPerMonth = getDownloadsPerMonth(downloadsArr).unfiltered;

    let maxDownloadsMonth = getMaxDownloads(downloadsPerMonth);

    return {
        today: downloadsArr.find(d => d.day === formatDate(now)),
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
