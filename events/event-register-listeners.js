'use strict';

const EVENT = require('./event-names');
const LISTENER = require('./event-process-listeners');

const EVENT_LISTENER = {
  [EVENT.USER.CREATED]: [
    LISTENER.USER.SYNC_ELASTICSEARCH,
    LISTENER.USER.LOG_HISTORY,
  ],
  [EVENT.USER.UPDATED]: [
    LISTENER.USER.SYNC_ELASTICSEARCH,
    LISTENER.USER.LOG_HISTORY,
  ],
  [EVENT.ORDER.CREATED]: [
    LISTENER.ORDER.SYNC_ELASTICSEARCH,
  ],
  [EVENT.ORDER.UPDATED]: [
    LISTENER.ORDER.SYNC_ELASTICSEARCH,
  ]
}

const LIST_EVENT_REGISTERED = Object.keys(EVENT_LISTENER);

const getEventByListener = (queue_name) => {
  let events = [];
  for (const event in EVENT_LISTENER) {
    const listeners = EVENT_LISTENER[event];
    if (listeners.some(listener => listener.name === queue_name)) {
      events.push(event);
    }
  }

  return events;
}

module.exports = { EVENT_LISTENER, LIST_EVENT_REGISTERED, getEventByListener };