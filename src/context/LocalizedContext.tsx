import type { AppProps as NextJsAppProps } from 'next/app'
import { appWithTranslation, useTranslation } from 'next-i18next'
import {  } from 'next-i18next'

export const  wrapAppWithTranslation = <Props extends NextJsAppProps>( 
    WrappedComponent: React.ComponentType<Props>,
) => {
  return appWithTranslation(WrappedComponent);
}



export const getLocalizedString = ( meta: any, label: string, locale: string ): string => {
  const defaultString = meta[label] ||"";
  if( meta[`${label}_extended`] ) {
    return meta[`${label}_extended`][locale] ||
      meta[`${label}_extended`].default || defaultString
  }
  return defaultString
}