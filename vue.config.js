const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    'open': process.platform === 'darwin',
    'host':'localhost',
    'port':8080,
    'https':true,

  }
})
module.exports.devServer.proxy = {
  '/api': {
    target: 'https://cheezapi20241207133934.azurewebsites.net/api/v1',
    changeOrigin: true,
    secure: false,
    onProxyReq: (proxyReq, req) => {
      proxyReq.setHeader('Cookie', req.headers.cookie || '');
    }
  }
}