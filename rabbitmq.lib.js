'use strict';
const amqplib = require('amqplib');

const rabbitConfig = require('./rabbit-config');
const EventTransporters = require('./events/event-transporters');
const EventListeners = require('./events/event-listeners');

const RabbitMQLib = {
  connection: null,
  createConnection: async function () {
    const { host, port, user, password, vhost } = rabbitConfig;
    const connection = await amqplib.connect(`amqp://${user}:${password}@${host}:${port}/${vhost}`);
    return connection;
  },
  init: async function () {
    const connection = await RabbitMQLib.createConnection();
    await EventTransporters.init(connection);
    if (rabbitConfig.listener_active) {
      await EventListeners.init(connection)
    }
  },
  emitEvent: async ({ eventName, data }) => {
    try {
      await EventTransporters.emit({ eventName, data });
    }
    catch (error) {
      console.log(error);
    }
  }
}

module.exports = RabbitMQLib;