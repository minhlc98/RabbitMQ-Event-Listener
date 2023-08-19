# RabbitMQ-Event-Listener
## When emitting an event with a message, all listeners that are listening to that event will receive the message

## How to use ?
```
await RabbitMQLib.emitEvent({
  eventName: EVENT_NAME.USER.CREATED,
  data: { name: `Cẩm Minh`, username: 'minhlc98' }
});
```

## How to setup ?
Step 1: Declaring listeners that is used for listening events. Configuring in rabbit-config.js file.

```
'USER.SYNC_ELASTICSEARCH': {
  nConsumer: 5,
  active: true
}
```

Step 2: Declaring event name in events/event-names.js file.

```
USER: {
  CREATED: 'USER.CREATED',
  UPDATED: 'USER.UPDATED',
}
```

Step 3: Processing message in the listener. Configuring in event/event-process-listeners.js file.

```
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
}
```

Finally, Registering Listeners that listen when emitting an event. Configuring in events/event-register-listeners.js file.

```
[EVENT.USER.CREATED]: [
  LISTENER.USER.SYNC_ELASTICSEARCH,
  LISTENER.USER.LOG_HISTORY,
]
```




