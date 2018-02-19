<template>
  <div id="mobileNav" class="mobileNav" :class="{'mobileNav--is-active': mobileNav}">
    <div class="mobileNav__wrap">
      <div class="mobileNav__wrap__mainNav">
        <div class="navbar-item mobile-item" v-for="(link, index) in mainMenu" :key="index">
          <prismic-link :link="link.url">{{link.label}}</prismic-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
// import {TimelineMax} from 'gsap'

export default {
  computed: {
    ...mapGetters('site', ['mobileNav']),
    ...mapGetters('admin', ['mainMenu'])
  },
  watchers: {
    loading () {
      if (this.loading === true) {
        this.$store.dispatch('toggleMobileNav', false)
      }
    }
  }
}
</script>

<style lang="scss">
@import '~assets/styles/mixins';
.mobileNav {
  z-index: 1;
  display: none;
  visibility: hidden;
  text-align: right;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  @include touch () {
    display: block;
  }
  h6 {
    font-weight: 600;
    color: darken($white, 60%);
  }
  &:before {
    content:'';
    background: rgba($black, 0.5);
    display: block;
    position: fixed;
    left: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    transition: all .5s ease;
  }
  &:after {
    content:'';
    background: $white;
    display: block;
    position: fixed;
    right: -100%;
    top: 0;
    width: 50%;
    height: 100%;
    transition: all .5s 0.25s ease;
    @include mobile () {
      width: 100%;
    }
  }
  &__wrap {
    z-index: 10;
    position: absolute;
    right: -100%;
    margin: auto;
    width: 100%;
    height: auto;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    padding-bottom: 3rem;
    top: 140px;
    transition: all 0.5s ease;
    @include mobile () {
      top: 80px;
      padding-left: .5rem;
      padding-right: .5rem;
    }
    &__mainNav {
      margin-bottom: 4rem;
      h6 {
        padding-right: 1rem;
      }
    }
    .navbar-item {
      display: block;
      padding-top: 0;
      padding-bottom: 0;
      a {
        font-size: 2rem;
        font-weight: 600;
        letter-spacing: 2px;
        color: lighten($black, 40%);
        background: none!important;
        transition: color 0.25s ease;
        text-transform: uppercase;
        position: relative;
        &:after {
          font-size: 2rem;
          content: '';
          z-index: -1;
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          margin: 0 auto;
          display: block;
          height: 2.25rem;
          background: transparent;
          width: 0px;
          transition: all 0.33s cubic-bezier(.48, 0, .12, 1.5);
        }
        &:hover {
          color: $black;
          &:after {
            width: 110%;
            background: red;
          }
        }
      }
    }
  }

  &--is-active {
    visibility: visible;
    
    .mobileNav__wrap, &::after {
      right: 0;
    }
    // Transitions In
    &::before {
      opacity: 1;
      transition: all 0.5s ease;
    }
    .mobileNav__wrap {
      transition: all 0.33s 0.33s ease;
    }
  }
}
</style>

