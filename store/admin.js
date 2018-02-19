export const state = () => ({
  hasSettings: true,
  menu: [],
  seo: {
    meta_title: '',
    meta_description: '',
    meta_image: {}
  },
  footer: {
    footer_menu: [],
    footer_widget: {}
  },
  contact: '',
  contactInfo: '',
  social: []
})

export const getters = {
  hasSettings: state => {
    return state.hasSettings
  },
  mainMenu: state => {
    return state.mainMenu
  },
  seo: state => {
    return state.seo
  },
  footer: state => {
    return state.footer
  },
  contactEmail: state => {
    return state.contact
  },
  contactInfo: state => {
    return state.contactInfo
  },
  social: state => {
    return state.social
  }
}

export const mutations = {
  SET_ADMIN (state, admin) {
    // SET FOOTER
    state.mainMenu = admin.main_menu

    // SET SEO SETTINGS
    state.seo.meta_title = admin.meta_title
    state.seo.meta_description = admin.meta_description
    state.seo.card_image = admin.card_image

    // SET FOOTER
    state.footer.footer_menu = admin.footer_menu
    state.footer.footer_widget = admin.footer_widget

    // SET CONTACT
    state.contact = admin.contact_email
    state.contactInfo = admin.contact_info

    // SET SOCIAL
    state.social = admin.social
  },
  SET_HAS_SETTINGS (state, bool) {
    state.hasSettings = bool
  }
}

export const actions = {
  async getAdminSettings ({dispatch, commit}) {
    try {
      let ctx = await dispatch('setCtx', null, {root: true})
      let admin = await ctx.api.getSingle('admin')
      commit('SET_ADMIN', admin.data)
      commit('SET_HAS_SETTINGS', true)
    } catch (err) {
      commit('SET_HAS_SETTINGS', false)
    }
  }
}
