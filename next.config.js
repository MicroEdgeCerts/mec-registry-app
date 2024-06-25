const path = require("path");
const i18nConfig  = require('./next-i18next.config')

console.info("i18n ++++ ") 
console.info( JSON.stringify(i18nConfig))
module.exports = {
  sassOptions: {
    fiber: false
  },
  ...i18nConfig
};