import Vue from 'vue'
import {mapGetters} from 'vuex'

Vue.mixin({
  computed: {
    // No need to request these on each component
    // They are now globally available
    ...mapGetters('site', ['primaryColor', 'secondaryColor', 'pageColor', 'breakpoint', 'loading', 'navVis'])
  },
  methods: {
    isOdd (num) {
      return num % 2
    },
    setColors (pageColor, primary, secondary) {
      this.setPageContrast(pageColor)
      this.$store.dispatch('site/setPageColor', pageColor)
      this.$store.dispatch('site/setPrimaryColor', primary)
      this.$store.dispatch('site/setSecondaryColor', secondary)
    },
    setPageContrast (color) {
      let el = document.querySelector('body')
      el.classList.remove('has-text-black', 'has-text-white', 'is-dark', 'is-light')

      if (color) {
        if (color === 'Dark') {
          el.classList.add(`has-text-white`)
          el.classList.add(`is-dark`)
        } else {
          el.classList.add(`has-text-black`)
          el.classList.add(`is-light`)
        }
      }
    },
    toNewLines (str) {
      return str.split('\n').join('<br>')
    }
  }
})
