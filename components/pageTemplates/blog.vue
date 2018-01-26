<template>
  <section class="blogPage section" >
    
    <div class="container">
      <div class="columns is-multiline is-marginless">
        <div class="column is-12">
          <div class="title"
            v-html="$prismic.asHtml(page.title)"
            v-scroll-reveal="{scale: 1, distance: '100px', origin: 'left'}"></div>
        </div>

        Blog List
      </div><!-- close columns -->
      
      <!-- Blog LOOP -->
      <!-- <teamCard v-for="(post, index) in team.results" :key="index" :post="post"/> -->
    </div><!-- close container -->

  </section>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Blog',
  props: ['page'],
  computed: {
    ...mapGetters('blog', ['posts'])
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/mixins';

</style>
