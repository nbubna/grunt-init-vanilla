/*
 * {%= title || name %}
 * {%= homepage %}
 *
 * Copyright (c) {%= grunt.template.today('yyyy') %} {%= author_name %}
 * Licensed under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.
 */

(function() {

    // internal API
    var _ = {
        version: "<%= pkg.version %>",
        internal: 'property'
    };

    // external API
    var {%= exports %} = {
        _: _,// comment to hide internal API
        external: function() {
            return '{%= name %} v'+_.version;
        }
    };

    // export {%= exports %}
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {%= exports %};
    } else {
        this.{%= exports %} = {%= exports %};
    }

}());
