<template>
  <article class="teamCard">
    <div class="teamCard__fill" :style="`background-color: ${entry.primary_color}`">
      <span class="teamCard__fill__position">Founder</span>
    </div>

    <div class="teamCard__thumb">
      <div class="teamCard__thumb__image" :style="`background-color: ${entry.secondary_color}`" :class="{'teamCard__thumb__image--masked' : !reveal, 'teamCard__thumb__image--visible' : reveal}">
        <img :src="entry.member_avatar.large.url" width="640" height="960" />
      </div>
      <h4 class="teamCard__thumb__name">— {{$prismic.asText(entry.member_name)}}</h4>
    </div>
  </article>
</template>

<script>
export default {
  props: ['post', 'reveal'],
  data () {
    return {
      entry: this.post.data
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/mixins';
.teamCard {
  position: relative;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(6, 1fr);
  &__thumb {
    position: relative;
    margin-top: 2rem;
    grid-column-start: 1;
    grid-column-end: 5;
    grid-row-start: 1;
    grid-row-end: 7;
    &__image {
      overflow: hidden;
      position: relative;
      margin-bottom: 1rem;
      &::before {
        content: '';
        z-index: 1;
        display: block;
        background: inherit;
        @include overlay()
        transition: all 0.5s ease;
      }
      img {
        display: block;
        width: 100%;
        height: auto;
        transition: all 0.5s ease;
      }

      &--masked {
        &::before {
          transform: translateY(0);
        }
        img {
          transform: translateY(50px);
        }
      }
      &--visible {
        &::before {
          transform: translateY(-101%);
        }
        img {
          transform: translateY(0);
        }
      }
    }
    &__name {
      font-size: $size-4;
      font-weight: 600;
    }
  }
  &__fill {
    grid-column-start: 2;
    grid-column-end: 7;
    grid-row-start: 1;
    grid-row-end: 6;
    position: relative;
    &__position {
      display: block;
      position: absolute;
      right: 4rem;
      bottom: 4rem;
      transform: rotate(-90deg);
      transform-origin: bottom;
      margin: 0;
      width: 0;
      white-space: nowrap;
      text-align: left;
      color: rgba($black, 0.4);
      font-weight: 700;
      font-size: 1.5rem;
      letter-spacing: 4px;
      text-transform: uppercase;
    }
  }
}
</style>