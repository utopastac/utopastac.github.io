import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default {
  plugins: {
    'postcss-import': {
      resolve(id, basedir) {
        if (id.startsWith('@styles/')) {
          return path.resolve(__dirname, 'src/styles', id.slice(8))
        }
        return path.resolve(basedir, id)
      },
    },
    'postcss-mixins': {},
  },
}
