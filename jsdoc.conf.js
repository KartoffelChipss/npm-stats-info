module.exports = {
    sourceType: "module",
    source: {
        include: ["package.json", "README.md", "src", "src/*", "LICENSE", "CHANGELOG.md"],
        includePattern: ".js$",
        excludePattern: "(node_modules/|docs)",
    },
    opts: {
        destination: "./docs",
        encoding: "utf8",
        readme: "./README.md",
        recurse: true,
        verbose: true,
        template: "node_modules/clean-jsdoc-theme",
        theme_opts: {
            default_theme: "dark"
        }
    },
    plugins: [
        "plugins/markdown"
    ],
    markdown: {
        hardwrap: false,
        idInHeadings: true
    }
};
