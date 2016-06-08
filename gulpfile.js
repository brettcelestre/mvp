
var gulp = require('gulp')
    nodemon   = require('gulp-nodemon'),
    bs        = require('browser-sync'),
    reload    = bs.reload,
    when      = require('gulp-if'),
    shell     = require('gulp-shell');

// the paths to our app files
var paths = {
  scripts: ['public/js/*.js'],
  html: ['public/views/*.html'],
  styles: ['public/css/*.css']
};

// any changes made to your
// client side code will automagically refresh your page
// with the new changes
gulp.task('start', ['serve'],function () {
  bs({
    notify: true,
    // address for server,
    injectChanges: true,
    files: paths.scripts.concat(paths.html, paths.styles),
    proxy: 'localhost:3333'
  });
});

// gulp.task('hello', function(){
//   console.log('hello from inside gulpfile.js');
// });

gulp.task('karma', shell.task([
  'karma start'
]));

// start our node server using nodemon
gulp.task('serve', function() {
  nodemon({script: './server.js', ignore: 'node_modules/**/*.js'});
});

gulp.task('default', ['start']);


