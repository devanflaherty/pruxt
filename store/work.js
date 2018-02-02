export const state = () => ({
  doc: null,
  pageIndex: null,
  resultsPerPage: 12,
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
  SET_WORK (state, obj) {
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
  async getWork ({dispatch, commit, state}) {
    let ctx = await dispatch('setCtx', null, {root: true})

    if (state.doc === null) {
      let work = await ctx.api.query(
        this.$prismic.predicates.at('document.type', 'work_post'),
        { pageSize: state.resultsPerPage, page: 1, orderings: '[my.work_post.post_position, my.work_post.title]' }
      )

      commit('SET_WORK', work)
    } else if (state.doc !== {} && state.totalPages > state.pageIndex) {
      let paginatedWork = await ctx.api.query(
        this.$prismic.predicates.at('document.type', 'work_post'),
        { pageSize: state.resultsPerPage, page: state.page + 1, orderings: '[my.work_post.post_position, my.work_post.title]' }
      )

      commit('SET_WORK', paginatedWork)
    }
  },

  async getWorkPost ({dispatch}, uid) {
    let ctx = await dispatch('setCtx', null, {root: true})
    return ctx.api.getByUID('work_post', uid)
  },

  async getAdjacentPost ({dispatch}, {id, dir}) {
    let ctx = await dispatch('setCtx', null, {root: true})

    let adj = await ctx.api.query(
      this.$prismic.predicates.at('document.type', 'work_post'),
      {
        after: id,
        orderings: `[my.work_post.post_position ${dir}, my.work_post.title ${dir}]`,
        pageSize: 1
      }
    )

    return adj.results[0]
  }
}
