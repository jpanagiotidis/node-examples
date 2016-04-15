'use strict';

import aws from 'aws-sdk';
import _ from 'underscore';
import {createReadStream} from 'fs';

export function init(aws_credentials){
  aws.config.update(aws_credentials);
  aws.config.update({
    "region": "eu-west-1",
    "signatureVersion": 'v4'
  })
}

export async function uploadFiles(options, file_paths){
  try {
    const out = [];
    const s3 = new aws.S3();
    for (var i = 0; i < file_paths.length; i++) {
      console.log(file_paths[i]);
      const body = createReadStream(file_paths[i].path);
      const res = await s3.putObject(_.defaults({
        "Key": file_paths[i].key,
        "Body": body
      }, options)).promise();
      out.push(res);
    }

    return out;
  } catch (e) {
    throw e;
  }
}
