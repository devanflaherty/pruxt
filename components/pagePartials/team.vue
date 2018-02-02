<template>
  <section class="teamPosts section">
    <div class="container">
      <h2 class="title teamPosts__title"><strong>Our Team</strong></h2>
      <!-- teamPosts__cards -->
      <div class="teamPosts__cards" v-if="posts.results.length > 0">
        <teamCard :reveal="reveal" v-for="(post, index) in leadership" :key="index" :post="post" :class="{'align-right': isOdd(index)}"/>
      </div>
      <!-- close teamPosts__cards -->
    </div>
  </section>
</template>

<script>
import teamCard from '~/components/team/teamCard'
import {mapGetters} from 'vuex'

export default {
  props: ['page'],
  data () {
    return {
      reveal: false,
      srFillOptions: {
        distance: '40px',
        duration: 1000,
        afterReveal: () => {
          this.reveal = true
        }
      },
      srNameOptions: {
        distance: '40px',
        origin: 'left',
        delay: 500,
        duration: 1000
      }
    }
  },
  components: {
    teamCard
  },
  watch: {
    breakpoint () {
      this.initScrollReveal()
    }
  },
  computed: {
    ...mapGetters('team', ['posts']),
    leadership () {
      let leaders = this.posts.results.filter(post => {
        return post.tags.find(tag => tag === 'leader')
      })
      return leaders
    },
    staff () {
      let staff = this.posts.results.filter(post => {
        return post.tags.find(tag => tag !== 'leader')
      })
      return staff
    }
  },
  methods: {
    initScrollReveal () {
      if (this.breakpoint > 1) {
        this.$reveal('.teamCard__fill', this.srFillOptions, 250)
        this.$reveal('.teamCard__thumb__name', this.srNameOptions, 250)
      } else {
        this.$reveal('.teamCard__fill', this.srFillOptions)
        this.$reveal('.teamCard__thumb__name', this.srNameOptions)
      }
    }
  },
  mounted () {
    this.initScrollReveal()
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/mixins';
.teamPosts {
  &__title {
    margin-bottom: 4rem;
  }
}
</style>
