<template>
  <article 
    class="slice__imageShowcase"
    :class="{'slice__imageShowcase--has-padding': showcase.padding === 'true'}"
    :style="`background-color: ${showcase.showcase_color}`" 
    v-if="showcase.showcase_image.large.url">
    <div class="slice__imageShowcase__container">
      <img class="slice__imageShowcase__container__image" :width="showcase.showcase_image.large.dimensions.width" :height="showcase.showcase_image.large.dimensions.height" :src="showcase.showcase_image.large.url" :alt="showcase.showcase_image.alt"
        v-scroll-reveal="{distance: '100px', delay: 500, duration: 1000}">
    </div>
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
  overflow: hidden;
  &--has-padding {
    padding-top: 20vh;
    padding-bottom: 20vh;
    @include touch () {
      padding-top: 15vh;
      padding-bottom: 15vh;
    }
    @include mobile () {
      padding-top: 10vh;
      padding-bottom: 10vh;
    }
    .slice__imageShowcase__container {
      border-radius: 4px;
      box-shadow: 4px 4px 70px 15px rgba(2, 2, 2, .1);
    }
  }
  &__container {
    display: flex;
    overflow: hidden;
    max-height: 620px;
    max-width: 900px;
    min-width: 280px;
    margin-right: 5vw;
    margin-left: 5vw;
    flex-direction: column;
    align-items: center;
    @include touch () {
      max-width: 70vw;
      height: auto;
    }
    @include mobile () {
      max-width: 80vw;
      height: auto;
    }
    &__image {
      margin: 0 auto;
      display: block;
    }
  }
}
</style>
