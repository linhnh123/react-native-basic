import DDPClient from 'ddp-client';

const ddpClient = new DDPClient({
  host : "btaskee-dev.app.btaskee.com",
  port : 80,
  ssl  : false,
  autoReconnect : true,
  autoReconnectTimer : 500,
  maintainCollections : true,
  ddpVersion : '1',
});

module.exports = ddpClient;
