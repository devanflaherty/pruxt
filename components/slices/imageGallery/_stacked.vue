<template>
  <article class="slice slice__galleryStacked section">
    <div class="container">
      <div class="columns is-multiline">
        <article class="column slice__galleryStacked__slide is-6 is-paddingless" v-for="(slide, index) in slides" :key="index">
          
          <imageCaption :img="slide.gallery_image" :caption="slide.slide_caption" v-if="slide.slide_caption" />
        
          <img class="slice__galleryStacked__slide__image" v-lazy="slide.gallery_image.url"  :alt="slide.gallery_image.alt" v-else>

        </article>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: ['slides']
}
</script>

<style lang="scss" scoped>
.slice__galleryStacked {
  &__slide {
    &__image {
      width: 100%;
      height: auto;
      display: block;
    }
  }
}
</style>
