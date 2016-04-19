'use strict';

import _ from 'underscore';
import aws from 'aws-sdk';
import config from '../config';

console.log('AWS SQS EXAMPLES');
console.log(config);

function init(){
  aws.config.update(_.defaults(
    {
      "region": "eu-west-1",
      "signatureVersion": "v4"
    },
    config.aws.users.admin
  ));
}

// async function sqsTests
