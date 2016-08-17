var gulp = require("gulp"),
  deploy = require("gulp-gh-pages");

gulp.task('deploy', function () {
  gulp.src("_book/**/*.*")
    .pipe(deploy({
      remoteUrl: "https://github.com/regularjs/guide"
    }))
    .on("error", function(err){
      console.log(err)
    })
});