import gulp from 'gulp'
import packageFiles from 'package-files'
import concat from 'gulp-concat'
import uglify from 'gulp-uglify'

gulp.task('vendorJS', vendorJSTask)

function vendorJSTask() {
  const devDependencies = [
    'mn-gh-page',
    'mn-button',
  ]

  const dependencies = packageFiles(devDependencies)
    .filter(dep => dep.endsWith('.js'))
    .map(item =>
      item.includes('document-register-element')
        ? item.replace('.node.js', '.js')
        : item
    )
    .map(item =>
      item.includes('/angular/')
        ? item.replace('index.js', 'angular.js')
        : item
    )

  return gulp
    .src(dependencies)
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./docs'))
}
