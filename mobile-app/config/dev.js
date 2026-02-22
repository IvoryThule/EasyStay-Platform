export default {
  env: {
    NODE_ENV: '"development"',
    TARO_APP_API_BASE_URL: '"/api"'
  },
  mini: {},
  h5: {
    devServer: {
      port: 10086,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true
        }
      }
    }
  }
}
