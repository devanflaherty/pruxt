export const state = () => ({
  posts: []
})

export const getters = {
  posts: state => {
    return state.posts
  }
}

export const mutations = {
  SET_TEAM (state, obj) {
    state.posts = obj
  }
}

export const actions = {
  async getTeam ({dispatch, commit}) {
    let ctx = await dispatch('setCtx', null, {root: true})
    let team = await ctx.api.query(
      this.$prismic.predicates.at('document.type', 'team_post'),
      { orderings: '[my.team_post.post_position, my.team_post.title]' }
    )

    commit('SET_TEAM', team)
  }
}
