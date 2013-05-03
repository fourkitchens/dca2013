/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    clean: ['js/dist/'],

    jshint: {
      options: {
        scripturl: true
      },
      prod: {
        files: {
          src: ['Gruntfile.js', '_js/*.js']
        }
      },
      dev: {
        options: {
          debug: true
        },
        files: {
          src: ['Gruntfile.js', '_js/*.js']
        }
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      modernizr: {
        src: [
          '_js/vendor/modernizr.min.js'
        ],
        dest: 'js/dist/modernizr.min.js'
      },
      main: {
        src: [
          '_js/vendor/jquery.min.js',
          '_js/vendor/responsive-nav.min.js',
          '_js/faq.js',
          '_js/session-submitted.js'
        ],
        dest: 'js/dist/main_debug.js'
      },
      schedule_debug: {
        src: [
          '_js/vendor/handlebars.js',
          '_js/vendor/ember.js',
          '_js/schedule.js'
        ],
        dest: 'js/dist/schedule_debug.js'
      },
      schedule_release: {
        src: [
          '_js/vendor/handlebars.js',
          '_js/vendor/ember.min.js',
          '_js/schedule.js'
        ],
        dest: 'js/dist/schedule_release.js'
      }
    },

    uglify: {
      schedule: {
        files: {
          'js/dist/schedule_release.min.js': ['js/dist/schedule_release.js'],
          'js/dist/main_release.min.js': ['js/dist/main_debug.js']
        }
      }
    },

    watch: {
      js: {
        files: ['_js/*.js'],
        tasks: ['debug']
      }
    }
  });

  // Load Plugins.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Our custom tasks.
  grunt.registerTask('debug', ['clean', 'jshint:dev', 'concat']);
  grunt.registerTask('release', ['debug', 'jshint:prod', 'uglify']);

  // Default task that is run when no arguments are passed.
  grunt.registerTask('default', ['release']);
};
