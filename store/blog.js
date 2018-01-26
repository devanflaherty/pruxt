export const state = () => ({
  posts: []
})

export const getters = {
  posts: state => {
    return state.posts
  },
  careers: state => {
    return state.careers
  }
}

export const mutations = {
  SET_BLOG (state, obj) {
    state.posts = obj
  },
  SET_CAREERS (state, obj) {
    state.careers = obj
  }
}

export const actions = {
  async getBlog ({dispatch, commit}) {
    let ctx = await dispatch('setCtx', null, {root: true})
    let work = await ctx.api.query(
      this.$prismic.predicates.at('document.type', 'blog_post')
      // { orderings: '[my.work_posts.title]' }
    )

    commit('SET_BLOG', work)
  },
  async getCareers ({dispatch, commit}) {
    let ctx = await dispatch('setCtx', null, {root: true})
    let work = await ctx.api.query(
      this.$prismic.predicates.at('document.type', 'blog_post', ['Career']),
      { orderings: '[my.blog_post.post_position, my.blog_post.title]' }
    )

    commit('SET_CAREERS', work)
  },
  async getBlogPost ({dispatch}, uid) {
    let ctx = await dispatch('setCtx', null, {root: true})
    return ctx.api.getByUID('blog_post', uid)
  }
}
