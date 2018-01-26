<template>
  <div class="imageCaption">
    <div class="imageCaption__overlay is-overlay">
      <div class="imageCaption__overlay__caption" v-html="$prismic.asHtml(caption)"></div>
    </div>
    <img class="imageCaption__overlay__image" v-lazy="img.large.url" :alt="img.alt">
  </div>
</template>

<script>
export default {
  props: ['img', 'caption']
}
</script>

<style lang="scss">
@import '~assets/styles/mixins';
.imageCaption {
  position: relative;
  overflow: hidden;
  &:hover {
    &__overlay__caption{
      visibility: visible;
      opacity: 1;
    }
  }
  &__overlay {
    background: rgba(black, 0.8);
    padding: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    visibility: hidden;
    opacity: 0;
    transition: all 0.5s ease;
    @include mobile() {
      padding: 3rem;
    }
    * > {
      flex: 1 0 auto;
    }
    &__caption {
      p {
        color: white;
        @include mobile() {
          font-size: .8rem;
        }
      }
    }
  }
  &__image {
    display: block;
  }
}
</style>

