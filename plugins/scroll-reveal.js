import Vue from 'vue'
var sr = require('scrollreveal')()

var defaultOptions = {
  // 'bottom', 'left', 'top', 'right'
  origin: 'bottom',
  distance: '20px',
  duration: 500,
  delay: 0,
  rotate: { x: 0, y: 0, z: 0 },
  opacity: 0,
  scale: 1,
  easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
  container: window.document.documentElement,
  mobile: true,

  // true:  reveals occur every time elements become visible
  // false: reveals occur once as elements become visible
  reset: false,

  // 'always' — delay for all reveal animations
  // 'once'   — delay only the first time reveals occur
  // 'onload' - delay only for animations triggered by first load
  useDelay: 'always',

  // Change when an element is considered in the viewport. The default value
  // of 0.20 means 20% of an element must be visible for its reveal to occur.
  viewFactor: 0.2,

  // Pixel values that alter the container boundaries.
  // e.g. Set `{ top: 48 }`, if you have a 48px tall fixed toolbar.
  viewOffset: { top: 0, right: 0, bottom: 0, left: 0 }
}

var ScrollReveal = {
  install: function install (Vue) {
    Vue.prototype.$reveal = function (el, options, int) {
      return sr.reveal(el, options, int)
    }
    Vue.directive('scroll-reveal', {
      inserted: function inserted (el, binding, vnode) {
        // Allows us to emit to the directive component
        let emit = (vnode, name, data) => {
          let handlers = (vnode.data && vnode.data.on) ||
            (vnode.componentOptions && vnode.componentOptions.listeners)

          if (handlers && handlers[name]) {
            handlers[name].fns(data)
          }
        }

        let directiveOptions = binding.value || {}
        console.log(directiveOptions)

        let options = {...defaultOptions, ...directiveOptions}

        if (binding.modifiers) {
          if (binding.modifiers.reset) {
            options.reset = true
          }

          if (binding.modifiers.nomobile) {
            options.mobile = false
          }
        }

        options.beforeReveal = function (el) {
          emit(vnode, 'beforeReveal', el)
        }

        sr.reveal(el, options)
      }
    })
  }
}

Vue.use(ScrollReveal)
