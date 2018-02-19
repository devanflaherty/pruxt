import Vue from 'vue'
import {mapGetters} from 'vuex'

Vue.mixin({
  computed: {
    // No need to request these on each component
    // They are now globally available
    ...mapGetters('site', ['primaryColor', 'secondaryColor', 'breakpoint', 'pageColor', 'loading', 'navVis'])
  },
  methods: {
    isOdd (num) {
      return num % 2
    },
    setColors (primary, secondary) {
      this.$store.dispatch('site/setPrimaryColor', primary)
      this.$store.dispatch('site/setSecondaryColor', secondary)
    },
    toNewLines (str) {
      return str.split('\n').join('<br>')
    }
  }
})
