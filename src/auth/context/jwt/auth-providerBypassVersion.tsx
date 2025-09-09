'use client';

import { useMemo, useEffect, useReducer, useCallback } from 'react';

import axios, { endpoints } from 'src/utils/axios';

import { useMockedUser } from 'src/hooks/use-mocked-user'; // 新增這行

import { AuthContext } from './auth-context';
import { setSession, isValidToken } from './utils';
import { AuthUserType, ActionMapType, AuthStateType } from '../../types';

// ----------------------------------------------------------------------
/**
 * NOTE:
 * We only build demo at basic level.
 * Customer will need to do some extra handling yourself if you want to extend the logic and other features...
 */
// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'accessToken';
const MOCK_ACCESS_TOKEN = 'mock-access-token-from-login';

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 新增：取得 mock user
  const { user: mockedUser } = useMockedUser();

  const initialize = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(STORAGE_KEY);

      // ✅ [修正1] 在初始化時，繞過對 mock token 的驗證
      if (accessToken && (accessToken === MOCK_ACCESS_TOKEN || isValidToken(accessToken))) {
        // 如果是 mock token，我們需要手動設定 axios header，因為我們不會呼叫 setSession
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        // 直接用 mock user 取代 axios 請求
        // const res = await axios.get(endpoints.auth.me);
        // const { user } = res.data;

        dispatch({
          type: Types.INITIAL,
          payload: {
            user: {
              ...mockedUser,
              accessToken,
            },
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, [mockedUser]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(
    async (email: string, password: string) => {
      // const data = { email, password };
      // const res = await axios.post(endpoints.auth.login, data);
      // const { accessToken, user } = res.data;

      // ✅ [修正2] 在登入時，完全手動處理 mock token，不再呼叫 setSession

      // 1. 手動存入 sessionStorage
      sessionStorage.setItem(STORAGE_KEY, MOCK_ACCESS_TOKEN);

      // 2. 手動設定 axios header
      axios.defaults.headers.common.Authorization = `Bearer ${MOCK_ACCESS_TOKEN}`;

      // 3. 更新 context 狀態
      dispatch({
        type: Types.LOGIN,
        payload: {
          user: {
            ...mockedUser,
            accessToken: MOCK_ACCESS_TOKEN,
          },
        },
      });
    },
    [mockedUser]
  );

  // REGISTER
  const register = useCallback(
    async (email: string, password: string, firstName: string, lastName: string) => {
      const data = {
        email,
        password,
        firstName,
        lastName,
      };

      const res = await axios.post(endpoints.auth.register, data);

      const { accessToken, user } = res.data;

      sessionStorage.setItem(STORAGE_KEY, accessToken);

      dispatch({
        type: Types.REGISTER,
        payload: {
          user: {
            ...user,
            accessToken,
          },
        },
      });
    },
    []
  );

  // LOGOUT
  const logout = useCallback(async () => {
    // ✅ [修正3] 登出時，呼叫 setSession(null) 是安全的，因為它不會觸發 jwtDecode
    setSession(null);
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      register,
      logout,
    }),
    [login, logout, register, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
