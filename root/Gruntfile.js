'use strict';

/**
 * GRUNT TASK REFERENCE
 * ====================
 *  grunt
 *    purges bin and recompiles all viw files in pug and sty
 *  grunt clean
 *    purges all files in bin/css and bin/html
 *  grunt watch
 *    WARNING, add new files wont work, restart watch on new files
 *  grunt watch:pugviews
 *    compiles changed pug files in src/pug/viw to bin/html
 *  grunt watch:styviews
 *    compiles changed styl files in src/sty/viw to bin/css
 *  grunt pug
 *  grunt pug:all
 *    compiles all files in src/pug/viw to bin/html
 *  grunt stylus
 *  grunt stylus:all
 *    compiles all files in src/sty/viw to bin/css
 */
module.exports = function(grunt) {
  grunt.initConfig({
    clean: {contents:['bin/html/*', 'bin/css/*', 'bin/js/*']},
    watch: {
      pugviews: {
        files: 'src/pug/viw/**/*.pug',
        tasks: ['pug:wtc'],
        options: {spawn:false}
      },
      styviews: {
        files: 'src/sty/viw/**/*.styl',
        tasks: ['stylus:wtc'],
        options: {spawn: false}
      },
      jsviews: {
        files: 'src/js/frn/**/*.js',
        tasks: ['browserify:wtc'],
        options: {spawn: false}
      }
    },
    pug: {
      wtc:{files:[]},
      all:{files: [fObj('src/pug/viw', 'pug', 'bin/html', 'html')]}
    },
    stylus: {
      wtc:{file:[]},
      all: {files: [fObj('src/sty/viw', 'styl', 'bin/css', 'css')]}
    },
    browserify: {
      wtc:{files:[]},
      all: {files: [fObj('src/js/frn', 'js', 'bin/js', 'js')]}  
    }
  });
  grunt.registerTask('default',
  ['clean', 'pug:all', 'stylus:all', 'browserify:all', 'watch']);
  
  grunt.event.on('watch', function(action, filepath) {
    var trig = -1;
    for(var i = 0; i < sextreg.length; i++) {
      if(filepath.match(sextreg[i])) trig = i;
    }
    // determine trigger extension cause
    if(trig != -1) {
      var dst = filepath.replace(sextreg[trig], dextst[trig]);
      dst = dst.replace(sptreg[trig], dptst[trig]);
      // generate destination filepath
      grunt.config.set(vname[trig], [{src: filepath, dest: dst}]);
      // inject src/dest pair for rendering into configuration var
      grunt.log.writeln(
          "Autorender " +
          "\nFrom: " + filepath +
          "\nTo  : " + dst);
      // log output
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');
};

/** source extension regexp */
const sextreg = [/.pug$/, /.styl$/, /.js$/];
/** destination extension string */
const dextst = ['.html', '.css', '.js'];
/** source path regexp */
const sptreg = [/^src\/pug\/viw/, /^src\/sty\/viw/, /^src\/js\/frn/];
/** destination path string */
const dptst = ['bin/html', 'bin/css', 'bin/js'];
/** configuration variable name */
const vname = ['pug.wtc.files', 'stylus.wtc.files', 'browserify.wtc.files'];

/** method that generates configuration variables for full render */
function fObj(srcp, srce, desp, dese) {
  return {
    expand: true,
    cwd: srcp,
    src: ['**/*.' + srce],
    dest: desp + "/",
    ext: "." + dese,
    extDot: "first"
  }
}

