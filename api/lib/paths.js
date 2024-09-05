import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const apiDir = join(rootDir, 'api')
const webDir = join(rootDir, 'web')

export { rootDir, apiDir, webDir }
