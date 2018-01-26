<template>
<main>
  <section class="container push-top">
    <h1 class="title">
      UH OH
      {{ error.statusCode }}
    </h1>
    <h2 class="info">
      {{ error.message }}
    </h2>
    <!-- <nuxt-link class="button" to="/" v-if="error.statusCode === 404">
      Homepage
    </nuxt-link> -->
  </section>
</main>
</template>

<script>
export default {
  props: ['error']
}
</script>

<style scoped>
.push-top {
  padding: 10rem 0;
}
.title
{
  margin-top: 15px;
  font-size: 5em;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
}
.button
{
  margin-top: 50px;
}
</style>
