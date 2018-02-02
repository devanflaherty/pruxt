<template>
  <section class="blogPage section">
    <div class="container" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <div class="columns is-multiline is-marginless">
        <div class="column is-6 is-marginless is-paddingless" v-for="(post, index) in posts" :key="index">
          <!-- Blog LOOP -->
          <newsCard :post="post"/>
        </div>
      </div>
      <transition name="fade-in">
        <div class="blogPage__loader loader" v-if="busy"></div>
      </transition>
    </div><!-- close container -->

  </section>
</template>

<script>
import newsCard from '~/components/news/newsCard'
import {mapGetters} from 'vuex'

export default {
  name: 'News',
  props: ['page'],
  components: {
    newsCard
  },
  data () {
    return {
      busy: false
    }
  },
  computed: {
    ...mapGetters('blog', ['doc', 'posts', 'pageIndex', 'totalPages'])
  },
  methods: {
    async loadMore () {
      if (this.pageIndex < this.totalPages) {
        this.busy = true
        await this.$store.dispatch('blog/getBlog')

        this.busy = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/mixins';
.blogPage {
  &__loader {
    text-align: center;
    margin: 0 auto;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
