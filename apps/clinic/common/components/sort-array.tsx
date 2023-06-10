import { AdministrationRoute } from 'modules/catalog/types';

export const handleSortArray = (array: AdministrationRoute[]) =>
  array?.sort((a, b) => {
    if (a.description < b.description) return 1;
    if (a.description > b.description) return -1;
    return 0;
  });
