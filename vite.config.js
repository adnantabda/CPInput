export default {
    build: {
      rollupOptions: {
        input: {
          content: 'src/content.js'
        },
        output: {
          entryFileNames: '[name].js'
        }
      },
      outDir: 'dist',
      emptyOutDir: true,
    }
  };
  