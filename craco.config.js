const path = require('path');

module.exports = {
  webpack: {
    alias: {
      // Force any import/require('tailwindcss') to resolve to the top-level tailwind v4
      'tailwindcss': path.resolve(__dirname, 'node_modules', 'tailwindcss')
    }
  },
  style: {
    postcss: {
      // Ensure CRA's PostCSS uses the v4 adapter and autoprefixer
      plugins: [
        require('@tailwindcss/postcss'),
        require('autoprefixer')
      ]
    }
  }
};
