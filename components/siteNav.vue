<template>
<nav class="navbar is-transparent">
  <transition name="nav-in" appear>
    <div class="navbar-brand" v-if="mainMenu && navVis">
      <div class="navbar-item" >
        Logo
      </div>
      <div class="nav-burg" :class="{'is-active': mobileNav}" @click="showMobileNav">
        <span :style="`background-color: ${primaryColor}`"></span>
        <span :style="`background-color: ${primaryColor}`"></span>
      </div>
    </div>
  </transition>

  <transition name="nav-in" appear>
    <div id="navMenu" class="navbar-menu" v-if="breakpoint >= 3 && navVis">
      <div class="navbar-end" v-if="mobileNav || breakpoint > 2">
        <div class="navbar-item" v-for="(link, index) in mainMenu" :key="index">
          <nuxt-link v-if="link.url.link_type === 'Document'" :to="$prismic.asLink(link.url)" :style="`color: ${primaryColor}!important`">{{link.label}}</nuxt-link>
          <a v-else :href="$prismic.asLink(link.url)">{{link.label}}</a>
        </div>
      </div>
    </div>
  </transition>
</nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      menuMsg: '',
      scrolled: false,
      ticking: false
    }
  },
  computed: {
    ...mapGetters('site', ['mobileNav', 'breakpoint']),
    ...mapGetters('admin', ['mainMenu'])
  },
  afterMount () {
    if (!this.mainMenu) {
      this.menuMsg = `Please create a 'Menu' with a uid of 'main-menu`
    }
  },
  watch: {
    mobileNav (bool) {
      if (bool) {
        this.disableScroll(true)
      } else {
        this.disableScroll(false)
      }
    },
    breakpoint (newV, oldV) {
      if (newV > oldV && oldV < 3) {
        this.$store.dispatch('site/toggleMobileNav', false)
        this.disableScroll(false)
      }
    }
  },
  methods: {
    raf () {
      if (!this.ticking) {
        window.requestAnimationFrame(this.scrollAction)
        this.ticking = true
      }
    },
    scrollAction () {
      // let lastScrollTop = 0
      let scrollTop = window.scrollY

      if (scrollTop >= 60) {
        this.scrolled = true
      } else if (scrollTop < 60) {
        this.scrolled = false
      }
      // lastScrollTop = scrollTop
      this.ticking = false
    },
    showMobileNav () {
      this.$store.dispatch('site/toggleMobileNav', !this.mobileNav)
    },
    disableScroll (bool) {
      if (bool) {
        document.getElementsByTagName('html')[0].style.overflow = 'hidden'
        document.getElementsByTagName('body')[0].style.overflow = 'hidden'
      } else {
        document.getElementsByTagName('html')[0].style.overflow = null
        document.getElementsByTagName('body')[0].style.overflow = null
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.raf)
    this.raf()
  }
}
</script>
