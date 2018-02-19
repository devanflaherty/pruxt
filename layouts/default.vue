<template>
  <div class="main">
    <transition name="fade-in">
      <div id="loader" v-if="loading">
        <div class="loader"></div>
      </div>
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

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  .navbar {
    flex: 0 1 auto;
  }
  .page {
    flex: 1 0 auto;
    min-height: 100vh;
  }
  .footer {
    flex: 0 1 auto;
  }
}

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
  z-index: 500;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0; top: 0; bottom: 0; right: 0;
  .loader {
    width: 40px;
    height: 40px;
  }
}
</style>
