<template>
  <div class="main">
    <transition name="fade-in">
      <div id="loader" v-if="loading" class="home-loading has-text-white is-size-1"><h1><span></span></h1></div>
    </transition>
    <siteNav />
    <nuxt/>
  </div>
</template>

<script>
import siteNav from '~/components/siteNav'
import breakpoints from '~/mixins/breakpoints'

export default {
  components: {
    siteNav
  },
  mixins: [breakpoints]
}
</script>

<style lang="scss">
html
{
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*, *:before, *:after
{
  box-sizing: border-box;
  margin: 0;
}
.button--green
{
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}
.button--green:hover
{
  color: #fff;
  background-color: #3b8070;
}
.button--grey
{
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}
.button--grey:hover
{
  color: #fff;
  background-color: #35495e;
}

.wio-link {
  position: absolute;
  z-index: 50;
  left: 0;
  top: 0;
  background: rgba(white, 0.2);
  padding: .5rem 1rem;
  transition: all 0.5s ease;
  &:hover {
    background: white;
  }
}

#loader {
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0; top: 0;
  h1 {
    color: black;
    font-weight: 800;
    span {
      font-size: 44px!important;
      color: black;
      display: inline-block;
    }
    span:nth-child(1) {
      animation: wave-left infinite 2s;
    }
    span:nth-child(3) {
      animation: wave-right infinite 2s;
    }
  }
}
@keyframes wave-left {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-50px, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
@keyframes wave-right {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(50px, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>
