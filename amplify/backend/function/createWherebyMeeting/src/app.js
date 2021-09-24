/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["WHEREBY_API_KEY"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

const fetch = require("node-fetch");
const aws = require('aws-sdk');

app.get('/create-meeting', async function(req, res) {
    const { Parameters } = await (new aws.SSM())
        .getParameters({
            Names: ["WHEREBY_API_KEY"].map(secretName => process.env[secretName]),
            WithDecryption: true,
        }).promise();

    // TODO Error Handling
    const WHEREBY_API_KEY = Parameters[0].Value;

    let startTime = new Date();
    startTime.setSeconds(startTime.getSeconds() + 15);

    let endTime = new Date();
    endTime.setSeconds(endTime.getSeconds() + 150);

    const data = {
        startDate: startTime.toISOString(),
        endDate: endTime.toISOString(),
        fields: ["hostRoomUrl"],
    };

    function getResponse() {
        return fetch("https://api.whereby.dev/v1/meetings", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${WHEREBY_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    }
    getResponse().then(async result => {
        console.log("Status code:", result.status);
        const data = await result.json();
        console.log("Room URL:", data.roomUrl);
        console.log("Host room URL:", data.hostRoomUrl);

        res.json({
            success: true,
            error : false,
            room_url: data.roomUrl
        });
    }).catch(err => {
        res.json({
            success: false,
            error : true,
            room_url: null
        });
    });
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
