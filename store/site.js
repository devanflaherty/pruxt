export const state = () => ({
  loading: true,
  navVis: false,
  mobileNav: false,
  breakpoint: 0,
  pageColor: 'Dark',
  primaryColor: '#000',
  secondaryColor: '#fff'
})

export const getters = {
  loading: state => {
    return state.loading
  },
  navVis: state => {
    return state.navVis
  },
  mobileNav: state => {
    return state.mobileNav
  },
  breakpoint: state => {
    return state.breakpoint
  },
  pageColor: state => {
    return state.pageColor
  },
  primaryColor: state => {
    return state.primaryColor
  },
  secondaryColor: state => {
    return state.backgroundColor
  }
}

export const mutations = {
  TOGGLE_LOADING (state, bool) {
    state.loading = bool
  },
  TOGGLE_NAV_VIS (state, bool) {
    state.navVis = bool
  },
  TOGGLE_MOBILE_NAV (state, bool) {
    state.mobileNav = bool
  },
  CHANGE_BREAKPOINT (state, bp) {
    state.breakpoint = bp
  },
  SET_PAGE_COLOR (state, color) {
    state.pageColor = color
  },
  SET_PRIMARY_COLOR (state, color) {
    state.primaryColor = color
  },
  SET_SECONDARY_COLOR (state, color) {
    state.secondaryColor = color
  }
}

export const actions = {
  toggleLoading (context, bool) {
    context.commit('TOGGLE_LOADING', bool)
  },
  toggleNavVis (context, bool) {
    context.commit('TOGGLE_NAV_VIS', bool)
  },
  toggleMobileNav (context, bool) {
    context.commit('TOGGLE_MOBILE_NAV', bool)
  },
  changeBreakpoint (context, bp) {
    context.commit('CHANGE_BREAKPOINT', bp)
  },
  setPageColor (context, color) {
    context.commit('SET_PAGE_COLOR', color)
  },
  setPrimaryColor (context, color) {
    context.commit('SET_PRIMARY_COLOR', color)
  },
  setSecondaryColor (context, color) {
    context.commit('SET_SECONDARY_COLOR', color)
  }
}
