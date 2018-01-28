import Vue from 'vue'
import Prismic from 'prismic-javascript'
import PrismicConfig from '~/prismic-configuration'
import PrismicDOM from 'prismic-dom'
import PrismicToolbar from 'prismic-toolbar'

export default (ctx, inject) => {
  inject('prismic', new Vue({
    computed: {
      predicates () {
        return Prismic.Predicates
      },
      prismicDOM () {
        return PrismicDOM
      }
    },
    methods: {
      asHtml (richText) {
        if (richText) {
          return this.prismicDOM.RichText.asHtml(richText, PrismicConfig.linkResolver, PrismicConfig.htmlSerializer)
        }
      },
      asText (richText) {
        if (richText) {
          return this.prismicDOM.RichText.asText(richText)
        }
      },
      asLink (link) {
        if (link) {
          return this.prismicDOM.Link.url(link, PrismicConfig.linkResolver)
        }
      },
      asDate (date, format) {
        if (date) {
          let d = this.prismicDOM.Date(date)
          return d
        }
      },
      initApi (req) {
        const accessToken = PrismicConfig.accessToken
        return Prismic.getApi(PrismicConfig.apiEndpoint, {
          accessToken: PrismicConfig.accessToken,
          req: req
        }).then(api => ({
          api,
          req,
          endpoint: PrismicConfig.apiEndpoint,
          accessToken,
          linkResolver: PrismicConfig.linkResolver,
          toolbar: function () {
            const maybeCurrentExperiment = this.api.currentExperiment()
            if (maybeCurrentExperiment) {
              PrismicToolbar.startExperiment(maybeCurrentExperiment.googleId())
            }
            PrismicToolbar.setup(PrismicConfig.apiEndpoint)
          }
        }))
      }
    }
  }))
}
