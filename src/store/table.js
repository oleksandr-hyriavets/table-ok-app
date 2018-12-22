import data from '@/data'

import { compose, head, keys, propOr, sort, toLower, join, values, prop, includes, filter, length, ascend, descend } from 'ramda'

import {
  DEFAULT_PER_PAGE_RECORDS_AMOUNT,
  DEFAULT_CURRENT_PAGE,
  DEFAULT_FIELD_TO_SORT
} from '@/utils/config'

const types = {
  UPDATE_SEARCH_TEXT: 'UPDATE_SEARCH_TEXT',
  UPDATE_PER_PAGE_RECORDS_AMOUNT: 'UPDATE_PER_PAGE_RECORDS_AMOUNT',
  UPDATE_CURRENT_PAGE: 'UPDATE_CURRENT_PAGE',
  SET_ORDER_BY: 'SET_ORDER_BY',
  TOGGLE_ORDER_DIR: 'TOGGLE_ORDER_DIR'
}

const isIncludesSearchText = searchText => compose(
  includes(toLower(searchText)),
  toLower,
  join('~'),
  values
)

const state = () => ({
  tableData: data,
  currentPage: DEFAULT_CURRENT_PAGE,
  perPage: DEFAULT_PER_PAGE_RECORDS_AMOUNT,
  searchText: '',
  orderDir: 'asc',
  orderBy: DEFAULT_FIELD_TO_SORT
})

const getters = {
  filteredData: ({ searchText, tableData, orderBy, orderDir }) => {
    const sortType = orderDir === 'asc' ? ascend : descend
    const sortTypeByOrder = sortType(prop(orderBy))

    const filteredData = filter(isIncludesSearchText(searchText), tableData)

    return sort(sortTypeByOrder, filteredData)
  },
  fields: compose(keys, head, propOr([], 'tableData')),
  rows: ({ currentPage, perPage }, { filteredData }) => filteredData.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  ),
  totalPages: ({ perPage }, { filteredData }) => Math.ceil(length(filteredData) / perPage),
  recordsAmount: (__, { filteredData }) => length(filteredData),
  totalRecords: compose(length, propOr([], 'tableData'))
}

const actions = {
  updateSearchText ({ commit }, newSearchText) {
    commit(types.UPDATE_SEARCH_TEXT, newSearchText)
  },

  updatePerPageRecordsAmount ({ commit }, newPerPageAmount) {
    commit(types.UPDATE_PER_PAGE_RECORDS_AMOUNT, newPerPageAmount)
  },

  updateCurrentPage ({ commit }, newCurrentPage) {
    commit(types.UPDATE_CURRENT_PAGE, newCurrentPage)
  },

  setOrderBy ({ commit }, newOrderBy) {
    commit(types.SET_ORDER_BY, newOrderBy)
  },

  toggleOrderDir ({ commit }) {
    commit(types.TOGGLE_ORDER_DIR)
  }
}

const mutations = {
  [types.UPDATE_SEARCH_TEXT] (state, newSearchText) {
    state.searchText = newSearchText
  },
  [types.UPDATE_PER_PAGE_RECORDS_AMOUNT] (state, newPerPageAmount) {
    state.perPage = newPerPageAmount
  },
  [types.UPDATE_CURRENT_PAGE] (state, newCurrentPage) {
    state.currentPage = newCurrentPage
  },
  [types.SET_ORDER_BY] (state, newOrderBy) {
    state.orderBy = newOrderBy
  },
  [types.TOGGLE_ORDER_DIR] (state) {
    state.orderDir = state.orderDir === 'asc' ? 'desc' : 'asc'
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}