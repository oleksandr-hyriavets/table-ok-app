<template>
  <div class="table-wrapper">
    <TableComponent
      :fields="fields"
      :rows="rows"
      :search-text="searchText"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import TableComponent from '@/components/tableModule/TableComponent'

import { pathOr } from 'ramda'

export default {
  name: 'TableModule',
  components: {
    TableComponent
  },
  computed: {
    ...mapState({
      searchText: pathOr('', ['table', 'searchText'])
    }),
    ...mapGetters([
      'fields',
      'rows'
    ])
  }
}
</script>
