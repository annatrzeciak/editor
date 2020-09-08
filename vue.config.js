module.exports = {
  runtimeCompiler: true,
  devServer: {
    proxy: "https://api.coinpaprika.com/v1"
  }
};
