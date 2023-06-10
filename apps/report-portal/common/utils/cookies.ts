import { KEY_ACCESS_TOKEN } from 'common/constants';
import { hasCookie, deleteCookie, getCookie, setCookie } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';

type Context = Partial<GetServerSidePropsContext>;

const getAvixoId = (ctx: Context) => getCookie(KEY_ACCESS_TOKEN, { req: ctx.req, res: ctx.res });

const setAvixoId = (avixoId: string, ctx: Context) =>
  setCookie(KEY_ACCESS_TOKEN, avixoId, { req: ctx.req, res: ctx.res });

const deleteAvixoId = (ctx: Context) => deleteCookie(KEY_ACCESS_TOKEN, { req: ctx.req, res: ctx.res });

const isLoggedIn = (ctx: Context) => hasCookie(KEY_ACCESS_TOKEN, { req: ctx.req, res: ctx.res });

export { getAvixoId, setAvixoId, deleteAvixoId, isLoggedIn };
