export const state = () => ({
  doc: null,
  pageIndex: null,
  resultsPerPage: 8,
  resultsSize: null,
  totalResults: null,
  totalPages: null,
  nextPage: null,
  previousPage: null,
  posts: []
})

export const getters = {
  doc: state => {
    return state.doc
  },
  pageIndex: state => {
    return state.page
  },
  resultsSize: state => {
    return state.resultsSize
  },
  totalResults: state => {
    return state.totalResults
  },
  totalPages: state => {
    return state.totalPages
  },
  nextPage: state => {
    return state.nextPage
  },
  previousPage: state => {
    return state.previousPage
  },
  posts: state => {
    return state.posts
  }
}

export const mutations = {
  SET_BLOG (state, obj) {
    state.doc = obj
    state.pageIndex = obj.page
    state.resultsSize = obj.results_size
    state.totalResults = obj.total_result_size
    state.totalPages = obj.total_pages
    state.nextPage = obj.next_page
    state.previousPage = obj.prev_page

    state.posts = [...obj.results, ...state.posts]
  }
}

export const actions = {
  async getBlog ({dispatch, commit, state}, page) {
    let ctx = await dispatch('setCtx', null, {root: true})

    if (state.doc === null) {
      let blog = await ctx.api.query(
        this.$prismic.predicates.at('document.type', 'BLOG_post'),
        { pageSize: state.resultsPerPage, page: 1, orderings: `[my.blog_post.first_publication_date]` }
      )

      commit('SET_BLOG', blog)
    } else if (state.doc !== {} && state.totalPages > state.pageIndex) {
      let paginatedBlog = await ctx.api.query(
        this.$prismic.predicates.at('document.type', 'blog_post'),
        { pageSize: state.resultsPerPage, page: state.page + 1, orderings: `[my.document.first_publication_date]` }
      )

      commit('SET_BLOG', paginatedBlog)
    }
  },

  async getBlogPost ({dispatch}, uid) {
    let ctx = await dispatch('setCtx', null, {root: true})
    return ctx.api.getByUID('blog_post', uid)
  },

  async filterPostByTag ({dispatch, commit}, tag) {
    let ctx = await dispatch('setCtx', null, {root: true})
    let taggedPosts = await ctx.api.query([
      this.$prismic.predicates.at('document.type', 'blog_post'),
      this.$prismic.predicates.any('document.tags', [tag])
    ])

    commit('SET_BLOG', taggedPosts)
  },

  async getAdjacentPost ({dispatch}, {id, dir}) {
    let ctx = await dispatch('setCtx', null, {root: true})

    let adj = await ctx.api.query(
      this.$prismic.predicates.at('document.type', 'blog_post'),
      {
        after: id,
        orderings: `[document.first_publication_date ${dir}]`,
        pageSize: 1
      }
    )
    return adj.results[0]
  }
}
