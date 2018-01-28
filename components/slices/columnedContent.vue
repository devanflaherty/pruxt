<template>
  <article class="section slice__columnedContent">
    <div class="container">
      <h2 v-if="headline.length > 0" class="slice__columnedContent__headline has-text-primary">{{$prismic.asText(headline)}}</h2>
      
      <div class="columns" :class="align">
        <div 
          class="column slice__columnedContent__column" 
          :class="[offset(column.offset), layout(column.layout), mobileHide(column.mobile_hide)]" 
          v-for="(column, index) in slice.items" :key="index"
          v-scroll-reveal="{duration: 2000, scale: 0, distance: '60px', delay: index * 250}">
            <div v-if="column.content_body.length > 0" class="content" :class="textSize(column.p_text_size)" v-html="$prismic.asHtml(column.content_body)"></div>
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
      headline: this.slice.primary.section_headline,
      alignment: this.slice.primary.vertical_alignment
    }
  },
  computed: {
    align () {
      return {
        'flex-align-top': this.alignment === 'Top',
        'flex-align-center': this.alignment === 'Center',
        'flex-align-bottom': this.alignment === 'Bottom'
      }
    }
  },
  methods: {
    layout (layout) {
      return `is-${layout}`
    },
    offset (offset) {
      if (offset) {
        return `is-offset-${offset}`
      } else {
        return ''
      }
    },
    mobileHide (bool) {
      if (bool) {
        return 'is-hidden-mobile'
      }
    },
    textSize (size) {
      return {
        '': size === 'Normal',
        'is-small': size === 'Small',
        'is-medium': size === 'Medium',
        'is-large': size === 'Large'
      }
    }
  }
}
</script>

<style lang="scss">
@import "~assets/styles/mixins";
.slice {
  &__columnedContent {
    &--push-top {
      margin-top: 0;
      @include mobile () {
        margin-top: 0;
      }
    }
    &__headline {
      margin-bottom: 2rem;
    }

    &__column {
      .content {
        img {
          width: 100%;
        }
      }
    }
  }
}

.column {
  @include mobile() {
    padding: 1rem;
  }
}
.flex-align {
  &-top {
    align-items: flex-start;
  }
  &-center {
    align-items: center;
  }
  &-bottom {
    align-items: flex-end;
  }
}
</style>