import once from 'lodash.once';

export const getDefaultLocales = once(() => {
  const languageList = [];

  const navigator = window.navigator as any;

  if (typeof window !== 'undefined') {
    if (window.navigator.languages) {
      languageList.push(...navigator.languages);
    } else if (navigator.userLanguage as any) {
      languageList.push(navigator.userLanguage);
    }
  }

  languageList.push('en-GB'); // Fallback

  return languageList;
});

export const getDefaultLocale = once(() => getDefaultLocales()[0]);
