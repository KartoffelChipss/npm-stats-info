const npmStats = require("../src/main.js");

const x = async () => {
    console.log(npmStats)
    // Search for "electron",
    // Maximum of 20 results,
    // Page 5 (4 * 20 results get skipped)
    // let result = await npmStats.search.searchByText("electron", 20);
    // console.log(result); // Output the result

    let package = await npmStats.packageDownloads("splatoon3api");
    console.log(package);
};

x();