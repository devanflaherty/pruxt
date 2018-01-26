<template>
  <article class="section slice__responsiveMedia">
    <div class="container">
      <videoEmbed :embed="media.embed_link"/>
      <a v-scroll-reveal="{distance: '100px'}" :href="$prismic.asLink(media.button_url)" class="slice__responsiveMedia__button button is-outlined is-primary is-small">{{media.button_label}}</a>
    </div>
  </article>
</template>

<script>
export default {
  props: ['slice'],
  data () {
    return {
      media: this.slice.primary
    }
  }
}
</script>

<style lang="scss">
.slice {
  &__responsiveMedia__button {
    margin-top: 2rem;
  }
}
</style>

