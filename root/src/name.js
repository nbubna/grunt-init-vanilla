/*
 * {%= name %}
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
    var {%= root %} = {
        _: _,// comment to hide internal API
        external: function(){
            console.log('You used "{%= name %} v'+_.version+'"!');
        }
    }

    // export {%= root %}
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {%= root %};
    } else {
        this.{%= root %} = {%= root %};
    }

}());
