const path = require('path')

module.exports = {
  alias: {
    '/@/': path.resolve(__dirname, 'src'),
  },
  port: 8080,
  proxy: {
    '/api': 'http://localhost:3000',
  },
}
