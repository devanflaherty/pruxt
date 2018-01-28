<template>
  <section id="workPost" class="page workPost" v-show="!loading">
    <!-- <WorkHero :class="{'add-margin': margin === 'marginHero'}" :entry="entry" /> -->

    <section class="hero" v-if="entry.work_video.html">
      <div class="hero-body">
        <div class="hero-container container">
          <responsiveVideo
            v-if="entry.work_video"
            :embed="entry.work_video" 
            v-scroll-reveal="{duration: 1000, scale: 1, distance: '-200px'}"/>
        </div>
      </div>
    </section>

    <section class="section work-info">
      <div class="container">
        <div class="columns flex-center">
          <div class="column is-10">
            <h2 class="is-size-1">{{$prismic.asText(entry.title)}}</h2>

            <div class="columns">
              <div class="column is-6">
                <div class="work-approach content"
                  v-if="entry.approach.length > 0"
                  v-html="$prismic.asHtml(entry.approach)"
                  v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', origin: 'bottom'}"></div>
                </div>

                <div class="column is-6">
                  <div class="director roster-member" v-for="(member, index) in entry.work_roster" :key="index">
                    <h6>{{member.member_position}}</h6>
                      <nuxt-link :to="$prismic.asLink(member.member_link)" v-if="member.member_link.id">
                        <span>{{member.member_name}}</span>
                      </nuxt-link>
                      <span v-else>{{member.member_name}}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>

    <!-- Repeatable Slices -->
    <sliceLoop :slices="entry.slices" />

  </section>
</template>

<script>
import {mapGetters} from 'vuex'
// import { beforeEnter, enter, leave } from '~/mixins/page-transitions'
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
  // transition: {
  //   name: 'page',
  //   mode: 'out-in',
  //   css: false,
  //   beforeEnter,
  //   enter,
  //   leave
  // },
  async asyncData ({ app, params, store }) {
    let entry = await store.dispatch('work/getWorkPost', params.slug)
    return {
      document: entry,
      entry: entry.data
    }
  },
  computed: {
    ...mapGetters('site', ['breakpoint']),
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
  created () {
    this.$store.dispatch('site/toggleLoading', true)
  },
  beforeMount () {
    this.setColors(this.entry.page_color, this.entry.primary_color, this.entry.secondary_color)
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

<style lang="scss" scoped>
@import '~assets/styles/mixins';

</style>
