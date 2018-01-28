<template>
  <article class="section slice__quote">
    <div class="container">
      <blockquote class="slice__quote__block"
        :class="alignment">
        <div class="slice__quote__block__text reveal--stagger" v-html="$prismic.asHtml(quote.quote)"></div>
        <div class="slice__quote__block__author reveal--stagger" v-html="$prismic.asHtml(quote.author)" v-if="quote.author[0]"></div>
      </blockquote>
      <style>
        .slice__quote__block__text strong::before {
          background-color: {{secondaryColor}}
        }
      </style>
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
  },
  mounted () {
    this.$reveal('.reveal--stagger', {distance: '100px', duration: 1000}, 250)
  }
}
</script>

<style lang="scss">
@import '~assets/styles/mixins';
.slice__quote {
  &__block {
    width: 66%;
    margin: 0 auto;
    @include touch () {
      width: 75%;
    }
    @include mobile () {
      width: 90%;
    }
    &__text {
      font-size: 2rem;
      font-weight: 600;
      line-height: 1.2;
      letter-spacing: .25px;

      @include mobile() {
        font-size: 1.25rem;
      }
      strong {
        position: relative;
        display: inline-block;
        font-weight: 600;
        &:before {
          z-index: -1;
          content: '';
          display: inline-block;
          background: $primary;
          height: 38px;
          width: 105%;
          position: absolute;
          top: 0;
          left: -2.5%;
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
      opacity: 0.66;
    }
  }
}
</style>

