var fs = require('fs-extra');
var babel = require("babel-core");

var options = {
  presets: [
    "es2015-node",
    "stage-0"
  ],
  plugins: [
    [
      "transform-runtime",
      "transform-async-to-module-method", {
        "module": "bluebird",
        "method": "coroutine"
      }
    ]
  ]
};

var serverFiles = [];
serverFiles = serverFiles.concat(walkSync('source'));

serverFiles.forEach(function(file){
  if(file.endsWith('.js')){
    var code = babel.transformFileSync(file, options).code;
    file = file.replace('source', 'build');
    var filePath = file.split('/');
    if(filePath.length > 1){
      filePath.splice(filePath.length - 1, 1);
      try{
        fs.mkdirpSync(filePath.join('/'));
      }catch(e){
        console.log(e);
      }
    }
    fs.writeFileSync(file, code, {flag:'w'});
  }else{
    copyToBuildDir(file);
  }
});

// walkSync('static').forEach(function(file){
//   copyToBuildDir(file);
// });
//
// walkSync('client/build').forEach(function(file){
//   copyToBuildDir(file);
// });

// walkSync('node_modules').forEach(function(file){
//   copyToBuildDir(file);
// });

function copyToBuildDir(file){
  fs.copy(
    file,
    file.replace('source', 'build'),
    { replace: true },
    function (err) {
    if (err) {
      throw err;
    }
  });
}

function walkSync(dir, filelist) {
  var fs = fs || require('fs'),
      files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      filelist = walkSync(dir + '/' + file, filelist);
    }
    else {
      filelist.push(dir + '/' + file);
    }
  });
  return filelist;
};
