const http = require('http');
const favicon = require('serve-favicon');
var finalhandler = require('finalhandler');
//const express = require('express');
var path = require('path');
let requestCount = 0;

//const app = express();

let _favicon = favicon(path.join(__dirname, '/', 'favicon.ico'));

const server = http.createServer((request, response) => {
    requestCount++;
    let done = finalhandler(request, response);

    _favicon(request, response, function onNext(err) {
        if (err) return done(err)
        switch (request.url) {
            case '/students':
                response.write('STUDENTS');
                break;
            case '/courses':
                response.write('COURSES');
                break;
            default:
                response.write('404 not found');
                break;
        }
        response.write(' ITK: ' + requestCount);
        // continue to process the request here, etc.

        //response.statusCode = 404;
        response.end();
    })
    
    //response.end();
});

server.listen(3003);