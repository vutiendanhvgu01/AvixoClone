import InventoryApiService from 'modules/prescription/service/inventory/inventory';
import { NextApiRequest, NextApiResponse } from 'next';
import { forwardRequest } from 'share-components/src';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const inventoryApiService = new InventoryApiService({}, { req, res });
  return forwardRequest(req, res, inventoryApiService.getItemInventory(req.query?.itemId as string));
}
