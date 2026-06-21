const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const path = require('path');
const fs = require('fs');
const htmlmin = require('gulp-htmlmin');

// Process all HTML files except partials
gulp.task('html', function () {
    return gulp.src(['src/**/*.html', '!src/partials/**'])
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@root'
        }))
        .pipe(gulp.dest('build/'));
});
gulp.task('assets', function () {
    return gulp.src([
        'public/assets/**/*',       // include everything
        '!public/assets/scss/**'    // exclude the scss folder and all its contents
    ], {encoding: false})  // all files recursively
        .pipe(gulp.dest('build/assets'));    // output folder
});
// Default task
gulp.task('generate-config', function (done) {
    const buildDir = path.resolve(__dirname, 'build');
    const routes = [];

    function walk(dir) {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const filePath = path.join(dir, file);
            const stats = fs.statSync(filePath);

            if (stats.isDirectory()) {
                walk(filePath);
            } else if (file.endsWith('.html')) {
                const relPath = path.relative(buildDir, filePath).replace(/\\/g, '/');
                const route = '/' + relPath.replace(/index\.html$/, '')  // index.html → /
                    .replace(/\.html$/, '');       // remove .html
                routes.push(route);
            }
        });
    }

    walk(buildDir);

    const config = {
        navigationFallback: {
            rewrite: '/index.html'
        },
        routes: routes.map(route => ({
            route,
            rewrite: route.endsWith('/') ? route + 'index.html' : route + '.html'
        }))
    };

    fs.writeFileSync(
        path.join(buildDir, 'staticwebapp.config.json'),
        JSON.stringify(config, null, 2),
        'utf-8'
    );

    console.log('✅ staticwebapp.config.json generated!');
    done();
});
gulp.task('minify-html', function () {
    return gulp.src('build/**/*.html')   // take the built HTML
        .pipe(htmlmin({
            collapseWhitespace: true,   // remove extra spaces/newlines
            removeComments: true,       // strip out comments
            minifyJS: true,             // minify inline JS
            minifyCSS: true             // minify inline CSS
        }))
        .pipe(gulp.dest('build'));    // overwrite in place
});

gulp.task('default', gulp.series('html', 'assets', 'generate-config', 'minify-html'));
