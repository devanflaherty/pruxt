<template>
  <article class="section slice__richText">
    <div class="container">
      <div class="rich-text content" :class="textSize" v-html="$prismic.asHtml(richText.text)"
        v-scroll-reveal="{distance: '100px'}"></div>
    </div>
  </article>
</template>

<script>
export default {
  props: ['slice'],
  data () {
    return {
      richText: this.slice.primary
    }
  },
  computed: {
    textSize () {
      return {
        '': this.richText.textSize === 'Normal',
        'is-small': this.richText.textSize === 'Small',
        'is-medium': this.richText.textSize === 'Medium',
        'is-large': this.richText.textSize === 'Large'
      }
    }
  }
}
</script>
