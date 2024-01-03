/**
 * @typedef {Object} Author
 * @property {string} name - The name of the author
 * @property {string} [username] - The username of the author
 * @property {string} [email] - The email of the author
 * @property {string} [url] - A url for a web page with more information about the author
 */

/**
 * @typedef {Object} Publisher
 * @property {string} username - The name of the publisher
 * @property {string} email - The email of the publisher
 */

/**
 * @typedef {Object} Maintainer
 * @property {string} username - The name of the publisher
 * @property {string} email - The email of the publisher
 */

/**
 * @typedef {Object} Contributor
 * @property {string} name - The name of the publisher
 * @property {string} email - The email of the publisher
 */

/**
 * @typedef {Object} NpmUser
 * @property {string} name - The name of the publisher
 * @property {string} email - The email of the publisher
 */

/**
 * @typedef {Object} PackageLinks
 * @property {string} npm - Link to the npm page
 * @property {string} [homepage] - Link to the homepage of the Package
 * @property {string} [repository] - Link to the package repository
 * @property {string} [bugs] - Link to a page, where you can report bugs
 */

/**
 * @typedef {Object} SearchedPackage
 * @property {string} name - The name of the package
 * @property {string} scope
 * @property {string} version - The latest version
 * @property {string} description - The description of the package
 * @property {string[]} keywords - The keywords, that describe this package
 * @property {string} date - The date, the package was created
 * @property {PackageLinks} links - Links for the package
 * @property {Author} author - The description o fthe package
 * @property {string} publisher - The description o fthe package
 * @property {Maintainer[]} maintainers - The description o fthe package
 */

/**
 * @typedef {Object} Flags
 * @property {number} insecure - The value for the "insecure" flag.
 */

/**
 * @typedef {Object} Score
 * @property {number} final - final score
 * @property {ScoreDetails} detail
 * @property {number} searchScore
 */

/**
 * @typedef {Object} ScoreDetails
 * @property {number} quality - quality score
 * @property {number} popularity - popularity score
 * @property {number} maintenance - maintenance score
 */

/**
 * @typedef {Object} SearchResult
 * @property {SearchedPackage[]} objects - The name of the power
 * @property {Flags} flags - The URL for the icon of the power
 * @property {Score} score
 */

/**
 * @typedef {Object} Bugs
 * @property {string} url - Link to a page, where you can report bugs
 */

/**
 * @typedef {Object} Repository
 * @property {string} type - Repository type
 * @property {string} url - Link to the repository
 */

/**
 * @typedef {Object} DistTags
 * @property {string} latest - Latest version
 * @property {string} [next] - Next version
 */

/**
 * @typedef {Object} PackageTime
 * @property {string} created
 * @property {string} [modified]
 */

/**
 * @typedef {Object} PackageDistSignature
 * @property {string} keyid
 * @property {string} sig
 */

/**
 * @typedef {Object} PackageDist
 * @property {string} shasum
 * @property {string} tarball
 * @property {string} integrity
 * @property {PackageDistSignature[]} signatures
 * @property {number} [fileCount]
 * @property {number} [unpackedSize]
 * @property {string} [npm-signature]
 */

/**
 * @typedef {Object} PackageVersion
 * @property {string} name - Package name
 * @property {string} version - Version number
 * @property {string} description
 * @property {string} main - Main file
 * @property {Object} [scripts]
 * @property {Author} author
 * @property {string} license
 * @property {Object} [dependencies]
 * @property {Object} [devDependencies]
 * @property {string[]} keywords
 * @property {Contributor[]} contributors
 * @property {Repository} repository
 * @property {Object} [bin]
 * @property {Object} [engines]
 * @property {Object} [deprecated] - Deprecation message if deprecated
 * @property {NpmUser} _npmUser
 * @property {string} _id
 * @property {string} _npmVersion
 * @property {string} _nodeVersion
 * @property {Maintainer[]} maintainers
 * @property {Object} directories
 * @property {PackageDist} [engines]
 * @property {Object} dist
 */

/**
 * @typedef {Object} PackageInfo
 * @property {string} name - The name of the package
 * @property {DistTags} dist-tags - dist tags
 * @property {Object.<string, PackageVersion>} versions - A list of all package versions
 * @property {PackageTime} time - An object mapping versions to the time published, along with created and modified timestamps
 * @property {Maintainer[]} maintainers - The maintainers of the package
 * @property {string} description - The description of the package
 * @property {Author} author - The author of the package
 * @property {string} license - The package license
 * @property {string} readme
 * @property {string} readmeFilename
 * @property {string} homepage - The homepage of the package
 * @property {Repository} repository
 * @property {Bugs} bugs
 * @property {string[]} keywords - The keywords, that describe this package
 */


/**
 * @typedef {Object} DownloadsDay
 * @property {string} date - The date as string (e.g. "2023-12-24")
 * @property {number} downloads - Donwloads on that day
 */

/**
 * @typedef {Object} DownloadsMonth
 * @property {string} month - Month as string (e.g. "2023-12")
 * @property {number} downloads - Donwloads in that month
 */

/**
 * @typedef {Object} PackageDownloads
 * @property {DownloadsDay} today
 * @property {DownloadsDay} yesterday
 * @property {DownloadsDay} maxDownloadsDay
 * @property {DownloadsDay[]} dailyDownloads
 * @property {DownloadsMonth} thisMonth
 * @property {DownloadsMonth} lastMonth
 * @property {DownloadsMonth} maxDownloadsMonth
 * @property {DownloadsMonth[]} monthlyDownloads
 */