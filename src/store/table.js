import data from "@/data";

import {
  prop,
  propOr,
  compose,
  includes,
  toLower,
  join,
  flatten,
  map,
  values,
  length,
  __,
  divide,
  filter,
  slice,
  sort
} from "ramda";

import {
  DEFAULT_PER_PAGE_RECORDS_AMOUNT,
  DEFAULT_CURRENT_PAGE,
  DEFAULT_FIELD_TO_SORT,
  ORDER_DIR
} from "@/utils/config";

const getTitlesObj = prop("titles");
const getTableItems = prop("items");

const isIncludesSearchText = searchText =>
  compose(
    includes(toLower(searchText)),
    toLower,
    join("~"),
    flatten,
    values
  );

const state = {
  titles: getTitlesObj(data),
  tableItems: getTableItems(data),
  currentPage: DEFAULT_CURRENT_PAGE,
  perPage: DEFAULT_PER_PAGE_RECORDS_AMOUNT,
  searchText: "",
  orderDir: ORDER_DIR.ASC.SLUG,
  orderBy: DEFAULT_FIELD_TO_SORT
};

const getters = {
  filteredItems: ({ searchText, tableItems, orderBy, orderDir }) => {
    const sortFn =
      orderDir === ORDER_DIR.ASC.SLUG ? ORDER_DIR.ASC.FN : ORDER_DIR.DESC.FN;
    const sortByOrderFn = sortFn(prop(orderBy));

    const filteredItems = filter(isIncludesSearchText(searchText), tableItems);

    return sort(sortByOrderFn, filteredItems);
  },
  fields: state => state.titles,
  rows: ({ currentPage, perPage }, { filteredItems }) =>
    slice((currentPage - 1) * perPage, currentPage * perPage, filteredItems),
  totalPages: ({ perPage }, { filteredItems }) =>
    compose(
      Math.ceil,
      divide(__, perPage),
      length
    )(filteredItems),
  recordsAmount: (__, { filteredItems }) => length(filteredItems),
  totalRecords: compose(
    length,
    propOr([], "tableItems")
  )
};

const types = {
  UPDATE_SEARCH_TEXT: "UPDATE_SEARCH_TEXT",
  UPDATE_PER_PAGE_RECORDS_AMOUNT: "UPDATE_PER_PAGE_RECORDS_AMOUNT",
  UPDATE_CURRENT_PAGE: "UPDATE_CURRENT_PAGE",
  SET_ORDER_BY: "SET_ORDER_BY",
  TOGGLE_ORDER_DIR: "TOGGLE_ORDER_DIR"
};

const actions = {
  updateSearchText({ commit }, newSearchText) {
    commit(types.UPDATE_SEARCH_TEXT, newSearchText);
  },

  updatePerPageRecordsAmount({ commit }, newPerPageAmount) {
    commit(types.UPDATE_PER_PAGE_RECORDS_AMOUNT, newPerPageAmount);
  },

  updateCurrentPage({ commit }, newCurrentPage) {
    commit(types.UPDATE_CURRENT_PAGE, newCurrentPage);
  },

  setOrderBy({ commit }, newOrderBy) {
    commit(types.SET_ORDER_BY, newOrderBy);
  },

  toggleOrderDir({ commit }) {
    commit(types.TOGGLE_ORDER_DIR);
  }
};

const mutations = {
  [types.UPDATE_SEARCH_TEXT](state, newSearchText) {
    state.searchText = newSearchText;
  },
  [types.UPDATE_PER_PAGE_RECORDS_AMOUNT](state, newPerPageAmount) {
    state.perPage = newPerPageAmount;
  },
  [types.UPDATE_CURRENT_PAGE](state, newCurrentPage) {
    state.currentPage = newCurrentPage;
  },
  [types.SET_ORDER_BY](state, newOrderBy) {
    state.orderBy = newOrderBy;
  },
  [types.TOGGLE_ORDER_DIR](state) {
    state.orderDir =
      state.orderDir === ORDER_DIR.ASC.SLUG
        ? ORDER_DIR.DESC.SLUG
        : ORDER_DIR.ASC.SLUG;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
