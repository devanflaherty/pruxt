<template>
  <component :slides="items" :is="gallery.gallery_style" />
</template>

<script>
import Stacked from './_stacked'
import Slider from './_slider'

export default {
  components: {
    Stacked,
    Slider
  },
  props: ['slice'],
  data () {
    return {
      gallery: this.slice.primary,
      items: this.slice.items
    }
  }
}
</script>

<style lang="scss">
@import '~assets/styles/mixins';
</style>
