<template>
  <section id="home" class="page">
    
    <pageHeader :headline="home.hero_headline" :heroImage="home.hero_image" />
    
    <!-- <workList :work="home.featured_work" class="padding-large"/> -->
    
  </section>
</template>

<script>
import pageHeader from '~/components/pageHeader'
import workList from '~/components/work/workList'

export default {
  components: {
    pageHeader,
    workList
  },
  async asyncData ({ store, error }) {
    try {
      let home = await store.dispatch('page/getHome')

      return {
        document: home,
        home: home.data
      }
    } catch (err) {
      error({statusCode: 404, message: `The page you are looking for does not exist. `, err: err})
    }
  },
  head () {
    return {
      title: 'Home'
    }
  },
  data () {
    return {
      ticking: false
    }
  },
  beforeMount () {
    this.setColors('Dark', '#e51717', '#242424')
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

<style scoped lang="scss">
@import '~assets/styles/mixins';
.padding-large {
  padding-top: 10rem;
  padding-bottom: 10rem;
}
</style>
