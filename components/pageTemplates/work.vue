<template>
  <section id="featuredWork" class="workPosts">
    <div class="workPosts__cards">
      <workCard v-for="(post, index) in posts.results" :key="index" :post="post"/>
    </div>
  </section>
</template>

<script>
import workCard from '~/components/work/workCard'
import {mapGetters} from 'vuex'

export default {
  props: ['page'],
  components: {
    workCard
  },
  computed: {
    ...mapGetters('work', ['posts'])
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/mixins';
</style>
