<template>
  <section class="page__slices">
    <component v-for="(slice, index) in slices" :key="index" 
      :slice="slice" :is="toCamelCase(slice.slice_type)" :data-position="`slice-${index + 1}`"></component>
  </section>
</template>

<script>
let camelCase = require('lodash/camelCase')

export default {
  props: {
    slices: {
      type: Array
    }
  },
  methods: {
    toCamelCase (str) {
      return camelCase(str)
    }
  }
}
</script>