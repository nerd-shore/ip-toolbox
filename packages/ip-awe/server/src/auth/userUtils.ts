import OidcUser from './OidcUser';

export const getAccountId = (user: OidcUser) => {
  const accountId = user.profile.mfm && user.profile.mfm['account-id'];
  return !!accountId ? accountId : '';
};
