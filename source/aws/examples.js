'use strict'

import config from '../config';
import {init as initAWS, uploadFiles, createLambdaFunction} from './index.js';

console.log('AWS EXAMPLES');
console.log(config);

initAWS(config.aws.users.jon);

function uploadFilesExample(){
  uploadFiles(
    {
      Bucket: "my-bucket",
      ACL: 'public-read'
    },
    [
      {
        "key": "doc-a.jpg",
        "path": "/Users/jon/Documents/a.jpg"
      },
      {
        "key": "doc-b.jpg",
        "path": "/Users/jon/Documents/b.jpg"
      },
      {
        "key": "doc-c.jpg",
        "path": "/Users/jon/Documents/c.jpg"
      }
    ]
  )
  .then((res) => {
    console.log('UPLOAD COMPLETED', res);
  })
  .catch((err) => {
    console.log(err);
  });
}

// createLambdaFunction()
// .then((res) => {
//   console.log(res);
// })
// .catch((err) => {
//   console.log(err);
// });
