import {TimelineMax} from 'gsap'

export const beforeEnter = function (el, done) {
  let beforeEnter = new TimelineMax()
  beforeEnter.set(el, {
    autoAlpha: 0
  })
}

export const enter = function (el, done) {
  let enter = new TimelineMax()
  enter.to(el, 0.5, {
    autoAlpha: 1
  }).addCallback(() => {
    done()
  })
}

export const leave = function (el, done) {
  let leave = new TimelineMax()

  leave.to(el, 0.25, {
    autoAlpha: 0
  }, 0.25).addCallback(() => {
    done()
  })
}
