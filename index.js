
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
        reply.file('./public/about.html');
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

  server.route({
    method: ['PUT'],
    path: '/operation',
    handler: operationHandler
  });

});

// Start the server
server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});




//*************** HANDLERS ****************************
var newCalculatorHandler = function(request,reply){
  var calculatorId = Number(request.payload.id);
  var initValue = Number(request.payload.val);
  if(isNaN(initValue)) {
    initValue=0; 
  }
  if(isNaN(calculatorId)){
    reply({"Status":"Error","Explanation":"Bad ID"}).code(400);  
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


var calculatorValueHandler = function(request,reply){
  var calculatorId=Number(request.query.id);
  if(isNaN(calculatorId)){
    reply({"Status":"Error","Explanation":"Bad ID"}).code(400);
  }
  pool.query("SELECT val FROM calculator WHERE id=$1",[calculatorId],function(err,res){
    if(err != null) {
      console.error('error running query', err);
      reply({"Status":"Error","Explanation":err}).code(400);
    }
    else{
      if(res.rowCount==0)
        reply({"Status":"Error","Value":"Wrong ID"}).code(400);
      else reply({"Status":"Success","Value":res.rows[0].val}).code(201);
    }
  });
};

var operationHandler = function(request,reply){
  var op = request.payload.operation;
  var v1 = Number(request.payload.val);
  var calculatorId = Number(request.payload.id);
  if(isNaN(calculatorId)){
    reply({"Status":"Error","Explanation":"Bad ID"}).code(400);
  }
  pool.query("SELECT val FROM calculator WHERE id=$1",[calculatorId],function(err,res){
    if(err != null) {
      console.error('error running query', err);
      reply({"Status":"Error","Explanation":err}).code(400);
    }
    else{
      if(res.rowCount==0)
        reply({"Status":"Error","Value":"Wrong ID"}).code(400);
      else {
        var v2=res.rows[0].val;
        var result = operationHelper(op,v1,v2);
        if (result == "UnIdentified Operation"){
          reply({"Status":"Error","Explanation":"UnIdentified Operation"}).code(400);
        }
        else {
          updateDB(calculatorId,result);
          reply({"Status":"Success","Value":result}).code(200);
        }      
      }
    }
  });
};

//**************************************************

//***************** HELPER *************************

var operationHelper = function (operation,v1,v2){
  switch (operation){
    case 'add' : return Calculator.sum(v1,v2);break;
    case 'sub' : return Calculator.sub(v1,v2);break;
    default : return "UnIdentified Operation";
  }
}

var updateDB = function (calculatorId , val){
  pool.query("UPDATE calculator SET val=$1 WHERE id=$2;",[val,calculatorId],function(err,res){
    if(err != null) {
      console.error('error running query', err);
      reply({"Status":"Error","Explanation":err}).code(400);
    }
    else{
      console.log(res);
    }
  });
}


//***************************************************

