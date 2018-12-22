<template>
  <div>
    Show 
    <select v-model="perPage">
      <option
        v-for="(option, index) in $options.perPageAmountOptions"
        :key="index"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    entries per page
  </div>
</template>

<script>
const perPageAmountOptions = [
  {
    label: '5',
    value: 5
  },
  {
    label: '10',
    value: 10
  },
  {
    label: '15',
    value: 15
  },
  {
    label: '25',
    value: 25
  }
]

export default {
  perPageAmountOptions,

  name: 'ShowRecords',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  computed: {
    perPage: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', Number(value))
      }
    }
  }
}
</script>
