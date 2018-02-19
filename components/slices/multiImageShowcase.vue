<template>
  <article class="slice__multiImageShowcase" :style="backgroundColor">
    <div class="slice__multiImageShowcase__wrap">
      <div class="slice__multiImageShowcase__wrap__column" v-for="(image, index) in images" :key="index">
        <div class="slice__multiImageShowcase__wrap__column__card">
          <img class="lazy" v-lazy="image.showcase_image.large.url" :width="image.showcase_image.large.dimensions.width" :height="image.showcase_image.large.dimensions.height">
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: ['slice'],
  data () {
    return {
      showcase: this.slice,
      images: this.slice.items
    }
  },
  computed: {
    backgroundColor () {
      return `background-color: ${this.showcase.primary.showcase_color};`
    }
  },
  mounted () {
    this.$reveal('.slice__multiImageShowcase__wrap__column', {distance: '60px', duration: 1000}, 250)
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/mixins';

.slice__multiImageShowcase {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 30vh 10vw;
  @include touch () {
    padding-top: 15vh;
    padding-bottom: 15vh;
  }
  @include mobile () {
    padding-top: 10vh;
    padding-bottom: 10vh;
  }
  &__wrap {
    display: flex;
    margin-right: 5vw;
    margin-left: 5vw;
    &__column {
      overflow: hidden;
      width: 300px;
      max-width: 300px;
      margin-right: 2rem;
      margin-left: 2rem;
      border-radius: 6px;
      box-shadow: 0 0 40px 1px rgba(0, 0, 0, .2);
      @include mobile () {
        width: 240px;
        max-width: 240px;
        margin-right: 1rem;
        margin-left: 1rem;
      }
      &__card {
        height: 100%;
        width: 100%;
        img {
          display: block;
        }
      }
    }
  }
}
</style>