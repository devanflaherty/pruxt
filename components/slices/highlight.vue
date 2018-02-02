<template>
  <article class="section slice__highlight">
    <div class="container">
      <div class="columns flex-align-middle">        
        <div class="column is-5 slice__highlight__textColumn" :class="textOrder">
          <div class="slice__highlight__textColumn__body"
            v-scroll-reveal="{duration: 1000, scale: 0, distance: '60px'}">
            <div class="slice__highlight__textColumn__body__content content" v-html="$prismic.asHtml(highlight.highlight_body)"></div>
          </div>
        </div>

        <div class="column is-7 slice__highlight__mediaColumn" :class="mediaOrder">
          <div class="slice__highlight__mediaColumn__media"
            v-scroll-reveal="{duration: 1000, scale: 0, distance: '60px', delay: 500}">

              <responsiveEmbed :embed="highlight.highlight_embed" v-if="highlight.highlight_embed.html" />
                        
              <img class="lazy" :width="highlight.highlight_thumbnail.dimensions.width" :height="highlight.highlight_thumbnail.dimensions.height" v-lazy="highlight.highlight_thumbnail.url" v-else />

          </div>
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
      highlight: this.slice.primary
    }
  },
  computed: {
    mediaOrder () {
      return {
        'is-first': this.highlight.highlight_placement === 'Left',
        'is-second': this.highlight.highlight_placement === 'Right'
      }
    },
    textOrder () {
      return {
        'is-second': this.highlight.highlight_placement === 'Left',
        'is-first': this.highlight.highlight_placement === 'Right'
      }
    }
  }
}
</script>

<style lang="scss">
@import '~assets/styles/mixins';
.slice__highlight {
  .columns {
    display: flex;
    @include mobile () {
      flex-wrap: wrap;
      .column {
        flex: 1 0 100%;
      }
    }
  }
  &__textColumn {
    @include mobile () {
      order: 2!important;
    }
    &__body {
      display: flex;
      align-items: center;
      justify-content: center;
      &__content {
        @include mobile() {
          padding: 0rem;
        }
        &.content {
          width: 100%;
        }
      }
    }
  }
  &__mediaColumn {
    @include mobile () {
      order: 1!important;
    }
    &__media {
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      height: 100%;
      .responsiveWrap {
        flex: 1 0 100%;
      }
    }
  }
}

.is-first {
  order: 1;
}
.is-second {
  order: 2;
}
.flex-align-middle {
  align-items: center;
}
</style>