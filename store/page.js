export const state = () => ({
})

export const getters = {
}

export const mutations = {
}

export const actions = {
  async getHome ({dispatch}) {
    let ctx = await dispatch('setCtx', null, {root: true})
    return ctx.api.getSingle('page', {
      'fetchLinks': 'work_posts.title, work_posts.feature_image, work_posts.involvement, work_posts.description, work_posts.primary_color'
    })
  },
  async getPage ({dispatch}, uid) {
    let ctx = await dispatch('setCtx', null, {root: true})
    return ctx.api.getByUID('page', uid)
  }
}
