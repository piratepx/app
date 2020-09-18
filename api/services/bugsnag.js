const Bugsnag = require('@bugsnag/js')

const package = require('@/../package')

module.exports = Bugsnag.start({
  apiKey: process.env.BUGSNAG_API_KEY,
  appVersion: package.version,
  enabledReleaseStages: ['production'],
})
