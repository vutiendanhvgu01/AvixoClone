import { NextRouter } from 'next/router';
import { ServerResponse } from 'http';
import { Breadcrumb } from '../components/AvixoNavbar/Breadcrumbs/breadcrumbs-types';
import {
  BREADCRUMBS,
  DEFAULT_PAGE_TITLE,
  HWARD_DEFAULT_PAGE_TITLE,
  REPORT_PORTAL_DEFAULT_PAGE_TITLE,
  ROUTES,
} from '../constants';
import { toTitleCase } from './stringUtils';
import { RoleFormValues, Role } from '../components/AvixoRole/types/role';
import { PermissionToRouteProps, RouteMatchingProps } from '../types/page';

/**
 * Get page title from Url.
 * Format: ${moduleName} - Avixo CMS
 */
export const getPageTitleFromUrl = (path: string, appName = 'Avixo') => {
  const PAGE_TITLE =
    { hward: HWARD_DEFAULT_PAGE_TITLE, report: REPORT_PORTAL_DEFAULT_PAGE_TITLE }[appName] ?? DEFAULT_PAGE_TITLE;
  if (path === '/') return PAGE_TITLE;
  return `${toTitleCase(path.split('/')[1].replaceAll('-', ' '))} - ${PAGE_TITLE}`;
};

/**
 * Get breadcrumbs from router.
 */
export const getBreadcrumbsFromRouter = (router: NextRouter, params?: { isParentOrganisation: boolean }) => {
  let breadcrumbs: Breadcrumb[] = [];
  const patientUUID = router.query?.patientUUID?.toString() || '';
  const caseRef = router.query?.caseRef?.toString() || '';
  const prev = router.query?.prev?.toString() || '';
  const [patientPrefix, patientId] = prev.slice(1).split('/');

  switch (router.pathname) {
    case ROUTES.PATIENT_DASHBOARD:
      breadcrumbs = [BREADCRUMBS.PATIENT_MANAGEMENT, BREADCRUMBS.PATIENT_OVERVIEW(patientUUID)];
      break;

    case ROUTES.PATIENT_DETAILS:
      breadcrumbs = [
        BREADCRUMBS.PATIENT_MANAGEMENT,
        BREADCRUMBS.PATIENT_OVERVIEW(patientUUID),
        BREADCRUMBS.PATIENT_DETAILS(patientUUID),
      ];
      break;

    case ROUTES.PATIENT_IMMUNISATION:
      breadcrumbs = [
        BREADCRUMBS.PATIENT_MANAGEMENT,
        BREADCRUMBS.PATIENT_OVERVIEW(patientUUID),
        BREADCRUMBS.PATIENT_IMMUNISATION(patientUUID),
      ];
      break;

    case ROUTES.PATIENT_ALLERGY:
      breadcrumbs = [
        BREADCRUMBS.PATIENT_MANAGEMENT,
        BREADCRUMBS.PATIENT_OVERVIEW(patientUUID),
        BREADCRUMBS.PATIENT_ALLERGY(patientUUID),
      ];
      break;

    case ROUTES.PATIENT_PRESCRIPTION:
      breadcrumbs = [
        BREADCRUMBS.PATIENT_MANAGEMENT,
        BREADCRUMBS.PATIENT_OVERVIEW(patientUUID),
        BREADCRUMBS.PATIENT_PRESCRIPTION(patientUUID),
      ];
      break;

    case ROUTES.PATIENT_MEDICAL_RECORD:
      breadcrumbs = [
        BREADCRUMBS.PATIENT_MANAGEMENT,
        BREADCRUMBS.PATIENT_OVERVIEW(patientUUID),
        BREADCRUMBS.PATIENT_DETAILS(patientUUID),
        BREADCRUMBS.PATIENT_MEDICAL_RECORD(patientUUID),
      ];
      break;

    case ROUTES.PATIENT_MEDICAL_RECORD_REFERRAL_ADD:
    case ROUTES.PATIENT_MEDICAL_RECORD_REFERRAL_DETAILS:
      breadcrumbs = [
        BREADCRUMBS.PATIENT_MANAGEMENT,
        BREADCRUMBS.PATIENT_OVERVIEW(patientUUID),
        BREADCRUMBS.PATIENT_MEDICAL_RECORD(patientUUID),
        BREADCRUMBS.PATIENT_MEDICAL_RECORD_REFERRAL(),
      ];
      break;

    case ROUTES.ORGANISATION_DETAILS:
      breadcrumbs = [BREADCRUMBS.ORGANISATION(params?.isParentOrganisation), BREADCRUMBS.ORGANISATION_DETAILS()];
      break;

    case ROUTES.ORGANISATION_PREMISE:
      breadcrumbs = [BREADCRUMBS.PREMISE(), BREADCRUMBS.PREMISE_DETAILS()];
      break;

    case ROUTES.ORGANISATION_PRACTITIONER_DETAIL:
      breadcrumbs = [BREADCRUMBS.ORGANISATION_PRACTITIONER(), BREADCRUMBS.ORGANISATION_PRACTITIONER_DETAILS()];
      break;

    case ROUTES.HWARD_PATIENT_LIST:
      breadcrumbs = [BREADCRUMBS.HWARD_DASHBOARD(), BREADCRUMBS.HWARD_PATIENT_LIST()];
      break;

    case ROUTES.HWARD_PATIENT_DETAILS:
      breadcrumbs = [
        BREADCRUMBS.HWARD_DASHBOARD(),
        BREADCRUMBS.HWARD_PATIENT_LIST(),
        BREADCRUMBS.HWARD_PATIENT_DETAILS(patientUUID),
      ];
      break;

    case ROUTES.HWARD_CASE_DETAILS:
      if (patientPrefix.includes('patient')) {
        breadcrumbs = [
          BREADCRUMBS.HWARD_DASHBOARD(),
          BREADCRUMBS.HWARD_PATIENT_LIST(),
          BREADCRUMBS.HWARD_PATIENT_DETAILS(patientId),
          BREADCRUMBS.HWARD_CASE_DETAILS(caseRef),
        ];
      } else {
        breadcrumbs = [BREADCRUMBS.HWARD_DASHBOARD(), BREADCRUMBS.HWARD_CASE_DETAILS(caseRef)];
      }
      break;

    case ROUTES.HWARD_APPOINTMENTS:
      breadcrumbs = [BREADCRUMBS.HWARD_DASHBOARD(), BREADCRUMBS.HWARD_APPOINTMENTS()];
      break;

    default:
  }

  return breadcrumbs;
};

export const forceRedirectPage = (res: ServerResponse, path: string) => {
  if (res) {
    res.writeHead(307, { Location: path });
    res.end();
  }
};

export const generatePermissionSlug = (prefix: string, permission: string): string =>
  `${prefix}_${permission}`.toUpperCase();

export const getActionFromScopeString = (scope: string): string[] => {
  const items = scope.split(':');
  return items[1].split(',');
};
export const getPermissionsFromString = (scope: string): string[] => {
  const items = scope.split(':');
  const scopeItems = items[0].split('/');
  const permissions = items[1].split(',');
  return permissions.map((permission: string) => generatePermissionSlug(scopeItems[3], permission));
};

export const getAllRoutesByPermissions = (
  permissions: string[],
  permissionToRouteMap: PermissionToRouteProps,
): RouteMatchingProps[] => {
  let result: RouteMatchingProps[] = [];
  permissions?.forEach((permission: string) => {
    if (permissionToRouteMap[permission]) {
      result = [...result, ...permissionToRouteMap[permission]];
    }
  });
  return result;
};

export const filterMenuByValidRoutes = (menuItems: any[], routes: string[]): any[] => {
  const result = menuItems.reduce((newArr, menuItem) => {
    const validItems = menuItem.items?.filter((item: any) => item?.children || routes.includes(item?.path));
    if (validItems?.length === 0) {
      return newArr;
    }
    const afterFilledItem = validItems.reduce((itemList: any[], item: any) => {
      if (item?.children) {
        const childrenItems = item.children.filter((child: any) => routes.includes(child?.path));
        if (childrenItems?.length > 0) {
          return [
            ...itemList,
            {
              ...item,
              children: childrenItems,
            },
          ];
        }
        return itemList;
      }
      return [...itemList, item];
    }, []);

    return [
      ...newArr,
      {
        ...menuItem,
        items: afterFilledItem,
      },
    ];
  }, []);
  return result.filter((item: any) => item?.items?.length > 0);
};

/*
  Example: 
  menuItems = [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          path: '/',
          icon: <DashboardIcon />,
        },
        {
          title: 'Appointment',
          module: 'appointment',
          path: '/appointment',
          icon: <AppointmentIcon />,
        },
        {
          title: 'Queue',
          module: 'queue',
          path: '/queue',
          icon: <QueueIcon width={20} height={20} />,
        },
      ],
    },
    {
      title: 'Admin',
      items: [
        {
          title: 'Prescriptions',
          module: 'prescription',
          path: '/prescription',
          icon: <PrescriptionsIcon />,
        },
        {
          title: 'Dispensing',
          module: 'dispense',
          path: '/dispense',
          icon: <DispenseIcon />,
        },
        {
          title: 'Invoicing',
          module: 'invoice',
          path: '/invoice',
          icon: <PaymentIcon width={20} height={20} />,
        },
        {
          title: 'Practitioners & Roles',
          icon: <UserMenuIcon />,
          children: [
            {
              title: 'Practitioner',
              module: 'users',
              path: '/practitioner',
            },
            {
              title: 'Roles',
              module: 'users',
              path: '/role',
            },
          ],
        },
      ],
    },
  ];
  modules = ['users', 'dispense']
  => expected result = [
    {
      title: 'Admin',
      items: [
        {
          title: 'Dispensing',
          module: 'dispense',
          path: '/dispense',
          icon: <DispenseIcon />,
        },
        {
          title: 'Practitioners & Roles',
          icon: <UserMenuIcon />,
          children: [
            {
              title: 'Practitioner',
              module: 'users',
              path: '/practitioner',
            },
            {
              title: 'Roles',
              module: 'users',
              path: '/role',
            },
          ],
        },
      ],
    },
  ]
*/
export const filterMenuByModules = (menuItems: any[], modules: string[]): any[] => {
  if (!modules || modules.length === 0) {
    return [];
  }

  const result = menuItems.reduce((newArr, menuItem) => {
    const validItems = menuItem.items?.filter((item: any) => item?.children || modules.includes(item?.module));
    if (validItems?.length === 0) {
      return newArr;
    }
    const afterFilledItem = validItems.reduce((itemList: any[], item: any) => {
      if (item?.children) {
        const childrenItems = item.children.filter((child: any) => modules.includes(child?.module));
        if (childrenItems?.length > 0) {
          return [
            ...itemList,
            {
              ...item,
              children: childrenItems,
            },
          ];
        }
        return itemList;
      }
      return [...itemList, item];
    }, []);

    return [
      ...newArr,
      {
        ...menuItem,
        items: afterFilledItem,
      },
    ];
  }, []);
  return result.filter((item: any) => item?.items?.length > 0);
};

export const getModuleStrings = (modules: any[]) => {
  let moduleStrings: string[] = [];
  modules.forEach(module => {
    if (module?.sub_services) {
      moduleStrings = [...moduleStrings, ...module.sub_services.map((item: any) => item?.name)];
    }
    moduleStrings.push(module.name);
  });
  return moduleStrings;
};

export const getRoleSelectedValues = (role: Role): Role => {
  const initialSetting: RoleFormValues['setting'] = {};
  role.permissions?.forEach(per => {
    const action = getActionFromScopeString(per.scope).reduce((accumulatorScope, currentScope) => {
      if (currentScope === '') {
        return { ...accumulatorScope };
      }
      return { ...accumulatorScope, [currentScope]: true };
    }, {} as Record<string, boolean>);

    initialSetting[per.description] = {
      id: per.id,
      isEnabled: !!Object.keys(action).length,
      ...action,
    };
  });
  return {
    ...role,
    setting: {
      ...initialSetting,
      invoice: {
        ...initialSetting?.invoice,
        add_access_given: [],
        delete_access_given: [],
      },
    },
  };
};
