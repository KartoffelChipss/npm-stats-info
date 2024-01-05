/**
 * 
 * @private
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
 * @private
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
 * @private
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
 * @private
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
 * @private
 * @param {Object[]} downloadsArr - Array of Downloads per day
 * @returns {number}
 */
function getTotalDownloads(downloadsArr) {
    let total = 0;

    for (let i = 0; i < downloadsArr.length; i++) {
        total += downloadsArr[i].downloads;
    }

    return total;
}

/**
 * 
 * @private
 * @param {Object[]} downloadsArr - Array of Downloads per day
 * @returns {DownloadsWeek}
 */
function getDownloadsPerWeek(downloadsArr) {
    const weeks = [];
    let currentWeek = [];

    for (const entry of downloadsArr) {
        const entryDate = new Date(entry.day);
        const currentDay = entryDate.getDay(); // 0 (Sunday) to 6 (Saturday)

        if (currentDay === 0 && currentWeek.length > 0) {
            weeks.push(currentWeek);
            currentWeek = [];
        }

        currentWeek.push(entry);
    }

    // Add the last week
    if (currentWeek.length > 0) {
        weeks.push(currentWeek);
    }

    weeks.map(week => week.reduce((total, entry) => total + entry.downloads, 0));

    let weeklyDownloads = [];
    for (const week of weeks) {
        let totalDownloads = 0;

        let startDate = week[0].day;
        let endDate = week[week.length - 1].day

        for (const weekday of week) {
            totalDownloads += weekday.downloads;
        }

        weeklyDownloads.push({
            downloads: totalDownloads,
            week: `${startDate} - ${endDate}`,
        });
    }

    return weeklyDownloads;
}

module.exports = {
    formatDate,
    formatMonth,
    getMaxDownloads,
    getDownloadsPerMonth,
    getTotalDownloads,
    getDownloadsPerWeek,
}