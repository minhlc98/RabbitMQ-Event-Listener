'use strict';

const CommonLib = {};

// USER.CREATE => topic: 'USER', action: 'CREATE'
CommonLib.parseEvent = (event) => {
  return event.split('.');
}

CommonLib.parseMessage = (msg) => {
  try {
    return JSON.parse(msg);
  }
  catch (e) {
    return msg;
  }
}

CommonLib.delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

module.exports = CommonLib;