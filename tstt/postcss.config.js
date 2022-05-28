module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // 能够把所有元素的px单位转换成Rem
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
