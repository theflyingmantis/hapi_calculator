
'use strict';

var Calculator = require('./src/calculator');
const pool = require('./lib/db');

const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 3000
});

//*************** HANDLERS ****************************
var newCalculatorHandler = function(request,reply){
  var calculatorId = Number(request.payload.id);
  var initValue = Number(request.payload.val);
  if(isNaN(initValue)) {
    initValue=0; 
  }
  if(isNaN(calculatorId)){
    reply({"Status":"Error","Explanation":"Bad ID given"}).code(400);  
  }
  //console.log(calculatorId,initValue);
  pool.query("insert into calculator (id,val) values ($1,$2);",[calculatorId,initValue],function(err,res){
    if(err != null) {
      console.error('error running query', err);
      reply({"Status":"Error","Explanation":err}).code(400);
    }
    else{
      reply({"Status":"Created","Explanation":"Inserted "+initValue+" in calculator id "+calculatorId }).code(201);
    }
  });
};


var 
//**************************************************

// Add the route
server.register(require('inert'), (err) => {
  if (err) {
      throw err;
  }
  server.route({
    method: 'GET',
    path: '/about',
    handler: function (request, reply) {
      reply.file('./public/about.html');
    }
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.file('./public/index.html');
    }
  });

  server.route({
    method: ['POST'],
    path: '/newCalculator',
    handler: newCalculatorHandler
  });

  server.route({
    method: ['GET'],
    path: '/calculatorValue',
    handler: calculatorValueHandler
  });

});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    
    console.log('Server running at:', server.info.uri);
});
