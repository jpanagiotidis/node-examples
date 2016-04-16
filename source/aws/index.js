'use strict';

import _ from 'underscore';
import {createReadStream} from 'fs';

export async function deleteBucket(bucket_name){
  try {
    const s3 = new aws.S3();
    console.log(bucket_name);
    const res = await s3.deleteBucket({
      "Bucket": bucket_name
    }).promise();
  } catch (e) {
    throw e;
  }
}

export async function uploadFile(s3, file_path, options){
  try {
    options.Body = createReadStream(file_path);
    return await s3.putObject(options).promise();
  } catch (e) {
    throw e;
  }
}

export async function getObjects(s3, bucket_name, size){
  let out = [];
  const defaultParams = {
    "Bucket": bucket_name
  };

  let currentObj;
  do {
    let params = {};
    if(currentObj){
      params = _.extend(defaultParams, {
        "Marker": out[out.length - 1].Key
      });
    }else{
      params = _.extend({}, defaultParams);
    }
    currentObj = await s3.listObjects(params).promise();
    out = out.concat(currentObj.Contents);
  } while (currentObj.IsTruncated && (!size || out.length < size));

  return out.slice(0, size);
}

export async function deleteBucketFiles(s3, bucket_name){
  const list = await getObjects(s3, bucket_name);
  const params = {
    "Bucket": bucket_name,
    "Delete": {
      "Objects": _.map(list, (obj) => {
        return {
          "Key": obj.Key
        };
      })
    }
  }
  return await s3.deleteObjects(params).promise();
}

export async function createLambdaFunction(){
  console.log('LAMBDA');
}
