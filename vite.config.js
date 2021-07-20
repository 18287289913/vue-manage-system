import vue from '@vitejs/plugin-vue'

export default {
  base: './',
  plugins: [vue()],
  optimizeDeps: {
    include: ['schart.js']
  },
  // proxy: {
  //   ["/dev-api"]: {
  //     target: 'http://localhost:3012',
  //     changeOrigin: true,
  //     pathRewrite: {
  //       ['^' + "/dev-ap"]: ''
  //     }
  //   }
  // }
}

// module.exports = {
//     proxy: {
//       ["/dev-api"]: {
//         target: 'http://localhost:3012',
//         changeOrigin: true,
//         pathRewrite: {
//           ['^' + "/dev-ap"]: ''
//         }
//       }
//     }
// }