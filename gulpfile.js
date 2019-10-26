//引入插件
var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    watch = require('gulp-watch'),
    jshint = require('gulp-jshint'),
    cleanCSS = require('gulp-clean-css'),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload');  //自动刷新页面

//定义css、scss、js源文件路径
var cssSrc = 'src/**/*.css',
scssSrc = 'src/**/*.scss',
jsSrc = ['src/**/*.js','!gulpfile*.js'];

//创建监听任务
gulp.task('watchcss', function() { //这里的watch，是自定义的，携程live或者别的也行  
    livereload.listen();//这里需要注意！旧版使用var server = livereload();已经失效    
    // app/**/*.* 的意思是 app 文件夹下的 任何文件夹 的 任何文件  
    gulp.watch('src/**/*.*', function(event) {  
        livereload.changed(event.path);  
    });  
});  

//监控文件变化
gulp.task('watch', function () {
    gulp.watch([jsSrc,scssSrc,cssSrc], ['default']);
});

//检查js语法
gulp.task('jslint', function() {
  return gulp.src(jsSrc)
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

//清空目标文件
gulp.task('cleanDst', function () {
    return gulp.src(['dist','rev'], {read: false})
    .pipe(clean());
});

//CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revCss', function(){
    return gulp.src(cssSrc)
    .pipe(rev())
    // 压缩css
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('rev/css'));
});

//sass
gulp.task('revScss', function(){
    return gulp.src(scssSrc)
    .pipe(rev())
    //编译scss
    .pipe(sass())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('rev/scss'));
});

//js生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revJs', function(){
    return gulp.src(jsSrc)
    .pipe(rev())
    //压缩
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
     //生成rev-manifest.json
     .pipe(rev.manifest())
     .pipe(gulp.dest('rev/js'));
 });

//Html替换css、js文件版本
gulp.task('revHtml', function () {
    return gulp.src(['rev/**/*.json', 'src/**/*.html'])
    .pipe(revCollector({
        replaceReved: true
    }))
    .pipe(gulp.dest('dist'));
});

// 将非js、非css移动到目标目录
gulp.task('mvNotDealAsset', function () {
    return gulp.src(['src/**/*','!src/**/*.css', '!src/**/*.js','!src/**/*.html'])
    .pipe(gulp.dest('dist'));
});

//开发构建
gulp.task('dev', function (done) {
    condition = false;
    runSequence(
        ['jslint'],
        ['cleanDst'],
        ['revCss'],
        ['revScss'],
        ['revJs'],
        ['revHtml'],
        ['mvNotDealAsset'],
        ['watch'],
        done);
});

gulp.task('default', ['dev']);