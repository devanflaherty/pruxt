<template>
  <section class="careersPage section" v-if="careers.results.length > 0">
    <div class="container">
      <h5 class="careersPage__headline">Open Positions</h5>
      
      <div class="columns is-multiline careersPage__columns">
        <div class="column is-12 careersPage__columns__position" v-for="(career, index) in careers.results" :key="index">
          <h4>{{$prismic.asText(career.data.title)}}</h4>
          <div class="content" v-html="$prismic.asHtml(career.data.excerpt)" v-if="$prismic.asText(career.data.excerpt)"></div>
          <div class="content" v-html="$prismic.asHtml(career.data.content)" v-else></div>
          <nuxt-link class="button is-black is-rounded is-styled is-small" :to="`/news/${career.uid}`">Learn More</nuxt-link>
        </div>
      </div><!-- close columns -->     
    </div><!-- close container -->

  </section>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Careers',
  props: ['page'],
  computed: {
    ...mapGetters('news', ['careers'])
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/mixins';
.careersPage {
  &__headline {
    text-transform: uppercase;
    font-weight: 700;
    margin-bottom: 3rem;
  }
  &__columns {
    width: 50%;
    @include touch() {
      width: 100%;
    }
    &__position {
      margin-bottom: 3rem;
      h4 {
        font-weight: 600;
        font-size: 1.5rem;
      }
    }
  }
}
</style>
