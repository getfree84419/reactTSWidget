import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

/**
 * Unified Widget Build Configuration
 * This config bundles all components into a single library file (UMD format)
 * so they can be easily injected into any website via a <script> tag.
 */
export default defineConfig({
  // Enable React support (JSX transformation, Fast Refresh, etc.)
  plugins: [react()],

  // Define global constants to be replaced during build time
  define: {
    'process.env': {},
    // Explicitly set production mode to optimize React and third-party libraries
    'process.env.NODE_ENV': JSON.stringify('production'),
  },

  build: {
    // Library Mode: Configures the project to be built as a reusable package
    lib: {
      // Entry point that exports all widgets
      entry: resolve(__dirname, 'src/all-widgets.tsx'),
      // Global variable name for the UMD build (available as window.AllWidgets)
      name: 'AllWidgets',
      // Generate specific filename based on the output format
      fileName: (format) => {
        if (format === 'umd') {
          return 'all-widgets.umd.js'
        }
        return `all-widgets.${format}.js`
      },
      // Target UMD format for maximum compatibility with script tags
      formats: ['umd'],
    },

    rollupOptions: {
      // Exclude React from the bundle to reduce file size
      // The hosting environment is expected to provide these dependencies
      external: ['react', 'react-dom'],
      output: {
        // Map externalized dependencies to global variables used in the browser
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        // Customize asset filenames (like CSS)
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'all-widgets.css'
          }
          return assetInfo.name || 'asset'
        },
        // Define an ID for AMD (Asynchronous Module Definition) loaders
        amd: {
          id: 'all-widgets'
        },
      },
    },

    // Output directory for the bundled widget files
    outDir: 'dist/widget',

    // Disable CSS code splitting to bundle all styles into a single .css file
    // This makes it easier for users to include the widget's styling
    cssCodeSplit: false,
  },
})