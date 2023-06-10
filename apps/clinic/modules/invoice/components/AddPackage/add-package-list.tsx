import { Typography } from '@mui/material';
import React from 'react';
import { AvixoTable } from 'share-components';
import { AvixoTableColumnProps } from 'share-components/src/components/AvixoTable/avixo-table-types';
import { AddPackageListProps, PackageItem } from './add-package-form-type';

const mockListPackage: PackageItem[] = [
  {
    id: 1,
    quantity: '1',
    name: 'name 1',
    type: 'type 1',
    price: 'price 1',
  },
  {
    id: 2,
    quantity: '1',
    name: 'name 2',
    type: 'type 1',
    price: 'price 1',
  },
  {
    id: 3,
    quantity: '3',
    name: 'name 1',
    type: 'type 1',
    price: 'price 1',
  },
];

const tableColumn: Array<AvixoTableColumnProps<PackageItem>> = [
  {
    id: 'id',
    field: 'id',
    label: 'No.',
    alignLabel: 'left',
  },
  {
    id: 'type',
    field: 'type',
    label: 'Type',
    alignLabel: 'left',
  },
  {
    id: 'name',
    field: 'name',
    label: 'Name',
    alignLabel: 'left',
  },
  {
    id: 'quantity',
    field: 'quantity',
    label: 'Quantity',
    alignLabel: 'left',
  },
  {
    id: 'price',
    field: 'price',
    label: 'Price',
    alignLabel: 'left',
  },
];

const AddPackageList: React.FC<AddPackageListProps> = ({ listPackage = [] }) => (
  <AvixoTable
    columns={tableColumn}
    data={{ records: listPackage }}
    mode={'offline'}
    primaryKey="name"
    hasCheckBoxHeader={false}
    hasPagination={false}
    emptyText={
      <>
        <Typography>The list you are viewing is empty.</Typography>
        <Typography> Add item from the selection above.</Typography>
      </>
    }
  />
);

export default AddPackageList;
