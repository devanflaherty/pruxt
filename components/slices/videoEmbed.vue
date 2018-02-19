<template>
  <article class="section slice__responsiveMedia">
    <div class="container">
      <videoEmbed :embed="media.embed_link"/>
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

