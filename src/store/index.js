import Vue from 'vue'
import Vuex from 'vuex'

import table from '@/store/table'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    table
  }
})
