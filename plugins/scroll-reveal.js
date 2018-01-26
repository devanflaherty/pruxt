import Vue from 'vue'
var sr = require('scrollreveal')()

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

        let options = binding.value || {}

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
