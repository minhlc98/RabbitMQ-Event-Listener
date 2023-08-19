'use strict';

const _ = require('lodash');

const rabbitConfig = require('../rabbit-config');
const { getEventByListener } = require('./event-register-listeners');
const EVENT_PROCESS_LISTENER = require('./event-process-listeners');
const common = require('../common');

const Listeners = {
  initConsumer: async function (connection, listener, listener_process) {
    const channel = await connection.createChannel();
      const events = getEventByListener(listener);

      await channel.prefetch(rabbitConfig.prefetch);

      for (const event of events) {
        const [topic] = common.parseEvent(event);
        await Promise.all([
          channel.assertExchange(topic, 'topic', { durable: true }),
          channel.assertQueue(listener, { durable: true, messageTtl: rabbitConfig.ttl }),
        ]);
        await channel.bindQueue(listener, topic, event);
      }

      channel.consume(listener, async message => {
        try {
          if (!(message && message.content)) channel.ack(message);
          const data = common.parseMessage(message.content.toString());
          await listener_process.process(data);
          return channel.ack(message);
        }
        catch (error) {
          console.log(error);
          return channel.ack(message);
        }
      });
  },
  init: async function (connection) {
    const listeners = Object.keys(rabbitConfig.listeners);
    return Promise.all(listeners.map(async listener => {
      const listener_process = _.get(EVENT_PROCESS_LISTENER, listener);
      if (!(listener_process && listener_process.config && listener_process.config.active)) return;

      for (let i = 0; i < listener_process.config.nConsumer; ++i) {
        await Listeners.initConsumer(connection, listener, listener_process);
      }
    }));
  }
}

module.exports = Listeners;