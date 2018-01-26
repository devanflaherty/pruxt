<template>
<article class="slice slice__banner hero" v-if="banner.image_banner.url">
  <blurLoader :image="banner.image_banner" v-if="banner.image_banner.url"/>
  
  <div class="slice__banner__overlay is-overlay"> <!-- try hero-body-->
    <div class="container">
      <h1 class="title slice__banner__overlay__title has-text-white" v-if="banner.title_of_banner.length > 0">
        {{$prismic.asText(banner.title_of_banner)}}
      </h1>
      <div class="rich-text slice__banner__overlay__text" v-html="$prismic.asHtml(banner.description)" v-if="banner.description.length > 0"></div>
      <a class="button slice__banner__overlay__button" :href="$prismic.asLink(banner.button_link)" v-if="banner.button_link.length > 0">{{$prismic.asText(banner.button_label)}}</a>
    </div>
  </div>
</article>
</template>

<script>
export default {
  props: ['slice'],
  data () {
    return {
      banner: this.slice.primary
    }
  }
}
</script>

<style lang="scss" scoped>
.slice {
  &__banner {
    position: relative;
    min-height: 25vh;
    &__overlay {
      display: flex;
      align-items: center;
    }
  }
}
</style>

