<template>
  <div :id="document.uid" class="page" :class="contrast">

    <pageHeader :headline="page.hero_headline" :bgImage="page.hero_image" :paraImage="page.parallax_image" :video="page.hero_mp4" />

    <contentTemplate :page="page"/>

    <component :is="template + 'Template'" :page="page" v-if="template !== 'default'" />

    <next v-if="page.next_label" :nextLabel="page.next_label" :nextPreHeading="page.next_pre_heading" :nextLink="page.next_link" :nextFrontColor="page.next_front_color" :nextBackColor="page.next_back_color" />
    
  </div>
</template>

<script>
import pageHeader from '~/components/pageHeader'
import contentTemplate from '~/components/pagePartials/_content'
import tagTemplate from '~/components/pagePartials/tag'
import {beforeEnter, enter, leave} from '~/mixins/transitions'

export default {
  name: 'page',
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
    contentTemplate,
    careersTemplate,
    contactTemplate
  },
  async asyncData ({ app, params, error, store }) {
    try {
      let page = await store.dispatch('page/getPage', params.page)

      return {
        document: page,
        page: page.data,
        template: page.data.page_template
      }
    } catch (err) {
      error({statusCode: 404, message: `The page you are looking for does not exist. `, err: err})
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
      return this.page.hero_image.large.url
    },
    seoUrl () {
      return 'https://stfrd.com' + this.$route.fullPath
    }
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
