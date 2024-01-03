# npm-Stats-info

This is an npm package to interact with the npm api and npm registry. You can search for npm packages, get details, statistics or downlaod counts of any npm package.

If you have trouble with this package, feel free to ask me in my [Discord](https://discord.com/invite/Cc76tYwXvy).

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
    - [Package details](#package-details)
    - [Package downloads](#package-downloads)
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
```js
let package = await npmStats.packageInfo("example-package");
console.log(package)
```

### Package downloads
```js
let downloads = await npmStats.packageDownloads("example-package");
console.log(downloads)
```

### Find packages
```js
// Search for "electron",
// Maximum of 20 results,
// Page 5 (4 * 20 results get skipped)
let result = await npmStats.searchPackages("electron", 20, 4 * 20);

console.log(result)// Output the result
```

### LICENSE

[GNU General Public License v3.0](https://github.com/KartoffelChipss/npm-stats-info/blob/main/LICENSE)

### Changelog

You can find the Changelog in [CHANGELOG.md](CHANGELOG.md).