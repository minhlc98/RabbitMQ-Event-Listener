'use strict';

const { LIST_EVENT_REGISTERED } = require('./event-register-listeners');
const rabbitConfig = require('../rabbit-config');
const common = require('../common');

const Transporters = {
  channels: {},
  exchanges: {}, 
  init: async function (connection) {
    return Promise.all(LIST_EVENT_REGISTERED.map(async eventName => {
      const channel = await connection.createChannel();
      await channel.prefetch(rabbitConfig.prefetch);
      const [topic] = common.parseEvent(eventName);
      const exchange = await channel.assertExchange(topic, 'topic', { durable: true });
      Transporters.channels[eventName] = channel;
      Transporters.exchanges[eventName] = exchange;
    }));
  },
  emit: async function ({ eventName, data }) {
    if (!(this.channels[eventName] && this.exchanges[eventName])) return;
    const exchange = this.exchanges[eventName].exchange;
    return this.channels[eventName].publish(exchange, eventName, Buffer.from(JSON.stringify(data)), { persistent: true });
  }
}

module.exports = Transporters