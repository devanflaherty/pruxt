<template>
  <article class="workList section">
    <div class="container">
      <div class="columns is-multiline">
        <template v-if="$route.name === 'index'">
          <workCard class="column is-4" v-for="(post, i) in work" :key="i" :post="post.work_post"/>
        </template>
        <template v-else>
          <workCard class="column is-4" v-for="(post, i) in work" :key="i" :post="post"/>
        </template>
      </div>
    </div>
  </article>
</template>

<script>
import workCard from '~/components/work/workCard'

export default {
  components: {
    workCard
  },
  props: ['work'],
  watch: {
    breakpoint () {
      this.initScrollReveal()
    }
  },
  methods: {
    parallaxHint (el) {
      return this.$TweenMax.fromTo(el, 1, {
        y: -50
      }, {
        y: 50
      })
    },
    forEach (array, callback, scope) {
      for (let i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]) // passes back stuff we need
      }
    },
    initScrollReveal () {
      if (this.breakpoint > 1) {
        this.$reveal('.workCard__link', {distance: '40px', duration: 1000}, 250)
        this.$reveal('.workCard__link__details', {distance: '40px', origin: 'left', delay: 500, duration: 1000}, 250)
      } else {
        this.$reveal('.workCard__link', {distance: '40px', duration: 1000})
        this.$reveal('.workCard__link__details', {distance: '40px', origin: 'left', delay: 500, duration: 1000})
      }
    },
    initScrollMagic () {
      let workCards = document.querySelectorAll('.workCard')

      /* eslint-disable */
      this.forEach(workCards, (index, value) => {
        let card = workCards[index]
        let titleHint = card.querySelector('.workCard__titleHint')

        let workParallax = new this.$scrollmagic.Scene({
          duration: '200%',
          triggerElement: card,
          triggerHook: 'onEnter',
          offset: -100
        })
          .setTween(this.parallaxHint(titleHint))
          // .addIndicators({name:'workcard'})

        this.$controller.$emit('addScene', 'workParallax', workParallax)

      })
      /* eslint-enable */
    }
  },
  mounted  () {
    this.initScrollReveal()
    this.initScrollMagic()
  }
}
</script>

