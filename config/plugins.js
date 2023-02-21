module.exports = {
    ckeditor5: true,
   dashboard: {
      enabled: true,
      resolve: './src/plugins/dashboard'
    },
    chatapp: {
      enabled: true,
      resolve: './src/plugins/chatapp'
    },
    product: {
      enabled: true,
      resolve: './src/plugins/product'
    },
    order: {
      enabled: true,
      resolve: './src/plugins/order'
    },
    kanbot: {
      enabled: true,
      resolve: './src/plugins/kanbot'
    },
    connection: {
      enabled: true,
      resolve: './src/plugins/connection'
    },
    io: {
      enabled: true,
      config: {
        IOServerOptions :{
          cors: { origin: "http://localhost:5000", methods: ["GET"] },
        },
        contentTypes: {
          message: "*",
          chat:["create"]
        },
        events:[
          {
            name: "connection",
            handler: ({ strapi }, socket) => {
              strapi.log.info(`[io] new connection with id ${socket.id}`);
            },
          },
        ]
      },
    },
  }