import { randomBytes } from 'node:crypto'

function projectSecretGenerator() {
  return randomBytes(48).toString('base64url')
}

export default projectSecretGenerator
