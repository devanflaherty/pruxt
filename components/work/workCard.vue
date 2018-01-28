<template>
  <div class="workCard" ref="workCard">
    <span class="workCard__titleHint">
      {{$prismic.asText(entry.title)}}
    </span>
    
    <nuxt-link :to="`/work/${post.uid}`" class="workCard__link" :class="{'reveal' : reveal}">
      <div class="workCard__link__thumbnail">
        <!-- Wipe transition -->
        <div class="wipe" :style="`background-color: ${entry.primary_color}`"></div>
        <img v-lazy="entry.feature_image.large.url" width="500" height="600">
      </div>

      <div class="workCard__link__details">
        <h4>— {{$prismic.asText(entry.title)}}</h4>
        <ul>
          <li v-for="(tag, i) in post.tags" :key="i">
            <span>→ {{tag}}</span>
          </li>
        </ul>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['post'],
  data () {
    return {
      reveal: false,
      entry: this.post.data
    }
  },
  methods: {
    wipe () {
      this.reveal = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/mixins';

.workCard {
  position: relative;
  &__titleHint {
    font-size: 4.5rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #F0F0F0;
    line-height: 1;
    word-spacing: 99999px;
    display: block;
    z-index: -1;
    @include mobile () {
      font-size: 4.5rem;
    }
    @include tablet () {
      font-size: 2.5rem;
    }
    @include desktop () {
      font-size: 3.5rem;
    }
    @include widescreen () {
      font-size: 4.5rem;
    }
  }
  &__link {
    position: relative;
    display: block;
    margin: auto auto auto 2rem;
    width: 80%;
    visibility: hidden;
    &__thumbnail {
      box-shadow: 0 12px 44px 0 rgba(0,0,0,0.24);
      margin-bottom: 2rem;
      img {
        display: block;
      }
    }
    &__details {
      h4 {
        color: $black;
        font-weight: 600;
        margin-bottom: 1.5rem;
      }
      h5 {
        font-family: 'Inter UI';
        color: $grey-dark;
      }
      li {
        color: $grey-medium;
        text-transform: capitalize;
      }
    }
  }
}
</style>
