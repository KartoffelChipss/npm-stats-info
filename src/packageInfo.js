/**
 * Get detailed information about a package
 * @param {string} package - the name of the package (required)
 * @returns {Promise<PackageInfo>}
 * 
 * @example
 * let package = await npmStats.packageInfo("splatoon3api");
 * console.log(package)
 */
async function packageInfo(package) {
    if (package === undefined || package === null) package = "";

    const response = await fetch(`https://registry.npmjs.org/${package}`);
    const data = await response.json();
    return data;
}

module.exports =  packageInfo;