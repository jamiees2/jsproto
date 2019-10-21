var gulp   = require("gulp"),
    bundle = require("./bundle");

function defineTask(name, entry, target) {
    gulp.task(name + "-bundle", bundle.bind(this, {
        entry    : entry,
        target   : target
    }));
    gulp.task(name + "-minify", bundle.bind(this, {
        entry    : entry,
        target   : target,
        compress : true
    }));
    gulp.task(name, gulp.series(
        name + "-bundle",
        name + "-minify"
    ), function(done) { done(); });
}

defineTask("serialization", "../src/index", "../dist");

gulp.task("default", gulp.parallel(
    "serialization"
, function(done) { done(); }));

