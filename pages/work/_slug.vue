<template>
  <section id="workPost" class="page workPost" v-show="!loading">
    <!-- <WorkHero :class="{'add-margin': margin === 'marginHero'}" :entry="entry" /> -->

    <section class="hero" v-if="entry.work_video.html">
      <div class="hero-body">
        <div class="hero-container container"></div>
      </div>
    </section>

    <!-- Repeatable Slices -->
    <sliceLoop :slices="entry.slices" />

  </section>
</template>

<script>
import {mapGetters} from 'vuex'
import { beforeEnter, enter, leave } from '~/mixins/page-transitions'
// import WorkHero from '~/components/work/workHero'

export default {
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
  // components: {
  //   WorkHero
  // },
  transition: {
    name: 'page',
    mode: 'out-in',
    css: false,
    beforeEnter,
    enter,
    leave
  },
  async asyncData ({ app, params, store }) {
    let entry = await store.dispatch('work/getWorkPost', params.slug)
    return {
      document: entry,
      entry: entry.data
    }
  },
  data () {
    return {
      nextPost: null
    }
  },
  computed: {
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
      if (this.nextPost === null) {
        this.nextPost = await this.$store.dispatch({
          type: 'work/getAdjacentPost',
          id: this.document.id,
          dir: ''
        })
      } else if (this.nextPost === undefined) {
        this.nextPost = await this.$store.dispatch({
          type: 'work/getAdjacentPost',
          id: this.document.id,
          dir: 'desc'
        })
      }
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

<style lang="scss" scoped>
@import '~assets/styles/mixins';

</style>
