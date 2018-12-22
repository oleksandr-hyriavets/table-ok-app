<template>
  <div class="search-items">
    Search: <input v-model="searchText" type="search" />
  </div>
</template>

<script>
export default {
  name: 'SearchRecords',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    searchText: {
      get () {
        return this.value
      },
      set (newValue) {
        this.$emit('input', newValue)
      }
    }
  }
}
</script>


<style lang="scss">
.search-items input {
  padding: 5px;
  outline: none;
  border: 1px solid #ddd;
}
</style>