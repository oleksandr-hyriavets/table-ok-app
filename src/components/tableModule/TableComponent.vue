<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="(filedName, filedKey) in fields"
          :key="`field-${filedKey}`"
          :class="getTableFieldClass(filedKey)"
          @click="sortBy(filedKey)"
        >
          {{ filedName }}
        </th>
        <th v-if="$slots.actions" />
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
        />
        <slot name="actions" :row="row" />
      </tr>
    </tbody>
  </table>
</template>

<script>
import { ORDER_DIR, DEFAULT_FIELD_TO_SORT } from "@/utils/config";

export default {
  name: "TableComponent",
  props: {
    fields: {
      type: Object,
      required: true
    },
    rows: {
      type: Array,
      required: true
    },
    searchText: {
      type: String,
      default: ""
    },
    orderBy: {
      type: String,
      default: DEFAULT_FIELD_TO_SORT
    },
    orderDir: {
      type: String,
      default: ORDER_DIR.ASC.SLUG
    }
  },
  methods: {
    shownData(data) {
      if (!this.searchText) {
        return data;
      }

      const regex = new RegExp(this.searchText, "ig");
      const searched = String(data).match(regex);

      const replaced = String(data).replace(
        regex,
        `<span class="highlight">${searched}</span>`
      );

      return replaced;
    },
    sortBy(field) {
      this.$emit("change-sort-field", field);
    },
    getTableFieldClass(field) {
      if (this.orderBy !== field) return "";

      return {
        sortAsc: this.orderDir === ORDER_DIR.ASC.SLUG,
        sortDesc: this.orderDir === ORDER_DIR.DESC.SLUG
      };
    }
  }
};
</script>

<style>
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
  font-family: "Glyphicons Halflings";
  position: relative;
  cursor: pointer;
}

th::after {
  content: "";
  position: absolute;
  top: 12px;
  right: 8px;
  display: block;
  opacity: 0.2;
  font-size: 0.7em;
}

th.sortAsc::after {
  content: "\25b2";
  opacity: 0.8;
}

th.sortDesc::after {
  content: "\25bc";
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


