<template>
  <section class="page-default section push-top">
    <div class="container page-wrap" v-if="page.title.text">
      <div class="page-welcome columns">
        <div class="column">
          <div class="opening-headline"
            v-html="$prismic.asHtml(page.title)"
            v-scroll-reveal="{scale: 1, distance: '100px', origin: 'left'}"></div>
        </div>
      </div>
    </div>

    <div class="container" v-if="page.content.length > 0">
      <div class="rich-text"
        v-html="$prismic.asHtml(page.content)"
        v-scroll-reveal="{duration: 1000, scale: 1, distance: '100px', origin: 'bottom'}"></div>
    </div>
    
    <!-- Repeatable Slices -->
    <sliceLoop :slices="page.slices" />
        
  </section>
</template>

<script>
export default {
  name: 'default',
  props: ['page']
}
</script>

<style scoped>
</style>
