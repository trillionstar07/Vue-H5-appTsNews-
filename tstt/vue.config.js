const { defineConfig } = require('@vue/cli-service')
// const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  css: {
    loaderOptions: {
      less: {
      // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            //  直接覆盖变量
            // 'nav-bar-background-color': '#1b1b1bd0',
            // 'nav-bar-title-font-size': '18px',
            // 'nav-bar-title-text-color': '#fff'
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            // __dirname 值：是node环境下的内置全局变量，可以得到当前文件的绝对路径
            hack: 'true; @import "/src/styles/cover.less";'
            // hack: 'true; @import "${path.join(__dirname,'/src/styles/cover.less')}";'
          }
        }
      }
    }
  },
  publicPath: './'
})
