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
          '_js/vendor/fastclick.js',
          '_js/faq.js',
          '_js/session-submitted.js',
          '_js/credits.js'
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

    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          cwd: 'img',
          src: ['**/*.png', '**/*.jpg'],
          dest: 'img-min/'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'img',
          src: '**/*.svg',
          dest: 'img-min'
        }]
      }
    },

    watch: {
      options: {
        livereload: 9005
      },
      css: {
        files: ['sass/{,**/}*.scss'],
        tasks: ['compass:dev', 'jekyll:dev']
      },
      js: {
        files: ['js/{,**/}*.js'],
        tasks: ['jshint', 'uglify', 'jekyll:dev']
      },
      jekyll: {
				files: ['{,**/}*.html', '_posts/*.md', '!_site/{,**/}*.html'],
				tasks: ['jekyll:dev']
			}
    },

    compass: {
      options: {
        config: 'config.rb',
        bundleExec: true
      },
      dev: {
        options: {
          environment: 'development'
        }
      },
      dist: {
        options: {
          environment: 'production',
          imagesDir: 'img-min',
          force: true
        }
      }
    },

    parallel: {
      assets: {
        grunt: true,
        tasks: ['imagemin', 'svgmin', 'uglify']
      },
      server: {
        grunt: true,
        tasks: ['jekyll:devserver', 'watch']
      }
    },

    jekyll: {
      server : {
				server : true,
				server_port : 4000,
				bundleExec: true
			},
			devserver : {
				server : true,
				server_port : 4000,
				bundleExec: true,
				config: '_config_dev.yml'
			},
			dev: {
				bundleExec: true,
				config: '_config_dev.yml'
			},
			prod: {
				bundleExec: true
			}
		}
  });

  // Load Plugins.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-parallel');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-jekyll');

  // Our custom tasks.
  grunt.registerTask('server', ['debug', 'parallel:server']);
  grunt.registerTask('debug', ['clean', 'jshint:dev', 'concat']);
  grunt.registerTask('release', ['clean', 'jshint:prod', 'concat', 'parallel:assets', 'compass:dist', 'jekyll:prod']);

  // Default task that is run when no arguments are passed.
  grunt.registerTask('default', ['release']);
};
