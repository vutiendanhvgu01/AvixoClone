import { BaseInteface } from '../../utils/interfaceUtils';

export type TimeZone = BaseInteface & {
  name?: string;
  code?: string;
  offset?: string;
};

export type Errors = { [key: string]: string };
