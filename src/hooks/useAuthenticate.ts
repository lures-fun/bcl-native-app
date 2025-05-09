import { useCallback, useReducer } from 'react';
import { getAuthToken, removeAuthToken, setAuthToken } from 'src/utils/secureStore';
import { useViewModelContext } from './useViewModelContext';
import { createViewModelContext } from 'src/commons/helpers/createViewModelContext';

type AuthProps = {
  loggedIn: boolean;
  accessToken: string;
  requireLogin: boolean;
  completeLogin: boolean;
  checkedAuth: boolean;
};

export type AuthState = {
  auth: AuthProps;
  loading: boolean;
};

const initState: AuthState = {
  loading: false,
  auth: {
    loggedIn: false,
    accessToken: '',
    checkedAuth: false,
    requireLogin: false,
    completeLogin: false,
  },
};

type Actions =
  | { type: 'LOGIN' }
  | { type: 'LOGIN_SUCCESS'; payload: { accessToken: string } }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'RELOAD_ACCESS_TOKEN' }
  | { type: 'LOGOUT' };

const reducer = (state: Readonly<AuthState>, action: Actions): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        loading: true,
      };
    case 'LOGIN_SUCCESS':
      setAuthToken(action.payload.accessToken);
      return {
        ...state,
        loading: false,
        auth: {
          loggedIn: true,
          accessToken: action.payload.accessToken,
          requireLogin: false,
          completeLogin: true,
          checkedAuth: true,
        },
      };
    case 'LOGIN_FAILURE':
      removeAuthToken();
      return {
        ...state,
        loading: false,
        auth: {
          loggedIn: false,
          accessToken: '',
          requireLogin: true,
          completeLogin: false,
          checkedAuth: true,
        },
      };
    case 'LOGOUT':
      removeAuthToken();
      return {
        ...state,
        auth: {
          loggedIn: false,
          accessToken: '',
          requireLogin: false,
          completeLogin: false,
          checkedAuth: true,
        },
      };
    case 'RELOAD_ACCESS_TOKEN':
      {
        const accessToken = getAuthToken();
        if (accessToken) {
          return {
            ...state,
            loading: false,
            auth: {
              loggedIn: true,
              accessToken: accessToken,
              requireLogin: false,
              completeLogin: true,
              checkedAuth: true,
            },
          };
        }
        removeAuthToken();
      }
      return {
        ...state,
        auth: {
          loggedIn: false,
          accessToken: '',
          requireLogin: true,
          completeLogin: false,
          checkedAuth: true,
        },
      };
  }
};

export const useAuthenticateCore = () => {
  const [authState, authDispatch] = useReducer(reducer, initState);

  const handleOnLogin = useCallback(() => {
    authDispatch({ type: 'LOGIN' });
  }, []);

  const handleOnLoginSuccess = useCallback(async (accessToken: string) => {
    authDispatch({
      type: 'LOGIN_SUCCESS',
      payload: { accessToken: accessToken },
    });
  }, []);

  const handleOnLoginFailure = useCallback(() => {
    authDispatch({ type: 'LOGIN_FAILURE' });
  }, []);

  const handleOnAuthenticate = useCallback(
    async (returnUrl = '/') => {
      const accessToken = getAuthToken();
      if (!accessToken) {
        authDispatch({ type: 'RELOAD_ACCESS_TOKEN' });
        return;
      }
      if (!authState.auth.accessToken) {
        authDispatch({ type: 'RELOAD_ACCESS_TOKEN' });
        return;
      }
    },
    [authDispatch, authState.auth.accessToken]
  );

  const handleOnLogout = useCallback(() => {
    authDispatch({
      type: 'LOGOUT',
    });
  }, []);

  return {
    authState,
    authDispatch,
    authenticate: handleOnAuthenticate,
    logout: handleOnLogout,
    login: handleOnLogin,
    loginSuccess: handleOnLoginSuccess,
    loginFailure: handleOnLoginFailure,
  };
};

export const { Context: AuthContext, Provider: AuthenticateProvider } =
  createViewModelContext(useAuthenticateCore);

export const useAuthenticate = () => useViewModelContext(AuthContext);
