'use strict';

import request from 'request';

console.log('SCRAP IT');
const url = "https://www.dailyfx.com/calendar";

request(url, function(error, response, html) {
  if (!error && response.statusCode == 200) {
    console.log(html);
  }else{
    console.log(error);
    console.log(response.statusCode);
  }
});
