<template>
  <article class="section slice__quote">
    <div class="container">
      <blockquote class="slice__quote__block"
        :class="alignment"
        v-scroll-reveal="{distance: '100px', delay: '250'}">
        <div class="slice__quote__block__text" v-html="$prismic.asHtml(quote.quote)"></div>
        <div class="slice__quote__block__author" v-html="$prismic.asHtml(quote.author)" v-if="quote.author[0]"></div>
      </blockquote>
    </div>
  </article>
</template>

<script>
export default {
  props: ['slice'],
  data () {
    return {
      quote: this.slice.primary
    }
  },
  computed: {
    alignment () {
      return {
        'has-text-left': this.quote.alignment === 'Left',
        'has-text-centered': this.quote.alignment === 'Center',
        'has-text-right': this.quote.alignment === 'Right'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/mixins';
.slice__quote {
  &__block {
    &__text {
      font-size: 1.65rem;
      font-weight: 300;
      line-height: 1.2;
      letter-spacing: .25px;
      @include mobile() {
        width: 90%;
        font-size: 1.25rem;
      }
      strong {
        font-weight: 400;
        position: relative;
        display: inline-block;
        &:before {
          z-index: -1;
          content: '';
          display: inline-block;
          background: $primary;
          height: 30px;
          width: 95%;
          position: absolute;
          top: 1.5rem;
          left: 2rem;
          @include mobile() {
            top: .75rem;
            height: 20px;
          }
        }
      }
    }
    &__author {
      margin-top: 2rem;
      text-align: center;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 2px;
    }
  }
}
</style>

