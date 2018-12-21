<template>
  <div class="table-wrapper">
    <div class="line">
      <ShowRecords
        :records-per-page="perPage"
        @change="changePerPageAmount"
      />
      <SearchRecords
        :search-string="searchText"
        @change="changeSearchString"
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
        :current-page="currentPage"
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

const DEFAULT_PER_PAGE_RECORDS_AMOUNT = 5

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
      currentPage: pathOr(1, ['table', 'currentPage']),
      orderBy: pathOr('Id', ['table', 'orderBy']),
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
    changePerPageAmount (newPerPageAmount) {
      this.updatePerPageRecordsAmount(newPerPageAmount)
    },
    changeSearchString (newSearchString) {
      if (this.currenPage !== 1) {
        this.updateCurrentPage(1)
      }

      this.updateSearchText(newSearchString)
    },
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

