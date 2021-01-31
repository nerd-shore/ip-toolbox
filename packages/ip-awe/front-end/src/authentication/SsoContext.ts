import { User } from '@fielmann-ag/sso-client-lib';
import * as React from 'react';

export interface SsoState {
  ssoUser: User | null | undefined;
}

export const defaultSsoState: SsoState = {
  ssoUser: undefined,
};

export const SsoContext = React.createContext(defaultSsoState);

export const useSso = () => React.useContext(SsoContext);
