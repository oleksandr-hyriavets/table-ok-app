import data from '@/data'

import { compose, head, keys, propOr } from 'ramda'

const types = {
  UPDATE_SEARCH_TEXT: 'UPDATE_SEARCH_TEXT'
}

const state = () => ({
  tableData: data || [],
  currentPage: 1,
  perPage: 5,
  searchText: ''
})

const getters = {
  filteredData: state => state.tableData,
  fields: compose(keys, head, propOr([], 'tableData')),
  rows: (state, getters) => getters.filteredData.slice(
    (state.currentPage - 1) * state.perPage,
    state.currentPage * state.perPage
  )
}

const actions = {
  updateSearchText ({ commit }, newSearchText) {
    commit(types.UPDATE_SEARCH_TEXT, newSearchText)
  }
}

const mutations = {
  [types.UPDATE_SEARCH_TEXT] (state, newSearchText) {
    state.searchText = newSearchText
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}