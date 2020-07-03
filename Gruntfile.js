module.exports = function(grunt) {

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    connect: {
      server: {
        options: {
          port: 1919,
          base: 'demo_docs/build',
          livereload: true,
          open: true
        }
      }
    },

    stylelint: {
      dev: {
        options: {
          failOnError: false
        },
        src: ['sass/**/*.scss']
      },

      build: ['sass/**/*.scss']
    },

    copy: {
      all: {
        files: [{
          expand: true,
          cwd: 'node_modules/bootstrap-italia/src/icons/font',
          src: ['**'],
          dest: 'guide_italia_theme/static/font'
        },
        {
          expand: true,
          cwd: 'node_modules/bootstrap-italia/src/icons/css',
          src: 'italia-icon-font.css',
          dest: 'guide_italia_theme/static/css'
        }],
      },
    },

    sass: {
      all: {
        options: {
          style: 'expanded',
          loadPath: ['node_modules', '.']
        },
        files: [{
          expand: true,
          cwd: 'sass',
          src: ['*.scss'],
          dest: 'guide_italia_theme/static/css',
          ext: '.css'
        }]
      }
    },

    concat: {
      all: {
        src: ['guide_italia_theme/static/css/theme.css', 'guide_italia_theme/static/css/italia-icon-font.css'],
        dest: 'guide_italia_theme/static/css/theme.css'
      },
    },

    postcss: {
      dev: {
        options: {
          map: {
              inline: false,
              annotation: 'guide_italia_theme/static/css'
          },
          processors: [
            require('pixrem')(),
            require('autoprefixer')({browsers: 'last 2 versions'})
          ]
        },
        files: [{
          src: 'guide_italia_theme/static/css/theme.css',
          dest: 'guide_italia_theme/static/css/theme.css'
        }]
      },

      build: {
        options: {
          map: false,
          processors: [
            require('pixrem')(),
            require('autoprefixer')({browsers: 'last 2 versions'}),
            require('cssnano')()
          ]
        },
        files: [{
          src: 'guide_italia_theme/static/css/theme.css',
          dest: 'guide_italia_theme/static/css/theme.css'
        }]
      }
    },

    modernizr: {	
      all: {	
        'crawl': false,	
        'customTests': [],	
        'dest': 'js/modernizr.min.js',	
        'tests': [	
          'touchevents'	
        ],	
        'options': [	
          'setClasses'	
        ],	
        'uglify' : true	
      }	
    },

    browserify: {
      build: {
        options: {
          alias: {
            'bootstrap-italia': './node_modules/bootstrap-italia/dist/js/bootstrap-italia.min.js',
            'modernizr': './js/modernizr.min.js'
          }
        },
        src: ['js/index.js'],
        dest: 'guide_italia_theme/static/js/theme.js',
      },

      dev: {
        options: {
          alias: {
            'bootstrap-italia': './node_modules/bootstrap-italia/dist/js/bootstrap-italia.min.js',
            'modernizr': './js/modernizr.min.js'
          },
          browserifyOptions: {
            debug: true
          }
        },
        src: ['js/index.js'],
        dest: 'guide_italia_theme/static/js/theme.js',
      }
    },

    uglify: {
      options: {
        mangle: false
      },
      all: {
        files: {
          'guide_italia_theme/static/js/theme.js': ['guide_italia_theme/static/js/theme.js']
        }
      }
    },

    cacheBust: {
      all: {
        options: {
          baseDir: 'guide_italia_theme/',
          assets: [
            'static/css/*.css',
            'static/js/*.js'
          ],
          deleteOriginals: true
        },
        files: [{
          expand: true,
          cwd: 'guide_italia_theme/layouts/',
          src: ['head.html', 'scripts.html']
        }]
      }
    },

    exec: {
      build_sphinx: {
        cmd: 'sphinx-build demo_docs/source demo_docs/build'
      }
    },

    clean: {
      build: ['demo_docs/build'],
      css: ['guide_italia_theme/static/css/italia-icon-font.css', 'guide_italia_theme/static/css/*.map']
    },

    watch: {
      /* Watch scss files */
      scss: {
        files: [
          'sass/**/*.scss'
        ],
        tasks: ['stylelint:dev', 'copy', 'sass', 'concat', 'clean:css', 'postcss:dev']
      },
      /* Changes in theme dir rebuild sphinx */
      sphinx: {
        files: ['guide_italia_theme/**/*', 'demo_docs/**/*.rst', 'demo_docs/**/*.py'],
        tasks: ['clean:build', 'exec:build_sphinx']
      },
      /* JavaScript */
      browserify: {
        files: ['js/*.js'],
        tasks: ['browserify:dev']
      },
      /* live-reload the demo_docs if sphinx re-builds */
      livereload: {
        files: ['demo_docs/build/**/*'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.registerTask('default', [
    'clean:build',
    'stylelint:dev',
    'copy',
    'sass',
    'concat',
    'clean:css',
    'postcss:dev',
    'modernizr',
    'browserify:dev',
    'exec:build_sphinx',
    'connect',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean:build',
    'stylelint:build',
    'copy',
    'sass',
    'concat',
    'clean:css',
    'postcss:build',
    'modernizr',
    'browserify:build',
    'uglify',
    'exec:build_sphinx'
  ]);

  grunt.registerTask('release', [
    'clean:build',
    'stylelint:build',
    'copy',
    'sass',
    'concat',
    'clean:css',
    'postcss:build',
    'modernizr',
    'browserify:build',
    'uglify',
    'cacheBust',
    'exec:build_sphinx'
  ]);
}
