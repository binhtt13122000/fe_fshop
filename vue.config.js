module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    proxy: 'http://localhost:8082/v1/api',
    disableHostCheck: true,
    port: 8080,
    public: '0.0.0.0:8080',
    https: false,
    hot: true,
  }
}