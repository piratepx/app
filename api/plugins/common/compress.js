const zlib = require('zlib')

module.exports = require('fastify-compress')

module.exports.autoConfig = {
  brotliOptions: {
    params: {
      [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
      [zlib.constants.BROTLI_PARAM_QUALITY]: 1,
    },
  },
  zlibOptions: {
    level: zlib.constants.Z_BEST_SPEED,
  },
}
