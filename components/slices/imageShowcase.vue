<template>
  <article class="slice__imageShowcase" :style="`background-color: ${showcase.showcase_color}`" v-if="showcase.showcase_image.large.url">
    <img class="slice__imageShowcase__image" :src="showcase.showcase_image.large.url" :alt="showcase.showcase_image.alt"
      v-scroll-reveal="{distance: '100px', delay: '250'}">
  </article>
</template>

<script>
export default {
  props: ['slice'],
  data () {
    return {
      showcase: this.slice.primary
    }
  }
}
</script>

<style lang="scss">
@import '~assets/styles/mixins';

.slice__imageShowcase {
  display: flex;
  align-items: center;
  justify-content: center;
  &__image {
    margin: 0 auto;
    display: block;
  }
}
</style>
