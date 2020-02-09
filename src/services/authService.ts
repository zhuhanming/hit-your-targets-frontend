import store from 'app/store';

import SITE_URL from 'constants/urls';
import TokenUtils from 'utils/tokenUtils';
import { setUser, clearUser } from 'reducers/MiscDux';
import {
  setToDos,
  setCompleteOrder,
  setIncompleteOrder
} from 'reducers/ToDoDux';
import { cancelSearch } from 'reducers/SearchDux';
import ApiService from 'services/apiService';

const logout = (): Promise<void> => {
  TokenUtils.removeToken();
  store.dispatch(clearUser());
  store.dispatch(setToDos([]));
  store.dispatch(cancelSearch());
  return Promise.resolve();
};

const signup = async (code): Promise<null> => {
  const response = await ApiService.post('/signup', code).catch(error => {
    return Promise.reject(new Error(error));
  });
  if (response.data.message === 'Account already exists') {
    return Promise.reject(
      new Error('Account already exists! Please login instead.')
    );
  }
  return TokenUtils.storeToken(response);
};

const login = async (code): Promise<null> => {
  const response = await ApiService.post('/auth/login', code).catch(error => {
    if (error.message === 'Request failed with status code 401') {
      return Promise.reject(
        new Error('Invalid login credentials, please try again.')
      );
    }
    return Promise.reject(new Error('Something went wrong, please try again.'));
  });
  return TokenUtils.storeToken(response);
};

const facebookLogin = async (code): Promise<null> => {
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
};

const getFacebookRedirect = (): Promise<any> => {
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
      const { completeOrder, incompleteOrder, ...userData } = response.data;
      store.dispatch(setUser({ ...userData, lastRetrieved: Date.now() }));
      store.dispatch(setCompleteOrder(completeOrder));
      store.dispatch(setIncompleteOrder(incompleteOrder));
      return userData;
    }
    throw new Error(response.statusText);
  } catch (error) {
    logout();
    return Promise.reject(new Error(error));
  }
};

export default {
  signup,
  login,
  logout,
  getUser,
  facebookLogin,
  getFacebookRedirect
};
