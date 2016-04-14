'use strict';

import _ from 'underscore';
import fs from 'fs';
import path from 'path';

import defaults from './global.js';
let envConfigs = null;

/* Load Local Config By Default */
let env = 'local';
if( /(prod|production)/gi.test( process.env.NODE_ENV ) ){
  env = 'prod';
}else if(process.env.NODE_ENV){
  env = process.env.NODE_ENV;
}

if (env) {
  if (fs.existsSync(path.resolve(`${__dirname}/${env}.js`))) {
    envConfigs = require(`./${env}`);
  }
}

/* Resolve App Root Path for Convinience */
defaults.root_path = path.resolve(__dirname + '/../');

export default envConfigs ? _.defaults(envConfigs, defaults) : defaults;
