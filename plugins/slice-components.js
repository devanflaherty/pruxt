import Vue from 'vue'

// Import and define global components for Prismic Slices
import sliceLoop from '~/components/slices/index'
Vue.component('sliceLoop', sliceLoop)

// Video Embed
import videoEmbed from '~/components/slices/videoEmbed'
Vue.component('videoEmbed', videoEmbed)

// Highlight
import highlight from '~/components/slices/highlight'
Vue.component('highlight', highlight)

// Image Gallery
import imageGallery from '~/components/slices/imageGallery'
Vue.component('imageGallery', imageGallery)

// Columned Content
import columnedContent from '~/components/slices/columnedContent'
Vue.component('columnedContent', columnedContent)

// Full Image
import fullImage from '~/components/slices/fullImage'
Vue.component('fullImage', fullImage)

// Rich Text
import richText from '~/components/slices/richText'
Vue.component('richText', richText)

// Quote
import quote from '~/components/slices/quote'
Vue.component('quote', quote)
