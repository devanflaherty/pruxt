import Vue from 'vue'
import Swiper from 'swiper'
// import Swiper from 'swiper/dist/js/swiper.js'
if (process.browser) {
  // Swiper = Swiper.default || Swiper

  var mySwiper = {
    install: function install (Vue) {
      Vue.prototype.$swiper = function (el, options, int) {
        initSwiper(el, options)
      }

      var getInstanceName = function (el, binding, vnode) {
        var customInstanceName = ''
        if (binding.arg) {
          customInstanceName = binding.arg
        } else if (vnode.data.attrs && vnode.data.attrs.instanceName) {
          customInstanceName = vnode.data.attrs.instanceName
        } else if (el.id) {
          customInstanceName = el.id
        }
        var instanceName = customInstanceName || 'swiper'
        return instanceName
      }
      Vue.directive('swiper', {
        bind: function bind (el, binding, vnode) {
          if (el.className.indexOf('swiper-container') === -1) {
            el.className += (!el.className ? ' ' : '' + 'swiper-container')
          }
        },
        inserted: function inserted (el, binding, vnode) {
          var _this = vnode.context
          var options = binding.value || {}
          var instanceName = getInstanceName(el, binding, vnode)
          var swiper = _this[instanceName]
          if (!swiper) {
            _this[instanceName] = new Swiper(el, options)
          }
        },
        componentUpdated: function componentUpdated (el, binding, vnode) {
          var instanceName = getInstanceName(el, binding, vnode)
          var swiper = vnode.context[instanceName]
          if (swiper) {
            swiper.update(true)
            swiper.updatePagination(true)
            if (binding.value.loop) {
              swiper.reLoop()
            }
          }
        }
      })
    }
  }

  /* eslint-disable */
  const initSwiper = (el, options, vnode) => {
    var swiper = new Swiper(el, options)
  }
  /* eslint-enable */
  Vue.use(mySwiper)
}
