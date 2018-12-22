<template>
  <div class="table-wrapper">
    <div class="line">
      <ShowRecords
        v-model="localPerPage"
      />
      <SearchRecords
        v-model="localSearchText"
      />
    </div>
    <br>
    <div>
      <TableComponent
        v-if="hasRecords"
        :fields="fields"
        :rows="rows"
        :search-text="searchText"
        :order-dir="orderDir"
        :order-by="orderBy"
        @change-sort-field="changeSortField"
      />
      <p v-else class="no-data">
        no data :)
      </p>
    </div>
    <div class="line">
      <InfoComponent
        v-if="hasRecords"
        :records-amount="recordsAmount"
        :current-page="localCurrentPage"
        :per-page="perPage"
        :has-search-text="hasSearchText"
        :total-records="totalRecords"
      />
      <PaginationComponent
        v-model="localCurrentPage"
        :total-pages="totalPages"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'

import TableComponent from '@/components/tableModule/TableComponent'
import ShowRecords from '@/components/tableModule/ShowRecords'
import SearchRecords from '@/components/tableModule/SearchRecords'
import PaginationComponent from '@/components/tableModule/PaginationComponent'
import InfoComponent from '@/components/tableModule/InfoComponent'

import { pathOr } from 'ramda'

import {
  DEFAULT_PER_PAGE_RECORDS_AMOUNT,
  DEFAULT_CURRENT_PAGE,
  DEFAULT_FIELD_TO_SORT
} from '@/utils/config'

export default {
  name: 'TableModule',
  components: {
    TableComponent,
    ShowRecords,
    SearchRecords,
    PaginationComponent,
    InfoComponent
  },
  computed: {
    ...mapState({
      searchText: pathOr('', ['table', 'searchText']),
      perPage: pathOr(DEFAULT_PER_PAGE_RECORDS_AMOUNT, ['table', 'perPage']),
      currentPage: pathOr(DEFAULT_CURRENT_PAGE, ['table', 'currentPage']),
      orderBy: pathOr(DEFAULT_FIELD_TO_SORT, ['table', 'orderBy']),
      orderDir: pathOr('asc', ['table', 'orderDir'])
    }),
    ...mapGetters([
      'fields',
      'rows',
      'totalPages',
      'recordsAmount',
      'totalRecords'
    ]),
    localCurrentPage: {
      get () {
        return this.currentPage
      },
      set (value) {
        this.updateCurrentPage(value)
      }
    },
    localPerPage: {
      get () {
        return this.perPage
      },
      set (value) {
        this.updatePerPageRecordsAmount(value)
      }
    },
    localSearchText: {
      get () {
        return this.searchText
      },
      set (value) {
        if (this.localCurrentPage !== 1) {
          this.updateCurrentPage(1)
        }
        
        this.updateSearchText(value)
      }
    },
    hasRecords () {
      return Boolean(this.recordsAmount)
    },
    hasSearchText () {
      return Boolean(this.searchText)
    }
  },
  methods: {
    ...mapActions([
      'updatePerPageRecordsAmount',
      'updateSearchText',
      'updateCurrentPage',
      'setOrderBy',
      'toggleOrderDir'
    ]),
    changeSortField (newFiled) {
      this.setOrderBy(newFiled)
      this.toggleOrderDir()
    }
  }
}
</script>

<style lang="scss" scoped>
.line {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.no-data {
  text-align: center;
}
</style>

