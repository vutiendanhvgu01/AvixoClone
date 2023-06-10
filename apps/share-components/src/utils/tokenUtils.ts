import { GetServerSidePropsContext } from 'next';
import { getCookieValue, setCookieValue, removeCookieValue } from './cookieUtils';

const KEY_ASSESS_TOKEN = 'access_token';

export const getToken = (context: Partial<GetServerSidePropsContext>) => getCookieValue(KEY_ASSESS_TOKEN, context);

export const setToken = (token: string, context: Partial<GetServerSidePropsContext>) =>
  setCookieValue(KEY_ASSESS_TOKEN, token, context);

export const removeToken = (context: Partial<GetServerSidePropsContext>) =>
  removeCookieValue(KEY_ASSESS_TOKEN, context);
