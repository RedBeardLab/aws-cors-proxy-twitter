const fetch = require('node-fetch');

const url = "https://api.twitter.com";

exports.handler = async (event) => {
    let path = event.path;
    const queryMultiString = event.multiValueQueryStringParameters || {};
    const queryParams = Object.entries(queryMultiString)
        .map(key => key[0] + "=" + key[1].join(','))   
        .join('&');
    // there may not be any query string parmaneters
    if (queryParams.length > 0) {   
        path += '?' + queryParams;
    }

    let headers = event.headers || {};
    headers["Authorization"] = headers["Authorization"] || process.env.AUTHORIZATION_TOKEN;
    delete headers['Host'];
    const body = event.body;
    const method = event.httpMethod;

    const proxyParams = {
      method: method,
      headers: headers,
      body: body
    };
    
    console.log(url + path);
    console.log(proxyParams);
    const proxyResponse = await fetch(url + path, proxyParams);

    let response = {};
    response['statusCode'] = proxyResponse.status;
    try {  
      response['body'] = await proxyResponse.text();
    } catch (error) {
	    console.log("error in getting the text");
	    console.log(error);
	    // we set the body to an empty string to make AWS lambda happy anyway
	    response['body'] = '';
    }
    response['headers'] = proxyResponse.headers;
    response['headers']['Access-Control-Allow-Origin'] = process.env.ACCESS_CONTROL_ALLOW_ORIGIN;
    response['isBase64Encoded'] = false;
    
    console.log(response);
    return response;
};
