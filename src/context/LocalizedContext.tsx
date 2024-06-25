import type { AppProps as NextJsAppProps } from 'next/app'
import { appWithTranslation, useTranslation, type UseTranslationResponse, UserConfig} from 'next-i18next'
import nextI18NextConfig from '@/../next-i18next.config.js'


console.info("i10n ------ ")
console.info(JSON.stringify(nextI18NextConfig))

const emptyInitialI18NextConfig: UserConfig = {
  i18n: {
    defaultLocale: nextI18NextConfig.i18n.defaultLocale,
    locales: nextI18NextConfig.i18n.locales,
  },
};

export const  wrapAppWithTranslation = <Props extends NextJsAppProps>( 
    WrappedComponent: React.ComponentType<Props>,
) => {
  return appWithTranslation(WrappedComponent, emptyInitialI18NextConfig);
}

export const getTranslation: UseTranslationResponse<"translation", undefined> = ()=> useTranslation('common');


export const getLocalizedString = ( meta: any, label: string, locale: string ): string => {
  const defaultString = meta[label] ||"";
  if( meta[`${label}_extended`] ) {
    return meta[`${label}_extended`][locale] ||
      meta[`${label}_extended`].default || defaultString
  }
  return defaultString
}