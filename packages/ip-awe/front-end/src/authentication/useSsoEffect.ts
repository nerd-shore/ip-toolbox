import { User } from '@fielmann-ag/sso-client-lib';
import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { getUser, initSsoLib } from './ssoLibHandler';

export const useSsoEffect = () => {
  const [ssoUser, setSsoUser] = useState<User | null | undefined>(undefined);
  const [ssoLibAvailable, setSsoLibAvailable] = useState<boolean>(false);

  const fetchAndSetUser = async () => setSsoUser(await getUser());

  useEffect(() => {
    if (!ssoLibAvailable) {
      const updateSsoUser = (user: User | undefined) => setSsoUser(user);
      initSsoLib(updateSsoUser);
      setSsoLibAvailable(true);
    } else {
      fetchAndSetUser();
    }
  }, [ssoLibAvailable]);

  return [ssoUser, setSsoUser] as [User | null | undefined, Dispatch<SetStateAction<User | null | undefined>>];
};
