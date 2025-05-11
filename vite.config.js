import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  build: {
    outDir: 'dist',  // Output directory for the build
    emptyOutDir: true,  // Clean the dist folder before building
    rollupOptions: {
      input: {
        content: 'src/content.js',  // Your main JS file
      },
      output: {
        entryFileNames: '[name].js',  // Output JS file naming
      },
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'src/highlight.css',  // Copy the CSS file
          dest: 'assets',  // Copy to 'dist/assets' folder
        },
        {
          src: 'public/icons/*',  // Copy icons
          dest: 'icon',  // Copy to 'dist/icon' folder
        },
      ],
    }),
  ],
});
