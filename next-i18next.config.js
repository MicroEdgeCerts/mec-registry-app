module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ja'],
  },
  localePath:
    typeof window === 'undefined'
      ? require('path').resolve('./resources/locales')
      : './resources/locales',
  ns: ['common'],

}
