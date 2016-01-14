'use strict';

var Hapi = require('hapi');
var Path = require('path');
var port = parseInt(process.env.PORT) || 8010;

var Application = require('./src/models/application');

var applications = [];

// Create a server with a host and port
var server = new Hapi.Server();

server.register(require('inert'), function(err) {
  server.connection({
    port: port
  });

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'public'
      }
    },
    config: {
      cache: {
        expiresIn: 3600 * 1000,
        privacy: 'public'
      }
    }
  });

  server.route({
    method: 'POST',
    path: '/application',
    handler: function(request, reply) {
      var app = Object.create(Application);
      var data = { data: request.payload };
      var errors;

      app.values = request.payload;
      errors = app.errors();

      if (Object.keys(errors).length > 0) {
        data.errors = errors;
        return reply(data).code(400);
      }

      applications.push(request.payload);

      return reply(request.payload).code(201);
    }
  });

  server.route({
    method: 'GET',
    path: '/application',
    handler: function(request, reply) {
      return reply(applications);
    }
  });

  // Start the server
  server.start(function(err) {
    if (err) {
      throw err;
    }
    console.log('Server running at:', server.info.uri);
  });
});
