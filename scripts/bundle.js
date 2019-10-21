"use strict";
module.exports = bundle;

var fs         = require("fs"),
    path       = require("path");

var browserify = require("browserify");

var header     = require("gulp-header");
var gulpif     = require("gulp-if");
var sourcemaps = require("gulp-sourcemaps");
var uglify     = require("gulp-uglify");

var buffer     = require("vinyl-buffer");
var vinylfs    = require("vinyl-fs");
var source     = require("vinyl-source-stream");

var pkg = require(path.join(__dirname, "..", "package.json"));

/*eslint-disable no-template-curly-in-string*/
var license = [
    "/*!",
    " * jsproto v${version} (c) 2019",
    " * compiled ${date}",
    " * licensed under the MIT license",
    " * see: https://github.com/jamiees2/jsproto for details",
    " * This build contains protobuf.js, which is",
    " * licensed under the BSD 3-clause license",
    " * see: https://github.com/protobufjs/protobuf.js for details",
    " */"
].join("\n") + "\n";
/*eslint-enable no-template-curly-in-string*/

var prelude = fs.readFileSync(require.resolve("../lib/prelude.js")).toString("utf8");

/**
 * Bundles the library.
 * @param {Object} options Bundler options
 * @param {string} options.entry Entry file
 * @param {string} options.target Target directory
 * @param {boolean} [options.compress=false] Whether to minify or not
 * @param {string[]} [options.exclude] Excluded source files
 * @returns {undefined}
 */
function bundle(options) {
    if (!options || !options.entry || !options.target)
        throw TypeError("missing options");
    var bundler = browserify({
        entries: options.entry,
        insertGlobalVars: false,
        detectGlobals: false,
        debug: true,
        node: true,
        builtins: false,
        prelude: prelude,
        preludePath: "./lib/prelude.js"
    });
    if (options.exclude)
        options.exclude.forEach(bundler.exclude, bundler);
    return bundler
    .plugin(require("browserify-wrap"), {
        // undefined var and global strict-mode for uglify
        prefix: "(function(undefined){\"use strict\";",
        suffix: "})();"
    })
    .plugin(require("bundle-collapser/plugin"))
    .bundle()
    .pipe(source(options.compress ? "jsproto.min.js" : "jsproto.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(
                gulpif(options.compress, uglify({
                    mangle: {
                        eval: true,
                        properties: {
                            regex: /^_/
                        }
                    },
                    compress: {
                        keep_fargs: false,
                        unsafe: true
                    },
                    output: {
                        max_line_len: 0x7fffffff
                    }
                }))
            )
            .pipe(header(license, {
                date: (new Date()).toUTCString().replace("GMT", "UTC").toLowerCase(),
                version: pkg.version
            }))
    .pipe(sourcemaps.write(".", { sourceRoot: "" }))
    .pipe(vinylfs.dest(options.target))
    .on("log", console.log)
    .on("error", console.error);
}
