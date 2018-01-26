<template>
  <section class="teamPosts section" >
    
    <!-- teamPosts__cards -->
    <div class="teamPosts__cards" v-if="posts.results.length > 0">
      <teamCard v-for="(post, index) in posts.results" :key="index" :post="post"/>
    </div>
    <!-- close teamPosts__cards -->

  </section>
</template>

<script>
import teamCard from '~/components/team/teamCard'
// import {TimelineMax} from 'gsap'
import {mapGetters} from 'vuex'

export default {
  props: ['page'],
  components: {
    teamCard
  },
  computed: {
    ...mapGetters('team', ['posts'])
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/mixins';

</style>
