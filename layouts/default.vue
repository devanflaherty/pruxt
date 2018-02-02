<template>
  <div class="main">
    <transition name="fade-in">
      <div id="loader" v-if="loading" class="home-loading has-text-white is-size-1"><h1><span class="loader"></span></h1></div>
    </transition>
    <siteNav />
    <nuxt/>
    <siteFooter />
  </div>
</template>

<script>
import siteNav from '~/components/siteNav'
import siteFooter from '~/components/siteFooter'
import breakpoints from '~/mixins/breakpoints'

export default {
  components: {
    siteNav,
    siteFooter
  },
  mixins: [breakpoints]
}
</script>

<style lang="scss">
.wio-link {
  position: absolute;
  z-index: 50;
  left: 0;
  top: 0;
  background: rgba(white, 0.2);
  padding: .5rem 1rem;
  transition: all 0.5s ease;
  &:hover {
    background: white;
  }
}

#loader {
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0; top: 0;
  h1 {
    color: black;
    font-weight: 800;
    span {
      font-size: 44px!important;
      color: black;
      display: inline-block;
    }
  }
}
</style>
