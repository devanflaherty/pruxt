<template>
<div class="main">
  <header class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <logo/>
        <h1 class="title">
          PRUXT
        </h1>
        <h2 class="subtitle">
          A Prismic &amp; Nuxtjs website.
        </h2>
        <div class="links">
          <a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation</a>
          <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
        </div>
      </div>
    </div>
  </header>
  <section class="section is-white">
    <div class="container">
      <div class="content has-text-centered">
        <h2 class="title has-text-black">Getting Started</h2>
        <img src="/readme-images/step1.png" width="600">
      </div>
    </div>
  </section>
</div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  mounted () {
    this.$store.dispatch('site/toggleNavVis', true)
  }
}
</script>

<style lang="scss">
@import '~assets/styles/mixins';
body {
  background: #efefef;
}
.is-black {
  background: $black;
}
.is-white {
  background: $white;
}
.title
{
  display: block;
  font-weight: 600;
  font-size: 100px;
  color: black;
  letter-spacing: 6px;
}
.subtitle
{
  font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
  font-weight: 300;
  font-size: 1rem;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.links
{
  padding-top: 15px;
}
</style>
