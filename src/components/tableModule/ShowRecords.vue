<template>
  <div>
    Show 
    <select v-model="perPage">
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="15">15</option>
      <option value="25">25</option>
    </select>
    entries per page
  </div>
</template>

<script>
export default {
  name: 'ShowRecords',
  props: {
    recordsPerPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    perPage: {
      get () {
        return this.recordsPerPage
      },
      set (value) {
        this.$emit('change', Number(value))
      }
    }
  }
}
</script>
