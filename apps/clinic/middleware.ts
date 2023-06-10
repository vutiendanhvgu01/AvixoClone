import { NextResponse, NextRequest } from 'next/server';
import jwtDecode from 'jwt-decode';
import PERMISSION_TO_ROUTES from 'permission-to-routes';
import { getAllRoutesByPermissions, getPermissionsFromString } from 'share-components/src/utils/pageUtils';
import { RouteMatchingProps } from 'share-components';

const TEMP_SKIPPING_PREFIXES = ['/queue', '/invoice', '/inventory', '/setting'];

export function middleware(request: NextRequest) {
  const pathName = `${request.nextUrl.pathname}${request.nextUrl.search}`;

  // TODO PhanNN: I will remove each item in TEMP_SKIPPING_PREFIXES list when I limit its module and related routes
  if (TEMP_SKIPPING_PREFIXES.find(item => pathName.startsWith(item)) || pathName === '/') {
    return NextResponse.next();
  }

  const token = request.cookies.get('access_token')?.value;
  if (token) {
    const data = jwtDecode(token) as any;
    if (data) {
      const permissions: string[] = Array.from(
        new Set(
          data?.acls?.reduce((result: string[], item: string) => {
            const listPermission = getPermissionsFromString(item);
            return [...result, ...listPermission];
          }, []),
        ),
      );
      const routes = getAllRoutesByPermissions(permissions, PERMISSION_TO_ROUTES);
      const matchedItem = routes.find(
        (item: RouteMatchingProps) =>
          item?.route === pathName || (item?.regex && new RegExp(item?.regex, 'g').test(pathName)),
      );
      if (matchedItem) {
        return NextResponse.next();
      }
    }
  }
  return NextResponse.redirect(new URL('/403', request.url));
}

export const config = {
  matcher: '/((?!api|_next|static|public|favicon.ico|404|403|login|logout|photo|ping|lib).*)',
};
