import PrismicDOM from 'prismic-dom'
let Elements = PrismicDOM.RichText.Elements

export default {
  apiEndpoint: 'https://stfrd-test.cdn.prismic.io/api/v2',
  accessToken: 'MC5XbW9fRXlvQUFFaGYyMFRJ.CO-_vREdPnLvv73vv71FGTHvv70D77-9awXvv70177-9XO-_vWzvv73vv73vv70577-9RUB977-977-9',

  linkResolver (doc) {
    // Define the url depending on the document type
    if (doc.type === 'page') { return '/' + doc.uid }
    if (doc.type === 'work_post') { return '/work' + doc.uid }
    if (doc.type === 'blog_post') { return '/blog' + doc.uid }
    // Default to homepage
    return '/'
  },
  htmlSerializer (element, content, children) {
    switch (element.type) {
      case Elements.heading1: return `<h1 class="title">${children.join('')}</h1>`
      case Elements.heading2: return `<h2 class="title">${children.join('')}</h2>`
      case Elements.heading3: return `<h3 class="title">${children.join('')}</h3>`
      // Don't wrap images in a <p> tag
      case Elements.image:
        return '<img src="' + element.url + '" alt="' + element.alt + '">'
      // Add a class to hyperlinks
      case Elements.embed:
        return (`
          <div class="responsive-video" style="padding: 56.25% 0 0 0"
            data-oembed="${element.oembed.embed_url}"
            data-oembed-type="${element.oembed.type}"
            data-oembed-provider="${element.oembed.provider_name}"
          >
            <style>
              iframe { height: 100%; left: 0; position: absolute; top: 0; width: 100%;" }
            </style>
            ${element.oembed.html}
          </div>
        `)
      // Return null to stick with the default behavior
      default: return null
    }
  }
}
