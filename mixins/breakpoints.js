const breakpoints = {
  methods: {
    setBreakpoint (w) {
      if (w <= 768) {
        // mobile
        if (this.breakpoint !== 1) {
          this.$store.dispatch('site/changeBreakpoint', 1)
        }
      } else if (w > 768 && w < 1008) {
        // tablet
        if (this.breakpoint !== 2) {
          this.$store.dispatch('site/changeBreakpoint', 2)
        }
      } else if (w >= 1008 && w < 1200) {
        // desktop
        if (this.breakpoint !== 3) {
          this.$store.dispatch('site/changeBreakpoint', 3)
        }
      } else if (w >= 1200 && w < 1392) {
        // widescreen
        if (this.breakpoint !== 4) {
          this.$store.dispatch('site/changeBreakpoint', 4)
        }
      } else if (w >= 1392) {
        // fullhd
        if (this.breakpoint !== 5) {
          this.$store.dispatch('site/changeBreakpoint', 5)
        }
      }
    }
  },
  mounted () {
    var w = window.innerWidth
    var throttled = false
    this.setBreakpoint(w)

    window.onresize = () => {
      w = window.innerWidth
      if (!throttled) {
        // actual callback action
        this.setBreakpoint(w)
        // we're throttled!
        throttled = true
        // set a timeout to un-throttle
        setTimeout(() => {
          throttled = false
        }, 75)
      }
    }
  }
}

export default breakpoints
