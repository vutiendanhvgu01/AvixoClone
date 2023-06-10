import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';

export const getCookieValue = (key: string, context: Partial<GetServerSidePropsContext>) =>
  getCookie(key, { req: context.req, res: context.res });

export const setCookieValue = (key: string, value: string, context: Partial<GetServerSidePropsContext>) =>
  setCookie(key, value, { req: context.req, res: context.res });

export const removeCookieValue = (key: string, context: Partial<GetServerSidePropsContext>) =>
  deleteCookie(key, { req: context.req, res: context.res });
