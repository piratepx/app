const zlib = require('zlib')

module.exports = require('fastify-compress')

module.exports.autoConfig = {
  encodings: ['gzip', 'deflate', 'identity'],
  zlibOptions: {
    level: zlib.constants.Z_BEST_SPEED,
  },
}
