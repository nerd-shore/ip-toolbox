export interface EnvironmentValues {
  environment: 'local' | 'dev' | 'qa' | 'prod';
  authBaseUrl: string;
  ssoLogLevel: 'debug' | 'error';
}

declare global {
  export const APP_VERSION: string;
  interface Window {
    wipEnvironment: EnvironmentValues;
  }
}

const getQueryParam = (paramName: string) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(paramName);
};

const getSsoLogLevelFromQuery = () => {
  const logLevelParam = getQueryParam('ssoLogLevel');
  return ['debug', 'error'].includes(logLevelParam || '') ? (logLevelParam as EnvironmentValues['ssoLogLevel']) : null;
};

export const envValues = (): EnvironmentValues => {
  return {
    ...window.wipEnvironment,
    ssoLogLevel: getSsoLogLevelFromQuery() || window.wipEnvironment?.ssoLogLevel,
  };
};
