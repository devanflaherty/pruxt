<template>
  <header class="pageHeader hero is-medium">
    <div class="is-overlay pageHeader__bgImage" :style="backgroundImage" v-if="backgroundImage"></div>

    <div class="hero-body pageHeader__heroBody">
      <div class="container">
        <div class="pageHeader__heroBody__headline" v-html="$prismic.asHtml(headline)"></div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: ['headline', 'heroImage'],
  computed: {
    backgroundImage () {
      if (this.heroImage.large.url) {
        return `background-image: url(${this.heroImage.large.url})`
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/mixins';
.pageHeader {
  position: relative;
  overflow: hidden;
  &__bgImage {
    background-size: cover!important;
    background-position: center;
  }
  &__heroBody {
    &__headline {
      z-index: 11;
      .title {
        color: $white!important;
        font-weight: 700;
      }
    }
  }
}
</style>

