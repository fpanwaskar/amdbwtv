AMDBW.TV
=========

The initial goal of the project was to look at using marionettejs with ES6 evaluating whether it was worth the effort of moving away from an in-house developed framework built on top of backbonejs to Marionette for a project worked on at the time.  This is now a living project, a playground to evaluate libs and methods on a working application.

The following [starter project](https://github.com/abiee/es6-marionette.git) was used for the initial structure.

Uses the The Movie DB api which is well documented [here](https://www.themoviedb.org/documentation/api)

Lessons learned so far..
--------------------------

- Movejs (animation lib) has a nice syntax and easy to use.  Probably a good option for small projects and opt for velocity.js in other instances.  

- Marionettejs has moved on a lot since the version I used in 2012.  Documentation is good and its fairly easy to pick up and use.

- Browserify doesn't feel as easy to pick and use as webpack.  An example was trying to get css modules to be referenced from the code.  I could not get this working with postcss in the mix.

- Backbone.Radio if used carefully can be useful even as a standalone lib.  May be useful for legacy projects to decouple modules and components.

- Backbone and ES6 Classes [not a great mix](http://benmccormick.org/2015/04/07/es6-classes-and-backbone-js/)

What's inside
----------------
Batteries included:
 - Gulp
 - Browserify
 - Babelify
 - Bootstrap
 - jQuery
 - Underscore
 - Backbone
 - Marionette
 - Handlebars
 - BrowserSync
 - Karma
 - Mocha, Chai, Sinon (moved to jasmine)

Includes Marionette shim for Marionette.Radio instead Wreqr. See: [Deprecation notes](http://marionettejs.com/docs/v2.3.1/marionette.application.html#the-application-channel) and [Backbone.Radio documentation](https://github.com/marionettejs/backbone.radio#using-with-marionette).

Setup
-----
Install the dependencies.

    $ cd my-project
    $ npm install
    $ gulp serve

Do not forget to install globally gulp if not installed yet.

Build
------
If you want to build the project run.

    $ gulp build

It will compile the project and put the result under `dist` directory. You can run the compiled project also.

    $ gulp serve:dist

Testing
---------
Two options exists to run tests, the first one is for development process and aims to practice Test Driven Development.

    $ gulp tdd

It will open a Google Chrome instance and run all tests on it, when a file is updated tests will be run again. You can see the rests as a notification or in the console.
The other option to run tests is for Continuous Integration purposes, it will run all the tests against PanthomJS and output a jUnit format file for analysis.
    
    $ gulp test

You can get the results at `.tmp/test-results.xml`.

Licence
-------
Licensed under the MIT license.
