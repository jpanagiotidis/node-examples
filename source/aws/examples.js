'use strict'

import _ from 'underscore';
import aws from 'aws-sdk';
import config from '../config';
import {
  getObjects,
  uploadFile,
  deleteBucketFiles
} from './index.js';

const test_bucket = "moufa";

console.log('AWS EXAMPLES');
console.log(config);

createDummyBucketAndContents()
.then((res) => {
  console.log(res);
})
.catch((err) => {
  console.log(err);
  console.log(err.stack);
});

function init(){
  aws.config.update(_.defaults(
    {
      "region": "eu-west-1",
      "signatureVersion": "v4"
    },
    config.aws.users.jon
  ));
}

async function createDummyBucketAndContents(){
  try {
    init();
    const s3 = new aws.S3();
    let buckets = await s3.listBuckets().promise();
    if(_.filter(buckets.Buckets, (res) => {
      return res.Name === test_bucket;
    }).length > 0){
      console.log('BUCKET ALREADY EXISTS');
    }else{
      console.log('CREATING BUCKET');
      await s3.createBucket({
        "Bucket": test_bucket
      }).promise();
    }

    await uploadFile(
      s3,
      "/Users/jpanagiotidis/Documents/test_data/a.txt",
      {
        "Bucket": test_bucket,
        "Key": "test_b.txt",
        "ACL": 'public-read'
      }
    );

    await uploadFile(
      s3,
      "/Users/jpanagiotidis/Documents/test_data/images/user.jpg",
      {
        "Bucket": test_bucket,
        "Key": "test_c.jpg",
        "ACL": 'public-read'
      }
    );
    const list = await getObjects(s3, test_bucket, 3);
    return "AWS S3 DUMMY BUCKET CREATED";
  } catch (e) {
    throw e;
  }
}

async function deleteBucket(){
  try {
    init();
    const s3 = new aws.S3();
    await deleteBucketFiles(s3, test_bucket);
    await s3.deleteBucket({
      "Bucket": test_bucket
    }).promise();
    return "AWS S3 DUMMY BUCKET DELETED";
  } catch (e) {
    throw e;
  }
}

// createLambdaFunction()
// .then((res) => {
//   console.log(res);
// })
// .catch((err) => {
//   console.log(err);
// });
