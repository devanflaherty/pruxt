<template>
  <div id="newsPost" class="page newsPost">

    <pageHeader :headline="entry.hero_headline" :bgImage="entry.hero_image" />

    <contentTemplate :page="entry"/>

    <transition name="slide-up">
      <next v-if="nextPost" :nextLabel="$prismic.asText(nextPost.data.title)" nextPreHeading="Next" :nextLink="`/news/${nextPost.uid}`" :nextFrontColor="nextPost.data.primary_color" :nextBackColor="nextPost.data.secondary_color" />
    </transition>
    
  </div>
</template>

<script>
import pageHeader from '~/components/pageHeader'
import contentTemplate from '~/components/pageTemplates/_content'
import {beforeEnter, enter, leave} from '~/mixins/transitions'

export default {
  name: 'newsPost',
  transition: {
    name: 'page',
    mode: 'out-in',
    css: false,
    beforeEnter,
    enter,
    leave
  },
  head () {
    return {
      title: this.seoTitle,
      meta: [
        { hid: 'description', name: 'description', content: this.seoDesc },
        { hid: 'og:url', property: 'og:url', content: this.seoUrl },
        { hid: 'og:image', property: 'og:image', content: this.seoImage },
        { hid: 'og:title', property: 'og:title', content: this.seoTitle },
        { hid: 'og:description', property: 'og:description', content: this.seoDesc },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:domain', name: 'twitter:domain', value: this.seoUrl },
        { hid: 'twitter:title', name: 'twitter:title', value: this.seoTitle },
        { hid: 'twitter:description', name: 'twitter:description', value: this.seoDesc },
        { hid: 'twitter:image', name: 'twitter:image', content: this.seoImage },
        { hid: 'twitter:url', name: 'twitter:url', value: this.seoUrl }
      ],
      link: [
        { hid: 'image_src', rel: 'image_src', href: this.seoImage }
      ]
    }
  },
  components: {
    pageHeader,
    contentTemplate
  },
  async asyncData ({ app, params, error, store }) {
    try {
      let entry = await store.dispatch('news/getNewsPost', params.slug)

      return {
        document: entry,
        entry: entry.data
      }
    } catch (err) {
      error({statusCode: 404, message: `The page you are looking for does not exist. `, err: err})
    }
  },
  data () {
    return {
      nextPost: null,
      previousPost: null
    }
  },
  computed: {
    contrast () {
      return {
        'has-text-white': this.entry.page_color === 'Dark',
        'has-text-black': this.entry.page_color === 'Light'
      }
    },
    seoTitle () {
      if (this.entry.meta_title > 0) {
        return this.entry.meta_title
      } else {
        return this.$prismic.asText(this.entry.title)
      }
    },
    seoDesc () {
      if (this.entry.meta_description) return this.entry.meta_description
      return this.$prismic.asText(this.entry.excerpt)
    },
    seoImage () {
      if (this.entry.card_image) return this.entry.card_image.url
      return this.entry.feature_image.large.url
    },
    seoUrl () {
      return 'https://stfrd.com' + this.$route.fullPath
    }
  },
  methods: {
    async getNextPost () {
      this.nextPost = await this.$store.dispatch({
        type: 'news/getAdjacentPost',
        id: this.document.id,
        dir: 'desc'
      })
      if (this.nextPost === undefined) {
        this.nextPost = await this.$store.dispatch('news/getFirstPost')
      }
    },
    async getPreviousPost () {
      this.previousPost = await this.$store.dispatch({
        type: 'news/getAdjacentPost',
        id: this.document.id,
        dir: 'desc'
      })
    }
  },
  beforeMount () {
    this.setColors(this.entry.page_color, this.entry.primary_color, this.entry.secondary_color)
  },
  mounted () {
    if (this.document) {
      this.getNextPost()

      this.$store.dispatch('site/toggleNavVis', true)
      this.$store.dispatch('site/toggleLoading', false)

      this.$prismic.initApi().then(api => {
        api.toolbar()
      })
    }
  }
}
</script>

<style scoped>
</style>
