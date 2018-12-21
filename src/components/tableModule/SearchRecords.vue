<template>
  <div class="search-items">
    Search: <input :value="searchString" type="search" @input="emitEventWithNewValue" />
  </div>
</template>

<script>
export default {
  name: 'SearchRecords',
  props: {
    searchString: {
      type: String,
      default: ''
    }
  },
  methods: {
    emitEventWithNewValue (event) {
      const newSearchString = event.target.value

      this.$emit('change', newSearchString)
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