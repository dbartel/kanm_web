var gulp = require("gulp"),
useref = require("gulp-useref"),
uglify = require("gulp-uglify"),
gulpif = require("gulp-if"),
minifyCss = require("gulp-minify-css"),
eventStream = require("event-stream"),
concat = require("gulp-concat"),
ngAnnotate = require("gulp-ng-annotate"),
order = require("gulp-order"),
templateCache = require("gulp-angular-templatecache"),
minifyHTML = require('gulp-minify-html'),
sass = require("gulp-sass"),
eslint = require("gulp-eslint"),
KarmaServer = require("karma").Server;

/* Build tasks
   Minify javascript/css files, copy to dist folder
   */

gulp.task("munge-html", function() {
    var assets = useref.assets({
    	searchPath: "./src/"
    });
    return gulp.src("src/static/index.html")
		.pipe(assets)
		.pipe(gulpif("*.css", minifyCss()))
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulp.dest("dist/static"));
});

gulp.task("copy-files", function() {
	gulp.src("src/index.php")
		.pipe(gulp.dest("dist"));

	gulp.src("src/api/**/*")
		.pipe(gulp.dest("dist/api"));

	gulp.src("src/_assets/**/*")
		.pipe(gulp.dest("dist/_assets"));


	gulp.src("src/static/components/bootstrap-css-only/fonts/**/*")
		.pipe(gulp.dest("dist/static/fonts"))

});

gulp.task("sass", function() {
	return gulp.src("src/static/app/app.scss")
				.pipe(sass())
				.pipe(gulp.dest("src/static/css/"))
});



gulp.task("build", ["munge-html", "copy-files"], function() {
	eventStream.merge(
		gulp.src(["src/static/app/**/*.html", "src/static/app/**/*.htm"])
			.pipe(minifyHTML({quotes: true}))
			.pipe(templateCache({root: "static/app/", module: "kanmApp"})),
		gulp.src("dist/static/scripts/app.min.js")
			.pipe(ngAnnotate())
	)
		.pipe(order(["**/app.min.js", "**/templates.js"]))
		.pipe(uglify({
			mangle: false
		}))
		.pipe(concat("app.min.js"))
		.pipe(gulp.dest("dist/static/scripts"));

	return gulp.src("dist/static/scripts/angular.bundle.js")
		.pipe(uglify({
			mangle: false
		}))
		.pipe(gulp.dest("dist/static/scripts"))

});

gulp.task("lint", function() {
	return gulp.src("src/app/**/*.js")
		.pipe(eslint({
			configFile: "eslint.json"
		}))
		.pipe(eslint.formatEach())
		.pipe(eslint.failOnError());
});


gulp.task("watch", function() {
	gulp.watch("src/static/app/**/*.js", ["lint"]);
	gulp.watch("src/static/app/**/*.scss", ["sass"]);
});

gulp.task("test", function(done) {
	new KarmaServer({
		configFile: __dirname + "/karma.conf.js",
	}, function() {
		done();
	}).start();
});