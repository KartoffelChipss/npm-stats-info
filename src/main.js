const types = require("./types.js");

const searchPackage = require("./functions/searchPackage.js");
const packageInfo = require("./functions/packageInfo.js")
const packageDownloads = require("./functions/packageDownlaods.js");
const allDownloads = require("./functions/allDownloads.js")

module.exports = {
    searchPackage,
    packageInfo,
    packageDownloads,
    allDownloads
};