
'use strict';

var Calculator = require('./src/calculator');

const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 8000 
});

// Add the route
server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            // console.log(request.params);
            reply.file('./public/index.html');
        }
    });

    server.route({
        method: ['GET','POST','PUT'],
        path: '/newCalculator',
        handler: function(request,reply){
            console.log(request.query); 
            console.log(request.payload);
            return reply(request.query);
        }
    });
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});