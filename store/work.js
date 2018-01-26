export const state = () => ({
  posts: []
})

export const getters = {
  posts: state => {
    return state.posts
  }
}

export const mutations = {
  SET_WORK (state, obj) {
    state.posts = obj
  }
}

export const actions = {
  async getWork ({dispatch, commit}) {
    let ctx = await dispatch('setCtx', null, {root: true})
    let work = await ctx.api.query(
      this.$prismic.predicates.at('document.type', 'work_post'),
      { orderings: '[my.work_post.post_position, my.work_post.title]' }
    )

    commit('SET_WORK', work)
  },
  async getWorkPost ({dispatch}, uid) {
    let ctx = await dispatch('setCtx', null, {root: true})
    return ctx.api.getByUID('work_post', uid)
  }
}
