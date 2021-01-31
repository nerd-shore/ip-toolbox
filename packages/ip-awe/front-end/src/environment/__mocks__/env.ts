import { EnvironmentValues } from '../env';

export const envValues = (): EnvironmentValues => {
  return {
    authBaseUrl: '',
    environment: 'local',
    ssoLogLevel: 'debug',
  };
};
