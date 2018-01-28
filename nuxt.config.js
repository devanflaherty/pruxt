const pkg = require('./package')

let url = 'https://stfrd.com'
let title = pkg.name
let desc = 'We are an agency rooted in film production. Our in-house team of directors, designers and producers is equipped to serve individuals, agencies and brands with creative solutions.'
let unfurl = `${url}/unfurl.jpg`

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: `%s - ${title}`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#ffffff' },
      { name: 'robots', content: 'all' },
      { hid: 'description', name: 'description', content: desc },
      { hid: 'og:url', property: 'og:url', content: url },
      { hid: 'og:image', property: 'og:image', content: unfurl },
      { hid: 'og:title', property: 'og:title', content: title },
      { hid: 'og:description', property: 'og:description', content: desc },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:domain', name: 'twitter:domain', value: url },
      { hid: 'twitter:title', name: 'twitter:title', value: title },
      { hid: 'twitter:description', name: 'twitter:description', value: desc },
      { hid: 'twitter:image', name: 'twitter:image', content: unfurl },
      { hid: 'twitter:url', name: 'twitter:url', value: url }
    ],
    link: [
      { hid: 'image_src', rel: 'image_src', href: unfurl }
    ],
    script: [
      { 
        defer: true,
        src: 'https://use.fontawesome.com/releases/v5.0.0/js/all.js'
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },

  /*
  ** Global CSS
  */
  css: [
    { src: '~assets/styles/main.scss', lang: 'scss' }
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: `~plugins/vue-lazyload`, ssr: false },
    { src: `~plugins/vue-swiper`, ssr: false },
    { src: `~plugins/scroll-reveal`, ssr: false },
    { src: `~mixins/global` },
    { src: `~plugins/slice-components` },
    { src: `~plugins/utility-components` },
    { src: `~plugins/prismic` }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    // ['@nuxtjs/google-analytics', { ua: 'UA-*******' }]
  ],

  /*
  ** Extend the Router
  */
  router: {
    middleware: ['toggleNavVisibility'],
    scrollBehavior: function (to, from, savedPosition) {
      // savedPosition is only available for popstate navigations.
      if (savedPosition) {
        return savedPosition
      } else {
        let position = {}
        // if no children detected
        if (to.matched.length < 2) {
          // scroll to the top of the page
          // position = { x: 0, y: 0 }
        }
        // if link has anchor,  scroll to anchor by returning the selector
        if (to.hash) {
          position = { selector: to.hash }
        }
        return position
      }
    }
  },

  /*
  ** Build configuration
  */
  build: {
    vendor: ['axios', 'vue-lazyload', 'scrollreveal'],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      // Webpack config for swiper.js
      config.module.rules.push({
        test: /\.js$/,
        exclude: /node_modules\/(?!(dom7|swiper)\/).*/
      })
    },
    postcss: {
      plugins: {
        'postcss-cssnext': {
          features: {
            customProperties: false
          }
        }
      }
    }
  }
}
