<template>
  <div class="pgnt">
    <ul class="pgnt__ul">
      <li
        v-for="(page, index) in pages"
        :key="index"
        :class="['pgnt__item', { 'highlight': isCurrentPage(page) }]"
      >
        <button :disabled="page === '..'" @click="changePage(page)">
          {{ page }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { range } from 'ramda'

const MAX_VISIBLE_PAGES = 5

export default {
  name: 'PaginationComponent',
  props: {
    value: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  computed: {
    pages () {
      if (this.totalPages <= MAX_VISIBLE_PAGES + 1) {
        return range(1, this.totalPages + 1)
      } else {
        if (this.value < MAX_VISIBLE_PAGES) {
          return [...range(1, MAX_VISIBLE_PAGES + 1), '..', this.totalPages]
        } else if (this.totalPages - MAX_VISIBLE_PAGES + 1 < this.value) {
          return [1, '..', ...range(this.totalPages - MAX_VISIBLE_PAGES + 1, this.totalPages + 1)]
        } else {
          return [1, '..', this.value - 1, this.value, this.value + 1, '..', this.totalPages]
        }
      }
    }
  },
  methods: {
    changePage (newPage) {
      this.$emit('input', newPage)
    },
    isCurrentPage (page) {
      return this.value === page
    }
  }
}
</script>

<style lang="scss" scoped>
.highlight {
  transform: scale(1.3);
  background: none;
  transition: all 300ms;
}

.pgnt {
  &__ul {
    display: flex;
    list-style-type: none;
  }
}
</style>
