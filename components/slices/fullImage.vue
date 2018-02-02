<template>
  <article class="slice__fullWidthImage" v-if="fullImage.full_image.large.url">
    <img class="lazy" v-lazy="fullImage.full_image.large.url" :alt="fullImage.full_image.alt">
  </article>
</template>

<script>
export default {
  props: ['slice'],
  data () {
    return {
      fullImage: this.slice.primary
    }
  }
}
</script>

<style lang="scss">
@import '~assets/styles/mixins';
.slice__fullWidthImage {
  overflow: hidden;
  img {
    display: block;
  }
}
</style>
