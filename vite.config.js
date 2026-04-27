import { resolve, dirname } from 'path'
import { defineConfig } from 'vite'
import { globSync } from 'glob'

// Automatically detect all index.html files in the project
const htmlFiles = globSync('**/index.html', {
  ignore: ['node_modules/**', 'dist/**']
})

// Convert each file into a { unique_name: full_path } pair
const input = Object.fromEntries(
  htmlFiles.map(file => {
    const name = dirname(file) === '.' ? 'main' : dirname(file).replace(/\//g, '_').replace(/\\/g, '_')
    return [name, resolve(__dirname, file)]
  })
)

export default defineConfig({
  build: {
    rollupOptions: {
      input,
    },
  },
}) 