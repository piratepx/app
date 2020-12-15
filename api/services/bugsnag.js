const Bugsnag = require('@bugsnag/js')

const package = require('@/../package')

module.exports = process.env.BUGSNAG_API_KEY
  ? Bugsnag.start({
      apiKey: process.env.BUGSNAG_API_KEY,
      appVersion: package.version,
      enabledReleaseStages: ['production'],
    })
  : null
