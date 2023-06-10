import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const DISPENSE_MS_URL = `${publicRuntimeConfig.DISPENSE_MS_URL}/${publicRuntimeConfig.API_VERSION}`;

export const DISPENSE_DETAILS_ACTION = {
  ADD_ITEM: 'add-item',
  EDIT_ITEM: 'edit-item',
  DELETE_ITEM: 'delete-item',
  VIEW_HISTORY: 'view-history',
  FINALISE_DISPENSE: 'finalise-dispense',
  DELETE_DISPENSE: 'delete-dispense',
};
