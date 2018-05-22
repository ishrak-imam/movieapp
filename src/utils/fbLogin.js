
import FBSDK from 'react-native-fbsdk';
const {LoginManager, AccessToken} = FBSDK;

export const promptFbLogin = () => {
  return LoginManager.logInWithReadPermissions(['public_profile', 'email']);
};

export const getFbAccessToken = () => {
  return AccessToken.getCurrentAccessToken();
};

export const getFbUserData = accessToken => {
  const url = `https://graph.facebook.com/v2.5/me?fields=email,name,picture&access_token=${accessToken}`;
  /* eslint-disable */
  return fetch(url).then(response => response.json());
};
