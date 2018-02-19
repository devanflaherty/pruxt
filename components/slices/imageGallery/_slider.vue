<template>
  <article class="slice slice__gallery"
    v-scroll-reveal="{scale: 1, distance: 0}"
    @beforeReveal="reveal">
    <div class="swiper-container slice__gallery__container" ref="mySwiper">
      <div class="swiper-wrapper slice__gallery__container__wrapper">
        <div class="swiper-slide slice__gallery__container__wrapper__slide" v-for="(slide, index) in slides" :key="index">
          
          <div data-swiper-parallax="25%" class="slice__gallery__container__wrapper__slide__image" :style="`background-image: url(${slide.gallery_image.large.url})`">
          </div>

        </div>
      </div>
    
      <!-- If we need navigation buttons -->
      <div class="swiper-button-prev swiper-navigation slice__gallery__container__navigation slice__gallery__container__navigation--prev" >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 44"><path d="M0,22L22,0l2.1,2.1L4.2,22l19.9,19.9L22,44L0,22L0,22L0,22z"></path></svg>
      </div>
      <div class="swiper-button-next swiper-navigation slice__gallery__container__navigation slice__gallery__container__navigation--next" >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 44"><path d="M27,22L27,22L5,44l-2.1-2.1L22.8,22L2.9,2.1L5,0L27,22L27,22z"></path></svg>
      </div>

    </div>
    <div class="swiper-pagination"></div>
    <!-- close swiper -->
  </article>
</template>

<script>
export default {
  props: ['slides'],
  data () {
    return {
      ready: false,
      activeSlide: 0,
      visible: false,
      swiperOption: {
        speed: 1000,
        loop: true,
        slidesPerView: 1,
        observer: true,
        lazyLoading: true,
        parallax: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        },
        on: {
          slideChange: (swiper) => {
            this.activeSlide = this.$refs.mySwiper.swiper.realIndex
          }
        }
      }
    }
  },
  watch: {
    slides () {
      this.initSwiper()
    }
  },
  methods: {
    reveal () {
      this.visible = true
    },
    slideTo (index) {
      let i = index + 1
      this.$refs.mySwiper.swiper.slideTo(i)
    },
    pauseSlider () {
      this.$refs.mySwiper.swiper.autoplay.stop()
    },
    playSlider () {
      this.$refs.mySwiper.swiper.autoplay.start()
    },
    readyPlayer: async function () {
      if (this.$refs.mySwiper) {
        return true
      }
    },
    initSwiper () {
      this.readyPlayer().then(() => {
        let swiper = this.$refs.mySwiper
        this.ready = true
        this.$swiper(swiper, this.swiperOption)
      })
    }
  }
}
</script>

<style lang="scss">
@import '~swiper/dist/css/swiper.css';
@import '~assets/styles/mixins';

.slice__gallery {
  padding-left: 0;
  padding-right: 0; 
  position: relative;
  width: 100%;
  &__container {
    height: 0;
    padding-top: 56.25%;
    display: flex;

    &__wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      &__slide {
        height: 100%;
        flex: 1 0 100%;
        position: relative;
        overflow: hidden;
        &__image {
          height: 100%;
          width: 100%;
          background-size: cover!important;
          background-position: center;
        }
      }
    }

    &__navigation {
      background: none;
      opacity: 0;
      visibility: hidden;
      transition: all 0.5s;
      svg {
        fill: $black;
        transition: all 0.5s ease;
      }
      &:hover {
        svg {
          transform: scale(1.1);
        }
      }
      &--prev {
        transform: translate3d(-20px, 0, 0);
      }
      &--next {
        transform: translate3d(20px, 0, 0);
      }
    }

    &__pagination {
      width: 100%;
      display: flex;
      justify-content: center;
      margin: 1rem 0;
      &-bullet {
        background: $primary;
        opacity: 1;
        margin: 0.25rem;
        &-active {
          background: darken($primary, 20%);
        }
      }
    }

    &:hover {
      .swiper-navigation {
        opacity: 1;
        visibility: visible;
        transform: translate3d(0,0,0)
      }
    }
  }
}
</style>
