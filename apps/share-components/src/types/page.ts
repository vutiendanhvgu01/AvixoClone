export interface PageProps {
  titleMessage: string | null;
  message: string | null;
}

export interface RouteMatchingProps {
  route?: string;
  regex?: string;
}

export interface PermissionToRouteProps {
  [key: string]: RouteMatchingProps[];
}
