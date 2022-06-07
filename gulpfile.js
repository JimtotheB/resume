/**
 * @file gulpfile
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Resume_generator
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

var gulp = require('gulp');
var fs = require('fs')
var connect = require('gulp-connect');
var handlebars = require('handlebars');
var helpers = require('./helpers/hb_helpers')(handlebars);
var turndown = require('turndown')
var gfm = require('turndown-plugin-gfm').gfm

var command = process.argv[2];
var serverPort = 8080;
if(command === '--port') {
  serverPort = process.argv[3]
}

function writeReadme(html, cb){
  fs.readFile('./handlebars/readme.hb', {encoding: 'utf-8'}, function(err, file) {
    if(err){
      return cb(err, null)
    }
    var header = handlebars.compile(file)();
    var tds = new turndown()
    tds.use(gfm)
    tds.addRule('break', {
      filter: 'br',
      replacement: function() {
        return '\n\n'
      }
    })
    tds.addRule('body',{
      filter: ['html', 'body', 'span', 'div'],
      replacement: function(innerHTML) {
        return innerHTML;
      }
    })

    tds.addRule('meta', {
      filter: ['head', 'script', 'style', 'meta', 'link'],
      replacement: function() {
        return '';
      }
    })
    var md = tds.turndown(html)
    // var md = toMd(html, {
    //   gfm: true,
    //   converters: [
    //     {
    //       filter: 'br',
    //       replacement: function() {
    //         return '\n\n'
    //       }
    //     },
    //     {
    //       filter: ['html', 'body', 'span', 'div'],
    //       replacement: function(innerHTML) {
    //         return innerHTML;
    //       }
    //     },
    //     {
    //       filter: ['head', 'script', 'style', 'meta', 'link'],
    //       replacement: function() {
    //         return '';
    //       }
    //     }
    //   ]
    // });
    var combined = header + md;
    fs.writeFile('./Readme.md', combined, {encoding: 'utf-8'}, function(err) {
      if(err){
        return cb(err, null)
      }
      return cb(null)
    })
  })
}

function parseJson(json){
  var parsed
  try {
    parsed = JSON.parse(json);
  }
  catch (e){
    parsed = null;
  }
  return parsed
}


function PublicAndPrivate(cb){
  fs.readFile('./Data/private.json', {encoding: "utf-8"}, function(privateErr, privateJson) {
    fs.readFile('./Data/public.json', {encoding: "utf-8"}, function(publicErr, publicJson) {

      var privJson = (privateErr === null) ? parseJson(privateJson) : null
      var pubJson = (publicErr === null) ? parseJson(publicJson) : null
      if(privJson === null){
        privJson = pubJson
      }

      return cb(null, pubJson, privJson)
    })
  })
}

function buildHtml(cb) {
  fs.readFile('./handlebars/base.hb', {encoding: 'utf-8'}, function(err, html) {
    PublicAndPrivate(function(err, pubJson, privJson) {

      handlebars.registerPartial('header', fs.readFileSync('./handlebars/header.hb', {encoding: 'utf-8'}));
      handlebars.registerPartial('intro', fs.readFileSync('./handlebars/intro.hb', {encoding: 'utf-8'}));
      handlebars.registerPartial('experience', fs.readFileSync('./handlebars/experience.hb', {encoding: 'utf-8'}));
      handlebars.registerPartial('footer', fs.readFileSync('./handlebars/footer.hb', {encoding: 'utf-8'}));

      var compiledPrivate = handlebars.compile(html)(privJson)
      var compiledPublic = handlebars.compile(html)(pubJson)

      fs.writeFile('./serve/index.html', compiledPrivate, {encoding: "utf-8"}, function(err) {
        if(err){
          return cb(err, null)
        }
        writeReadme(compiledPublic, cb)
      })
    })
  })
}


let connectServer = (cb) => {
  connect.server({
    port: serverPort,
    root: './serve',
    livereload: true
  })
  cb()
}
// gulp.task('connect', function() {
//   connect.server({
//     port: serverPort,
//     root: './serve',
//     livereload: true
//   })
// })

let buildAndReload = (cb) => {
  buildHtml(function(){
    gulp.src('./serve/index.html').pipe(connect.reload())
    cb()
  })
}

let watchFiles = (cb) => {
  // gulp.watch(['./Data/*.json', './handlebars/*.hb', './serve/css/*.css'],{ ignoreInitial: false }, buildAndReload)
  gulp.watch("./Data/*.json",{ ignoreInitial: false }, buildAndReload)
  cb()
}

buildHtml(function() {
  console.log('Building resume, please open http://localhost:'+ serverPort + ' to view.' );
})


exports.default = gulp.parallel(connectServer, watchFiles)