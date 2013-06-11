/*
 * grunt-init-vanilla
 *
 * Copyright (c) 2013 ESHA Research
 * Licensed under the MIT license.
 */
// Basic template description.
exports.description = 'Create a "vanilla" JavaScript library, including QUnit unit tests.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '_Project name_ should not contain "js".' +
  '_Project title_ should be a human-readable title.' +
  'For example, a library titled "Nice Library" might have the name "nice-lib".';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install project dependencies with _npm ' +
  'install_. After that, you may execute project tasks with _grunt_. For ' +
  'more information about installing and configuring Grunt, please see ' +
  'the Getting Started guide:' +
  '\n\n' +
  'http://gruntjs.com/getting-started';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({type: 'vanilla'}, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('title', 'My Library'),
    init.prompt('description', 'The best JavaScript library ever.'),
    init.prompt('version'),
    init.prompt('repository'),
    init.prompt('homepage'),
    init.prompt('bugs'),
    init.prompt('licenses', 'MIT GPL'),
    init.prompt('author_name'),
    init.prompt('author_email'),
    init.prompt('author_url')
  ], function(err, props) {
    // A few additional properties.
    props.dependencies {};
    props.keywords = [];
    props.root = props.name.replace(/\W(\w)?/g, function(m, w) {
      return w ? w.toUpperCase() : '';
    });

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props, {noProcess: 'libs/**'});

    // Generate package.json file, used by npm and grunt.
    init.writePackageJSON('package.json', {
      name: props.name,
      version: props.version,
      npm_test: 'grunt qunit',
      // TODO: pull from grunt's package.json
      node_version: '>= 0.8.0'
      devDependencies: {
        'grunt-contrib-jshint': '~0.1.1',
        'grunt-contrib-qunit': '~0.1.1',
        'grunt-contrib-concat': '~0.1.2',
        'grunt-contrib-uglify': '~0.1.1',
        'grunt-contrib-watch': '~0.2.0',
        'grunt-contrib-clean': '~0.4.0',
      },
    });

    // Generate package.json file.
    init.writePackageJSON('package.json', props);

    // All done!
    done();
  });

};
