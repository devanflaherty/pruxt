<template>
  <section class="contactPage section" >
    
    <div class="container">
      <div class="title"
        v-html="$prismic.asHtml(page.title)"
        v-scroll-reveal="{scale: 1, distance: '100px', origin: 'left'}"></div>

        Contact Form

    </div><!-- close container -->

  </section>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Contact',
  props: ['page'],
  computed: {
    ...mapGetters('admin', ['contactEmail'])
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/mixins';

</style>
