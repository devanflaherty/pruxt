<template>
<div class="load-blur-wrap" :style="padding">
  <transition name='fade-in'>
    <img v-if="thumbLoaded" class="placeholder" v-lazy="image.placeholder.url" :alt="image.alt">
  </transition>

  <transition name='fade-in'>
    <img v-if="loaded" :src="image.large.url" :alt="image.alt">
  </transition>
</div>
</template>

<script>
export default {
  props: ['image'],
  data () {
    return {
      thumbLoaded: false,
      loaded: false
    }
  },
  computed: {
    padding () {
      let h = this.image.dimensions.height
      let w = this.image.dimensions.width

      let aspect = (h / w) * 100
      return `padding-top: ${aspect}%`
    }
  },
  methods: {
    loadImage (url) {
      return new Promise((resolve, reject) => {
        let image = new Image()
        image.onload = function () {
          resolve(image)
        }
        image.onerror = function () {
          let msg =
            'Could not load image at ' + url
          reject(new Error(msg))
        }
        image.src = url
      })
    },
    addPlaceholder (src) {
      this.thumbLoaded = true
    },
    addMain (src) {
      this.thumbLoaded = false
      this.loaded = true
    }
  },
  mounted () {
    if (this.image) {
      Promise.all([
        this.loadImage(this.image.placeholder.url)
      ]).then((image) => {
        this.addPlaceholder(this.image.placeholder.url)
      }).catch((error) => {
        console.error(error)
      })

      Promise.all([
        this.loadImage(this.image.large.url)
      ]).then((image) => {
        this.addMain(this.image.large.url)
      }).catch((error) => {
        console.error(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.load-blur-wrap {
  overflow: hidden;
  position: relative;
  height: 0;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
  }
}

.placeholder {
  filter: blur(50px);
  transform: scale(1.2)
}
</style>
