'use strict';
const rabbitConfig = require('../rabbit-config');

module.exports = {
  USER: {
    SYNC_ELASTICSEARCH: {
      name: 'USER.SYNC_ELASTICSEARCH',
      config: rabbitConfig.listeners['USER.SYNC_ELASTICSEARCH'],
      process: async function (data) {
        // do something with data
        console.log("USER SYNC ELASTICSEARCH");
        console.log(data);
      },
    },
    LOG_HISTORY: {
      name: 'USER.LOG_HISTORY',
      config: rabbitConfig.listeners['USER.LOG_HISTORY'],
      process: async function (data) {
        // do something with data
        console.log("USER LOG HISTORY");
        console.log(data);
      }
    }
  },
  ORDER: {
    SYNC_ELASTICSEARCH: {
      name: 'ORDER.SYNC_ELASTICSEARCH',
      config: rabbitConfig.listeners['ORDER.SYNC_ELASTICSEARCH'],
      process: async function (data) {
        // do something with data
        console.log("ORDER SYNC ELASTICSEARCH");
        console.log(data)
      }
    }
  }
}