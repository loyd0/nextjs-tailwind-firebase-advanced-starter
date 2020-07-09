const withCSS = require('@zeit/next-css')
module.exports = withCSS({


    // https://nextjs.org/docs/api-reference/next.config.js/configuring-onDemandEntries
    // to prevent the page auto reloading all the time
    onDemandEntries: {
      // period (in ms) where the server will keep pages in the buffer
      // maxInactiveAge: 400 * 1000,
      // number of pages that should be kept simultaneously without being disposed
      pagesBufferLength: 2,
    },
  })
  