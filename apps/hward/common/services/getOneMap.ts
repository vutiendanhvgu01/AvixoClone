import { ONEMAP_URI } from 'common/constants/urls';

export interface OneMapSuggestion {
  ADDRESS: string;
  BLK_NO: string;
  BUILDING: string;
  LATITUDE: string;
  LONGITUDE: string;
  POSTAL?: string;
  ROAD_NAME: string;
  SEARCHVAL: string;
  X: string;
  Y: string;
}

export default async function getOneMap(query: string) {
  const url = `${ONEMAP_URI}?searchVal=${encodeURIComponent(query)}&returnGeom=Y&getAddrDetails=Y&pageNum=1`;
  const response = await fetch(url);
  const { results } = (await response.json()) as { results: OneMapSuggestion[] };
  return results;
}
