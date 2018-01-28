<template v-if="link.link_type === 'Document'">
  <nuxt-link :to="$prismic.asLink(link)">
    <slot></slot>
  </nuxt-link>
</template>
<template v-else>
  <a :href="$prismic.asLink(link)">
    <slot></slot>
  </a>
</template>

<script>
export default {
  props: ['link']
}
</script>

