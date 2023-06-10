import { Box, IconButton, Typography, Tooltip, Avatar } from '@mui/material';
import Link from 'next/link';
import React, { ReactNode, useCallback } from 'react';
import { AvixoTable, TrashIcon } from 'share-components';
import { AvixoTableColumnProps } from 'share-components/src/components/AvixoTable/avixo-table-types';
import { PAGE_URLS } from 'share-components/src/constants';
import { styled } from '@mui/material/styles';
import { Organisation } from 'modules/organisation/types/organisation-types';
import { useRouter } from 'next/router';
import { PRACTITIONER_LIST_ACTION } from '../constants';
import Practitioner, { Phone, Email } from '../types/practitioner-types';

const TextField = styled(Typography)(({ theme }) => ({
  color: theme.palette.black.main,
}));

const PractitionerCategory = styled(Typography)(({ theme }) => ({
  color: theme.palette?.chart?.blue5,
}));

const PractitionerEmail = styled(Typography)(({ theme }) => ({
  color: theme.palette?.neutral?.[500],
}));

const PractitionerStatus = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  textTransform: 'capitalize',
}));

const StatusBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.success.main,
  width: 'fit-content',
  padding: '2px 8px',
  borderRadius: 20,
}));

const RemoveButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  textTransform: 'capitalize',
  '&:hover': {
    background: theme.palette.primary.contrastText,
    color: theme.palette.primary.main,
    '& path': {
      fill: theme.palette.primary.main,
    },
  },
}));

const getTableColumns = (onRowClick: (id: number) => void): Array<AvixoTableColumnProps> => [
  {
    id: 'practitionerId',
    field: 'id',
    label: 'Pra. ID',
    alignLabel: 'left',
  },
  {
    id: 'name',
    field: 'name',
    label: 'Name',
    alignLabel: 'left',
    customRender: (value: Practitioner) => {
      const { name, photo, profession = {}, id = 0 } = value;
      return (
        <Box sx={{ display: 'flex' }} onClick={() => onRowClick(id)}>
          <Avatar alt={name || ''} src={photo} />
          <Box sx={{ ml: '12px', alignSelf: 'center' }}>
            <TextField height="fitContent" variant="subtitle2">
              {name}
            </TextField>
            {profession?.category && (
              <PractitionerCategory variant="subtitle2">{profession.category}</PractitionerCategory>
            )}
          </Box>
        </Box>
      );
    },
  },
  {
    id: 'phones',
    field: 'phones',
    label: 'Contact',
    alignLabel: 'left',
    customRender: (value: Practitioner) => {
      const { phones = [], emails = [] } = value;

      return (
        <Box>
          {phones.map((phone: Phone) => (
            <TextField key={phone.id}>{phone.number}</TextField>
          ))}

          {emails.map((email: Email) => (
            <PractitionerEmail key={email.id} variant="body2">
              {email.email}
            </PractitionerEmail>
          ))}
        </Box>
      );
    },
  },
  {
    id: 'premises',
    field: 'premises',
    label: 'Premise',
    alignLabel: 'left',
    customRender: (value: Practitioner) => {
      const { premises = [] } = value;
      return (
        <Box>
          {premises.map((premise: any) => (
            <TextField key={premise?.id}>{premise?.name}</TextField>
          ))}
        </Box>
      );
    },
  },
  {
    id: 'organisations',
    field: 'organisations',
    label: 'organisation',
    alignLabel: 'left',
    customRender: (value: Practitioner) => {
      const { organisations = [] } = value;
      return (
        <Box>
          {organisations.map((organisation: Organisation) => (
            <TextField key={organisation.id}>{organisation.name}</TextField>
          ))}
        </Box>
      );
    },
  },
  {
    id: 'status',
    field: 'status',
    label: 'status',
    alignLabel: 'left',
    customRender: (value: Practitioner) => {
      const { status = 'active' } = value;
      return (
        <StatusBox>
          <PractitionerStatus variant="caption">{status}</PractitionerStatus>
        </StatusBox>
      );
    },
  },
  {
    id: 'description',
    field: 'description',
    label: 'description',
    alignLabel: 'left',
    customRender: (value: Practitioner) => {
      const { description = '-' } = value;
      return <TextField variant="caption">{description}</TextField>;
    },
  },
  {
    id: 'actions',
    field: '',
    label: 'actions',
    alignLabel: 'left',
    customRender: (value: Practitioner) => (
      <Tooltip placement="top" id="practitioner-remove-btn" title="Remove Practitioner">
        <Link
          href={`${PAGE_URLS.PRACTITIONER(PRACTITIONER_LIST_ACTION.DELETE_PRACTITIONER, value?.id)}&titleMessage=${
            value?.name
          }`}
        >
          <RemoveButton area-label="practitioner-remove-btn">
            <TrashIcon />
          </RemoveButton>
        </Link>
      </Tooltip>
    ),
  },
];

export interface PractitionerListProps {
  practitioners: Practitioner[];
  emptyText?: string | ReactNode;
}

const PractitionerList: React.FC<PractitionerListProps> = ({ practitioners, emptyText }) => {
  const router = useRouter();

  const onRowClick = useCallback(
    (id = 0) => {
      router.push(PAGE_URLS.PRACTITIONER_DETAIL(id));
    },
    [router],
  );

  return (
    <Box sx={{ mx: -3 }}>
      <AvixoTable
        columns={getTableColumns(onRowClick)}
        data={{ records: practitioners || [] }}
        primaryKey="id"
        mode="offline"
        hasCheckBoxHeader={false}
        emptyText={emptyText}
        hasPagination
      />
    </Box>
  );
};

export default PractitionerList;
