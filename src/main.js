const types = require("./types.js");

const search = require("./searchFunctions");
const packageInfo = require("./packageInfo.js")
const packageDownloads = require("./packageDownlaods.js");
const allDownloads = require("./allDownloads.js")

module.exports = {
    search,
    packageInfo,
    packageDownloads,
    allDownloads
};