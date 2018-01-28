<template>
  <section id="workPage" class="workPosts">
    <workList :work="posts.results" />
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
  computed: {
    ...mapGetters('work', ['posts'])
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/mixins';
</style>
