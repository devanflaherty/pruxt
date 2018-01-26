<template>
  <div id="workArchive" class="page workArchive" :class="contrast" v-show="!loading">

    <defaultTemplate :page="page"/>

    <workTemplate :page="page" />
    
  </div>
</template>

<script>
import defaultTemplate from '~/components/pageTemplates/default'
import workTemplate from '~/components/pageTemplates/work'

export default {
  name: 'workPage',
  // transition: {
  //   name: 'page',
  //   mode: 'out-in',
  //   css: false,
  //   beforeEnter,
  //   enter,
  //   leave
  // },
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
    defaultTemplate,
    workTemplate
  },
  async asyncData ({ app, params, error, store }) {
    try {
      let page = await store.dispatch('page/getPage', 'work')
      // Store Work in Store
      await store.dispatch('work/getWork')

      return {
        document: page,
        page: page.data,
        template: page.data.page_template
      }
    } catch (err) {
      error({statusCode: 404, message: `The page you are looking for does not exist. Please add a 'page' with the uid of "work". `, err: err})
    }
  },
  computed: {
    contrast () {
      return {
        'has-text-white': this.page.page_color === 'Dark',
        'has-text-black': this.page.page_color === 'Light'
      }
    },
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

