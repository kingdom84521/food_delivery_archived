module.exports = {
    devServer: {
      https: false,
      port: 8080,
      open: true,
      proxy: {
        '/api/v1': {
          target : 'http://localhost:1234/api/v1',
          changeOrigin: true,
          pathRewrite: {
            '^/api/v1': ''
          }
        }
      }
    }
}