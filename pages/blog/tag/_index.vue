<template>
  <div id="newsArchive" class="page newsArchive">
    
    <pageHeader :headline="page.hero_headline" :bgImage="page.hero_image" :paraImage="page.parallax_image" :video="page.hero_mp4" />

    <blogTemplate :page="page" />
    
  </div>
</template>

<script>
import pageHeader from '~/components/pageHeader'
import blogTemplate from '~/components/pagePartials/blog'
import {beforeEnter, enter, leave} from '~/mixins/transitions'

export default {
  name: 'newsPage',
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
    blogTemplate
  },
  async asyncData ({ app, params, error, store }) {
    try {
      let page = await store.dispatch('page/getPage', 'news')
      // Store Work in Store
      await store.dispatch('blog/filterPostByTag', [params.tag])

      return {
        document: page,
        page: page.data
      }
    } catch (err) {
      error({statusCode: 404, message: `The page you are looking for does not exist. `, err: err})
    }
  },
  computed: {
    seoTitle () {
      if (this.page.meta_title > 0) {
        return this.page.meta_title
      } else {
        return this.$prismic.asText(this.page.title)
      }
    },
    seoDesc () {
      if (this.page.meta_description) return this.page.meta_description
      return this.$prismic.asText(this.page.excerpt)
    },
    seoImage () {
      if (this.page.card_image) return this.page.card_image.url
      return this.page.feature_image.large.url
    },
    seoUrl () {
      return 'https://stfrd.com' + this.$route.fullPath
    }
  },
  created () {
    this.$store.dispatch('site/toggleLoading', true)
  },
  beforeMount () {
    this.setColors(this.page.page_color, this.page.primary_color, this.page.secondary_color)
  },
  mounted () {
    if (this.document) {
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

