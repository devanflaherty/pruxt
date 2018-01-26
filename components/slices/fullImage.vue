<template>
  <article class="slice__fullWidthImage" v-if="fullImage.full_image.large.url">
    <img :src="fullImage.full_image.large.url" :alt="fullImage.full_image.alt"
      v-scroll-reveal="{distance: '100px', delay: '250'}">
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
// @import '~assets/styles/mixins';
</style>
