(function prelude(modules, cache, entries) {

    // This is the prelude used to bundle jsproto for the browser. Wraps up the CommonJS
    // sources through a conflict-free require shim and is again wrapped within an iife that
    // provides a minification-friendly `undefined` var plus a global "use strict" directive
    // so that minification can remove the directives of each module.

    function $require(name) {
        var $module = cache[name];
        if (!$module)
            modules[name][0].call($module = cache[name] = { exports: {} }, $require, $module, $module.exports);
        return $module.exports;
    }

    var protojs = $require(entries[0]);

    // Be nice to AMD
    if (typeof define === "function" && define.amd)
        define("jsproto", [], function() {
            return protojs;
        });

    // Be nice to CommonJS
    if (typeof module === "object" && module && module.exports)
        module.exports = protojs;

})/* end of prelude */