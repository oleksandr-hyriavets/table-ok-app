<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="(field, index) in fields"
          :key="`field-${index}`"
        >
          <!-- :class="{sortAsc: orderBy == field && orderDir == 'asc', sortDesc: orderBy == field && orderDir == 'desc'}" -->
          <!-- @click="sort(field)" -->
          {{ field }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, index) in rows"
        :key="`row-${index}`"
      >
        <td
          v-for="(data, key) in row"
          :key="`date-${key}`"
          v-html="shownData(data)"
        ></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'TableComponent',
  props: {
    fields: {
      type: Array,
      required: true
    },
    rows: {
      type: Array,
      required: true
    },
    searchText: {
      type: String,
      default: ''
    }
  },
  methods: {
    shownData (data) {
      if (!this.searchText) {
        return data
      }

      // todo: add regex to handle lower/uppercase
      const replaced = String(data).replace(
        this.searchText,
        `<span class="highlight">${this.searchText}</span>`
      )

      return replaced
    }
  }
}
</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 5px;
}

tbody tr:nth-child(odd) {
  background-color: #f9f9f9;
}

th {
  text-align: left;
  border: 1px solid #ddd;
  border-bottom: 3px solid #ddd;
  font-family: 'Glyphicons Halflings';
  position: relative;
  cursor: pointer;
}

th::after {
  content: '';
  position: absolute;
  top: 12px;
  right: 8px;
  display: block;
  opacity: 0.2;
  font-size: 0.7em;
}

th.sortAsc::after {
  content: '\25b2';
  opacity: 0.8;
}

th.sortDesc::after {
  content: '\25bc';
  opacity: 0.8;
}

td {
  border: 1px solid #ddd;
}

td,
th {
  padding: 8px;
}

.highlight {
  background-color: aquamarine;
}
</style>

