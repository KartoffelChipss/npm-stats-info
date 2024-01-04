# npm-Stats-info

This is an npm package to interact with the npm api and npm registry. You can search for npm packages, get details, statistics or downlaod counts of any npm package.

[![npm-downloads](https://img.shields.io/npm/dm/npm-stats-info)](https://www.npmjs.com/package/npm-stats-info) [![NPM-Version](https://img.shields.io/npm/v/npm-stats-info?label=Version)](https://www.npmjs.com/package/npm-stats-info) [![Discord](https://img.shields.io/discord/990295419005333554?color=%23738ADB&label=Discord)](https://strassburger.org/discord)

If you have trouble with this package, feel free to ask me in my [Discord](https://discord.com/invite/Cc76tYwXvy).

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
    - [Package details](#package-details)
    - [Package downloads](#package-downloads)
    - [All downloads](#all-downloads)
    - [Find packages](#find-packages)
- [License](#license)
- [Changelog](#changelog)

### Installation

Simply execute the following command in your commandline:

```
npm install npm-stats-info
```

### Usage

First, import the package like this:s

```js
const npmStats = require("npm-stats-info");
```

### Package details

To get details about a certain package, you can use the following function:

```js
let package = await npmStats.packageInfo("example-package");
console.log(package)
```

### Package downloads

To get download statistics for a certain package, you can use the following function:

```js
// Get download statistics for "example-package"
let downloads = await npmStats.packageDownloads("example-package");
console.log(downloads)

// Get download statistics for "example-package" from 2023-12-01 until 2022-12-01 (Default is now to one year ago)
// !!! When using a custom time span, "yesterday", "thisMonth" and "lastMonth" might be undefined!
let downloads = await npmStats.packageDownloads("splatoon3api", "2023-12-01", "2022-12-01")
console.log(downloads)
```

### All downloads

To get download statistics for all packages together on npm, you can use the following function:

```js
let downloads = await npmStats.allDownloads();
console.log(downloads)
```

### Find packages

To find packages by a string, you can use the following function.

Special search qualifiers can be provided in the full-text query:

- `author:bcoe`: Show/filter results in which bcoe is the author
- `maintainer:bcoe`: Show/filter results in which bcoe is qualifier as a maintainer
- `keywords:batman`: Show/filter results that have batman in the keywords
    - separating multiple keywords with
        - `,` acts like a logical OR
        - `+` acts like a logical AND
        - `,-` can be used to exclude keywords
- `not:unstable`: Exclude packages whose version is < 1.0.0
- `not:insecure`: Exclude packages that are insecure or have vulnerable dependencies (based on the nsp registry)
- `is:unstable`: Show/filter packages whose version is < 1.0.0
- `is:insecure`: Show/filter packages that are insecure or have vulnerable dependencies (based on the nsp registry)
- `boost-exact:false`: Do not boost exact matches, defaults to true

```js
// Search for "electron",
// Maximum of 20 results,
// Page 5 (4 * 20 results get skipped)
let result = await npmStats.searchPackage("electron", 20, 4 * 20);
console.log(result)// Output the result

// Search for packages by "kartoffelchips", that has the keywords "splatoon" and "splatoon3"
let myPackages = await npmStats.searchPackage("author:kartoffelchips keywords:splatoon+splatoon3");
console.log(myPackages)// Output the result
```

### LICENSE

[GNU General Public License v3.0](LICENSE)

### Changelog

You can find the Changelog in [CHANGELOG.md](CHANGELOG.md).