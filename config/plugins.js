module.exports = {
    ckeditor5: true,
   dashboard: {
      enabled: true,
      resolve: './src/plugins/dashboard'
    },
    product: {
      enabled: true,
      resolve: './src/plugins/product'
    },
    order: {
      enabled: true,
      resolve: './src/plugins/order'
    },
    // conservation: {
    //   enabled: true,
    //   resolve: './src/plugins/conservation'
    // },
    kanbot: {
      enabled: true,
      resolve: './src/plugins/kanbot'
    },
    connection: {
      enabled: true,
      resolve: './src/plugins/connection'
    },
    upload: {
      config: {
        providerOptions: {
          localServer: {
            maxage: 300000
          },
        },
      },
    },
  }