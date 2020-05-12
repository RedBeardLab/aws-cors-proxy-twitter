# AWS CORS proxy twitter

A small implementation of a proxy server based on AWS lambda.

Twitter does not allow CORS requests and this makes impossible to implement static application against it API.

This AWS lambda skeleton is a simple solution.

You can deploy it on AWS lambda and make requests against this endpoint, the lambda will forward the request to the twitter API and will send back the response.

Since I know you are lazy, you can just upload the `.zip` included in the repository. In general this is a bad practise, and you should vet the code you are running. 

## Authentication

By default it will set the `Authorization` to the env variable: `AUTHORIZATION_TOKEN`.

You should set the `AUTHORIZATION_TOKEN` to your token, that should looks somehow like this: `Bearer ...long string...`.

Include both the `Bearer` and the whitespace just after the `Bearer` in the env variable.

To get the token you can follow [this guide](https://developer.twitter.com/en/docs/basics/authentication/oauth-2-0/bearer-tokens) or even [this gist](https://gist.github.com/skaterdav85/be8b4cc9558b3b6ab6cbef23150debe2)

## CORS

The function set the header of the response `Access-Control-Allow-Origin` to the value of the environmental variable `ACCESS_CONTROL_ALLOW_ORIGIN`.

## Support and help

I accept PR.

Support will be provided in the form of a commercial transaction. No exception.

## LICENSE

MIT or GPL, at your choice.
