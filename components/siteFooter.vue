<template>
  <footer class="section footer" v-if="navVis">
    <transition name="footer-in">
      <div class="container">
        <div class="columns">
          <div class="column">
            <nav class="footer__nav">
              <div class="footer__nav__item" v-for="(link, i) in footer.footer_menu" :key="i">
                <prismicLink :link="link.url" :class="contrast">
                  {{link.label}}
                </prismicLink>
              </div>
            </nav>
          </div>

          <div class="column is-narrow">
            <div class="footer__widget" :class="contrast"
              v-html="$prismic.asHtml(footer.footer_widget)">
            </div>
          </div>
        </div>
      </div>
    </transition>
  </footer>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters('admin', ['footer']),
    contrast () {
      return {
        'has-text-white': this.pageColor === 'Dark',
        'has-text-black': this.pageColor === 'Light'
      }
    }
  }
}
</script>

<style lang="scss">
@import '~assets/styles/mixins';
.footer {
  padding-top: 5rem;
  padding-bottom: 5rem;
  &__nav {
    display: flex;
    flex-direction: column;
    &__item {
      a {
        display: inline-block;
        text-transform: uppercase;
        letter-spacing: 3px;
        margin-bottom: .33rem;
      }
    }
  }
  &__widget {
    h5 {
      font-size: .66rem;
      font-weight: 700;
      letter-spacing: 1.5px;
      opacity: 0.5;
    }
    p {
      margin-bottom: 1.5rem;
      letter-spacing: 1.5px;
      font-size: 1.25rem;
    }
    small {
      font-size: .5rem;
    }
  }
}

.footer-in-enter-active, .footer-in-leave-active {
  transition: all 0.5s ease;
}
.footer-in-enter, .footer-in-leave-to {
  opacity: 0;
  transform: translate3d(0, 20%, 0);
}
</style>


