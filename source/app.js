'use strict'

import config from './config';
import {init as initAWS, uploadFiles} from './aws';

console.log('READY!');
console.log(config);
initAWS(config.aws.users.ben);
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
