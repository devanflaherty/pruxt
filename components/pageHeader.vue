<template>
  <header>
    <div class="is-overlay bg-overlay" v-if="excerpt"></div>

    <div v-if="backgroundImage" class="pageHeader hero is-large" :class="{'is-large': breakpoint >= 2, 'is-fullheight': breakpoint === 1}">
      <div class="pageHeader__heroOverlay is-overlay" :class="{'rellax': !hasVideo}" data-rellax-speed="-1" :style="backgroundImage" v-if="backgroundImage">
        <video 
          ref="heroVideo" 
          class="pageHeader__heroOverlay__video" 
          loop autoplay muted playsinline webkit-playsinline
          :poster="bgImage.large.url"
          :src="video.url" 
          v-observe-visibility="visibilityChanged"
          :class="{'is-ready': videoReady}"
          v-if="hasVideo"
          >
        </video>
      </div>

      <div class="hero-body pageHeader__heroBody">
        <div class="container">
          <div class="pageHeader__heroBody__headline" v-html="$prismic.asHtml(headline)"></div>
          <div class="pageHeader__heroBody__excerpt" v-if="excerpt" v-html="$prismic.asHtml(excerpt)"></div>
        </div>
      </div>
    </div><!-- close hero -->
    
    <div v-else class="pageHeader hero is-large" :class="{'is-large': breakpoint >= 2, 'is-fullheight': breakpoint === 1}" :style="`background-color: ${primaryColor}`">
      <div class="hero-body pageHeader__heroBody">
        <div class="container">
          <div class="pageHeader__heroBody__headline" v-html="$prismic.asHtml(headline)"></div>
          <div class="pageHeader__heroBody__excerpt" v-if="excerpt" v-html="$prismic.asHtml(excerpt)"></div>
        </div>
      </div>
    </div>

    <transition name="fade-in" appear>
      <div class="headerParallax" v-if="parallaxImage" :style="aspectRatio">
        <div class="headerParallax__colorMask" :class="{'is-visible': showParallax}" :style="`background-color: ${primaryColor}`"></div>
        <div class="headerParallax__image" :style="aspectRatio">
          <div class="headerParallax__image__slice slice1" :style="parallaxImage"></div>
          <div class="headerParallax__image__slice slice2" :style="parallaxImage"></div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script>
export default {
  props: ['headline', 'bgImage', 'paraImage', 'video', 'excerpt'],
  data () {
    return {
      videoReady: false,
      isVisible: true,
      showParallax: false,
      paraHeight: null,
      paraWidth: null
    }
  },
  computed: {
    hasVideo () {
      if (this.video && this.video.url !== '') {
        return true
      } else {
        return false
      }
    },
    backgroundImage () {
      if (this.bgImage.url) {
        return `background-image: url(${this.bgImage.large.url})`
      } else {
        return false
      }
    },
    parallaxImage () {
      if (this.paraImage && this.paraImage.url) {
        return `background-image: url(${this.paraImage.large.url})`
      } else {
        return false
      }
    },
    aspectRatio () {
      let aspect = (this.paraImage.dimensions.height / this.paraImage.dimensions.width) * 100
      let width = (this.paraHeight / aspect) * 100
      return `width: ${width}px; height: ${this.paraHeight}px`
    }
  },
  watch: {
    isVisible (vis) {
      let video = this.$refs.heroVideo
      if (vis) {
        video.play()
      } else {
        video.pause()
      }
    },
    breakpoint (b) {
      this.setParaSize()
    }
  },
  methods: {
    visibilityChanged (isVisible, entry) {
      this.isVisible = isVisible
      console.log(entry)
    },
    loadVideo () {
      let video = this.$refs.heroVideo

      video.oncanplaythrough = () => {
        this.videoReady = true
      }
    },
    setParaSize () {
      if (this.parallaxImage) {
        if (this.breakpoint === 1) {
          this.paraHeight = 240
        } else if (this.breakpoint === 2) {
          this.paraHeight = 320
        } else if (this.breakpoint > 2) {
          this.paraHeight = 440
        }
      }
    },
    initHeaderScrollmagic () {
      let paraHeader = this.$TimelineMax

      paraHeader
        .fromTo('.slice1', 2, {
          y: 0
        }, {
          y: -100
        }, 0)
        .fromTo('.slice2', 2, {
          y: 0
        }, {
          y: -60
        }, 0)

      const paraImage = new this.$scrollmagic.Scene({
        duration: '300%',
        triggerHook: 'onEnter'
      })
        .setTween(paraHeader)
        // .addIndicators({name: 'paraHeader'})

      this.$controller.$emit('addScene', 'paraImage', paraImage)
    }
  },
  created () {
    this.setParaSize()
  },
  mounted () {
    if (this.hasVideo === true) {
      this.loadVideo()
    }
    if (this.backgroundImage && !this.hasVideo) {
      this.$rellax('.rellax')
    }
    if (this.parallaxImage) {
      setTimeout(() => {
        this.showParallax = true
        this.initHeaderScrollmagic()
      }, 250)
    }
  }
}
</script>

<style lang="scss">
@import '~assets/styles/mixins';
header {
  position: relative;
  z-index: 2;
  .bg-overlay {
    z-index: 4;
    background: rgba($black, 0.33);
  }
}

.pageHeader {
  position: relative;
  overflow: hidden;
  &.is-fullheight {
    height: 90vh!important;
    min-height: 90vh!important;
  }
  &__heroOverlay {
    overflow: hidden;
    background-size: cover!important;
    background-position: center;
    &__video {
      object-fit: cover!important;
      height: 100%;
      width: 100%;
      position: absolute;
      opacity: 0;
      transition: all 0.5s ease;
      &.is-ready {
        opacity: 1;
      }
      // @include mobile () {
      //   display: none;
      // }
    }
  }
  &__heroBody {
    position: relative;
    &__headline {
      z-index: 10;
      position: relative;
      text-transform: uppercase;
      .title {
        color: $white!important;
        font-weight: 700;
        margin: 0!important;
      }
    }
    &__excerpt {
      z-index: 10;
      position: relative;
      font-weight: 600;
      color: rgba($white, 0.66);
      margin-top: 2rem;
      margin-left: 2rem;
      :before {
        content: '— ';
      }
    }
  }
}

.headerParallax {
  position: absolute;
  right: 7%;
  bottom: -6%;
  @include mobile () {
    display: none;
    right: 1%;
    bottom: -5%;
  }
  &__colorMask {
    background: transparent;
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    transform: translate3d(-16px, -16px, 0);
    height: calc(100% + 16px);
    width: calc(50% + 16px);
    transition: all 0.5s 1s ease;
    opacity: 0;
    visibility: hidden;
    mix-blend-mode: multiply;
    &.is-visible {
      opacity: 1;
      visibility: visible;
    }
  }
  &__image {
    display: flex;
    z-index: 1;
    &__slice {
      width: 50%;
      height: 100%;
      background-size: cover;
      &:nth-child(2) {
        background-position: 100% center;
      }
    }
  }
}
</style>

