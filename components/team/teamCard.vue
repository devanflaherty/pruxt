<template>
  <article>
    {{$prismic.asText(entry.member_name)}}
  </article>
</template>

<script>
export default {
  props: ['post'],
  data () {
    return {
      entry: this.post.data
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/mixins';

</style>