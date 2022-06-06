#! /usr/bin/env node
var spawn = require('child_process').spawn

var args = [];

var command = process.argv[2];

console.log(command)
if(command === '--port') {
  (function(p) {
    if(!isNaN(parseFloat(p)) && isFinite(p)) {
      if(p < 1024){
        console.log('Sorry port must be 1024 or greater. Starting on default port 8080.')
        return
      }

      args.push('--port');
      args.push(p)
    }
  })(process.argv[3])
}
var child = spawn(__dirname + '/../node_modules/.bin/gulp', args)

child.stdout.on('data', function(data) {
  console.log(data.toString());
})