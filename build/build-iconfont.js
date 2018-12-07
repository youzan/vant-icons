/**
 * build iconfont from sketch
 */
const fs = require('fs-extra');
const gulp = require('gulp');
const path = require('path');
const glob = require('fast-glob');
const shell = require('shelljs');
const encode = require('./build-encode');
const md5File = require('md5-file');
const iconfont = require('gulp-iconfont');
const iconfontCss = require('gulp-iconfont-css');
const local = require('./build-encode');
const config = require('../src/config');

const srcDir = path.join(__dirname, '../src');
const svgDir = path.join(__dirname, '../assets/svg');
const sketch = path.join(__dirname, '../assets/icons.sketch');
const template = path.join(__dirname, './template.tpl');

// get md5 from sketch
const md5 = md5File.sync(sketch).slice(0, 6);
const ttf = `${config.name}-${md5}.ttf`;

// remove previous ttf
const prevTTFs = glob.sync(path.join(srcDir, '*.ttf'));
prevTTFs.forEach(ttf => fs.removeSync(ttf));

// generate ttf from svg && build index.less
gulp.task('ttf', () => {
  return gulp
    .src([`${svgDir}/*.svg`])
    .pipe(
      iconfontCss({
        fontName: config.name,
        path: template,
        targetPath: '../src/index.less',
        normalize: true,
        firstGlyph: 0xf000,
        cssClass: ttf // this is a trick to pass ttf to template
      })
    )
    .pipe(
      iconfont({
        fontName: ttf.replace('.ttf', ''),
        formats: ['ttf']
      })
    )
    .pipe(gulp.dest(srcDir));
});

gulp.task('default', ['ttf'], () => {
  // generate encode.less
  encode(ttf, srcDir);
  
  // upload ttf to cdn
  shell.exec(`superman cdn /vant ${path.join(srcDir, ttf)}`);
});
