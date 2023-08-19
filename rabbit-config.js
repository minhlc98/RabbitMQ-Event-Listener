'use strict';

module.exports = {
  host: 'localhost',
  port: 5672,
  user: 'guest',
  password: 'guest',
  vhost: 'event',
  prefetch: 1,
  listener_active: true,
  ttl: 2 * 24 * 60 * 60 * 1000, // 2 days
  listeners: {
    'USER.SYNC_ELASTICSEARCH': {
      nConsumer: 1,
      active: true
    },
    'USER.LOG_HISTORY': {
      nConsumer: 2,
      active: true
    },
    'ORDER.SYNC_ELASTICSEARCH': {
      nConsumer: 5,
      active: true
    }
  }
};