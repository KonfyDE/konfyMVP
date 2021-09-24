const aws = require('aws-sdk');
async function getParameters() {
    console.log(process.env);
    const { Parameters } = await (new aws.SSM())
        .getParameters({
            Names: ["WHEREBY_API_KEY"].map(secretName => process.env[secretName]),
            WithDecryption: true,
        }).promise();

    console.log(Parameters);
    console.log(process.env);

    return Parameters;
}


const parameters = getParameters();

const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');
app.set('WHEREBY_API_KEY', parameters);





const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
};
