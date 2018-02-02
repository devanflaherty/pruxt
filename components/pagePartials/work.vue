<template>
  <section id="workPage" class="workPage" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <workList :work="posts" />
    <transition name="fade-in">
      <div class="workPage__loader loader" v-if="busy"></div>
    </transition>
  </section>
</template>

<script>
import workList from '~/components/work/workList'
import {mapGetters} from 'vuex'

export default {
  props: ['page'],
  components: {
    workList
  },
  data () {
    return {
      busy: false
    }
  },
  computed: {
    ...mapGetters('work', ['doc', 'posts', 'pageIndex', 'totalPages'])
  },
  methods: {
    async loadMore () {
      if (this.pageIndex < this.totalPages) {
        this.busy = true
        await this.$store.dispatch('work/getWork')

        this.busy = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/mixins';
.workPage {
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
