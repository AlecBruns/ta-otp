'use strict';
var AWS = require('aws-sdk');

exports.handler = async (event) => {

let email = '';
let password = '';
// Set the region 
AWS.config.update({region: 'us-east-2'});


 email = event.email;

 password = event.password;

console.log(`email is ${email}`)

// Create sendEmail params 
var params = {
  Destination: { /* required */
    ToAddresses: [
     email
    ]
  },
  Message: { /* required */
    Body: { /* required */
      Html: {
       Charset: "UTF-8",
       Data: `OTP password is ${password}`
      },
      Text: {
       Charset: "UTF-8",
       Data: `OTP password is ${password}`
      }
     },
     Subject: {
      Charset: 'UTF-8',
      Data: 'OTP email'
     }
    },
  Source: 'alecjbruns@gmail.com', /* required */
  ReplyToAddresses: [
     'alecjbruns@gmail.com'
  ],
};

// Create the promise and SES service object
var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();

// Handle promise's fulfilled/rejected states
console.log(sendPromise)
return sendPromise.then(
  function(data) {
      console.log(data)
  }).catch(
    function(err) {
        console.log(`error occurred: ${err}`);
  });
 
};
