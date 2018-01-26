<template>
  <section class="careersPage section" >
    
    <div class="container">
      <div class="columns is-multiline is-marginless">
        <div class="column is-12">
          <div class="title"
            v-html="$prismic.asHtml(page.title)"
            v-scroll-reveal="{scale: 1, distance: '100px', origin: 'left'}"></div>
        </div>
        Careers list
      </div><!-- close columns -->
      
      <!-- Careers LOOP -->
      <!-- <teamCard v-for="(post, index) in team.results" :key="index" :post="post"/> -->
    </div><!-- close container -->

  </section>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Careers',
  props: ['page'],
  computed: {
    ...mapGetters('blog', ['careers'])
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/mixins';

</style>
