'use strict';

const RabbitMQLib = require('./rabbitmq.lib');
const EVENT_NAME = require('./events/event-names');

async function main () {
  await RabbitMQLib.init();

  // Emit event, 
  // which queues are listening on this event will receive message
  await RabbitMQLib.emitEvent({
    eventName: EVENT_NAME.USER.CREATED,
    data: { name: `Cẩm Minh`, username: 'minhlc98' }
  });
};

main();