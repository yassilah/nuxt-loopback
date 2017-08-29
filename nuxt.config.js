const { apiURL } = require('./config.json')

module.exports = {
  head: {
    title: 'starter',
    meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { hid: 'description', name: 'description', content: 'Nuxt + Loopback' }
    ],
    link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: ['~/assets/css/main.css'],
  srcDir: 'client',
  plugins: [],
  modules: [
  '@nuxtjs/bulma',
  '@nuxtjs/font-awesome',
  [
  '@nuxtjs/axios', {
    baseURL: `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}${apiURL}`,
    browserBaseURL: `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}${apiURL}`
  }
  ]
  ],
  build: {
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
