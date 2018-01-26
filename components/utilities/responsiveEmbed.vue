<template>
<div class="responsiveWrap">
  <div 
    ref="videoWrap"
    class="responsive-video"
    :style="`padding: ${padding}% 0 0 0`"
    v-html="embed.html">
  </div>
</div>
</template>

<script>
export default {
  props: ['embed'],
  data () {
    return {
      videoReady: false,
      videoWidth: 16,
      videoHeight: 9
    }
  },
  computed: {
    padding () {
      let pad = (this.videoHeight / this.videoWidth) * 100
      return pad
    }
  },
  methods: {
    getVideoDimensions () {
      let wrap = this.$refs.videoWrap
      let iframe = wrap.querySelector('iframe')

      // videoHeight
      if (this.embed.height) {
        this.videoHeight = this.embed.height
      } else {
        this.videoHeight = iframe.clientHeight
      }

      // videoWidth
      if (this.embed.width) {
        this.videoWidth = this.embed.width
      } else {
        this.videoWidth = iframe.clientWidth
      }
    }
  },
  mounted () {
    this.getVideoDimensions()
    this.videoReady = true
    console.log(this.videoHeight, this.videoWidth)
  }
}
</script>

<style lang="scss">
.responsive-video {
  padding: 56.25% 0 0 0;
  position: relative;
  > * {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
}
</style>
