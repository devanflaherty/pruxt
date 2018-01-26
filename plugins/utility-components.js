import Vue from 'vue'
// Utility Components
// These are global components that we want access to
// from most of our pages or components

// OEMBED Responsive Component
// Takes prismic OEMBED Media, and sets size for responsive videos
import responsiveEmbed from '~/components/utilities/responsiveEmbed'
Vue.component('responsiveEmbed', responsiveEmbed)

// Blur Image Loader
// Pass an image to this component
// Component will set blur of very small image
// When Large image has loaded it will load full-image
import blurLoader from '~/components/utilities/blurLoader'
Vue.component('blurLoader', blurLoader)

// Image Caption
// Pass an image and its caption to this component
// Component will show caption over image on hover
import imageCaption from '~/components/utilities/imageCaption'
Vue.component('imageCaption', imageCaption)
