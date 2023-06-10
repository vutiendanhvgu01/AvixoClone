import { ReactNode } from 'react';

export interface ListHeaderType {
  subTitle: string;
  mainTitleComponent: JSX.Element;
  detailTextComponent?: JSX.Element;
  buttonListComponent?: ReactNode;
  widthLeftBox?: string;
  widthRightBox?: string;
}
