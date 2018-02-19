<template>
<nav class="navbar is-transparent">
  <transition name="nav-in" appear>
    <div class="navbar-brand" v-if="mainMenu">
      <div class="navbar-item" >
        <nuxt-link to="/">
          <img src="/icon.png">
        </nuxt-link>
      </div>
      <div class="nav-burg" :class="{'is-active': mobileNav}" @click="showMobileNav">
        <span></span>
        <span></span>
      </div>
    </div>
  </transition>

  <transition name="nav-in" appear>
    <div id="navMenu" class="navbar-menu" v-if="breakpoint > 2">
      <div class="navbar-end">
        <div class="navbar-item" v-for="(link, index) in mainMenu" :key="index">
          <prismicLink :link="link.url">{{link.label}}</prismicLink>
        </div>
      </div>
    </div>

    <mobileNav />
  </transition>
</nav>
</template>

<script>
import mobileNav from '~/components/mobileNav'
import { mapGetters } from 'vuex'

export default {
  components: {
    mobileNav
  },
  data () {
    return {
      menuMsg: '',
      scrolled: false,
      ticking: false
    }
  },
  computed: {
    ...mapGetters('site', ['mobileNav']),
    ...mapGetters('admin', ['mainMenu'])
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
  },
  afterMount () {
    if (!this.mainMenu) {
      this.menuMsg = `Please create a 'Menu' with a uid of 'main-menu`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/mixins';
.navbar {
  position: absolute;
  background: none;
  z-index: 15;
  width: 100%;
  .navbar-item {
    color: $white;
    text-transform: uppercase;
    a {
      color: $white;
      font-weight: 600;
      letter-spacing: 2px;
      padding: 1rem .5rem;
    }
  }
  .navbar-brand {
    position: relative;
    z-index: 100;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0 1rem;
    @include touch () {
      width: 100%;
    }
    .navbar-item {
      padding: 0;
      a {
        padding: 0;
        img {
          max-height: 64px;
          display: block;
        }
      }
    }
  }
  .navbar-menu {
    padding: 1rem;
  }
}

.nav-burg {
  color: $white!important;
  padding: 8px 4px;
  height: 8px;
  width: 2rem;
  position: relative;
  z-index: 100;
  float: right;
  flex: 0 1 auto;
  cursor: pointer;
  transition: all 0.33s ease;
  align-self: center;
  @include desktop () {
    display: none;
  }
  &:hover {
    background: none;
  }
  span {
    cursor: pointer;
    position: absolute;
    display: block;
    content: '';
    transition: background-color .5s ease, top .33s .33s cubic-bezier(.75,0,.50, 1.5), transform .33s cubic-bezier(.75,0,.50, 1.5);

    border-radius: 6px;
    height: 2px;
    width: 1.5rem;
    background: $white;
  }
  span:nth-child(1) {
    top: 8px;
  }
  span:nth-child(2) {
    top: 100%;
  }
  &.is-active span {
    top: 50%;
    transform-origin: center center;
    background: $black!important;
    transition: background-color .5s .25s ease, top .33s cubic-bezier(.75,0,.50, 1.5), transform .33s .5s cubic-bezier(.75,0,.50, 1.5);
  }
  &.is-active span:nth-child(1) {
    transform: rotate(-45deg);
  }
  &.is-active span:nth-child(2) {
    transform: rotate(45deg);
  }
}

.nav-in-enter-active, .nav-in-leave-active {
  transition: all 0.5s cubic-bezier(.48, 0, .12, 1);
}
.nav-in-enter, .nav-in-leave-to {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}
</style>

