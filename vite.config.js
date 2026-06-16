import { resolve, dirname } from 'path'
import { defineConfig } from 'vite'
import { globSync } from 'glob'

// All source lives under src/, which is the web root.
const root = resolve(__dirname, 'src')

// Automatically detect all index.html files under src/
const htmlFiles = globSync('**/index.html', { cwd: root })

// Convert each file into a { unique_name: full_path } pair
const input = Object.fromEntries(
  htmlFiles.map(file => {
    const name = dirname(file) === '.' ? 'main' : dirname(file).replace(/\//g, '_').replace(/\\/g, '_')
    return [name, resolve(root, file)]
  })
)

export default defineConfig({
  root,
  // public/ and the build output stay at the project root, outside src/
  publicDir: resolve(__dirname, 'public'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input,
    },
  },
})
