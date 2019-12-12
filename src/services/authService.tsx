import store from 'app/store';

import { SITE_URL } from 'constants/urls';
import TokenUtils from 'utils/tokenUtils';
import { setUser, clearUser } from 'reducers/MiscDux';
import ApiService from 'services/apiService';

const logout = () =>{
  TokenUtils.removeToken();
  store.dispatch(clearUser());
  return Promise.resolve();
}

const login = async (code) => {
  const requestBody = {
    redirectUri: `${SITE_URL}/auth/callback`,
    code
  };
  const response = await ApiService.post(`/auth/facebook`, requestBody).catch(
    error => {
      return Promise.reject(new Error(error));
    }
  );
  return TokenUtils.storeToken(response);
}

const getFacebookRedirect = () => {
  return ApiService.get(`/auth/facebook`, {
    params: {
      redirectUri: `${SITE_URL}/auth/callback`
    }
  });
};

const getUser = async () => {
  const token = TokenUtils.getToken();
  if (!token) {
    return Promise.resolve(null);
  }

  try {
    const response = await ApiService.get('auth/me');
    if (response.status === 200) {
      const { me: userData } = response.data;
      store.dispatch(setUser({ ...userData, lastRetrieved: Date.now() }));
      return userData;
    }
    throw new Error(response.statusText);
  }catch (error){
    logout();
    return Promise.reject(new Error(error));
  }
};

export default {
  login,
  logout,
  getUser,
  getFacebookRedirect
}