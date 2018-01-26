export default function ({ store, route }) {
  store.dispatch('site/toggleMobileNav', false)
  store.dispatch('site/toggleNavVis', false)
}
