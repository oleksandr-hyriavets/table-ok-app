<template>
  <div class="info">
    Showing {{ from }} to {{ to }} of {{ recordsAmount }} entries
    <span
      v-if="hasSearchText"
    >
      (filtered from {{ totalRecords }} total entries)
    </span>
  </div>
</template>

<script>
export default {
  name: 'InfoComponent',
  props: {
    recordsAmount: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    totalRecords: {
      type: Number,
      required: true
    },
    hasSearchText: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    from () {
      const isLastPage = this.currentPage * this.perPage > this.recordsAmount
      const subtractor = isLastPage ? this.recordsAmount  % this.perPage : this.perPage 

      return this.to - (subtractor - 1)
    },
    to () {
      const initTo = this.currentPage * this.perPage

      return initTo > this.recordsAmount ? this.recordsAmount : initTo
    }
  }
}
</script>

