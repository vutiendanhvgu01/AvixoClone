import { Avatar, Box, IconButton, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useCallback } from 'react';
import { AvixoSearchBar, AvixoTable, TrashIcon } from 'share-components';
import { AvixoTableColumnProps } from 'share-components/src/components/AvixoTable/avixo-table-types';
import { PAGE_URLS } from 'share-components/src/constants';
import type Premise from 'modules/premise/components/premise-types';
import type { Organisation } from 'modules/organisation/components/organisation-types';
import { Email, Phone, Practitioner, PractitionerListProps } from '../../types/practitioner';

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

const getTableColumns = (onRowClick: (id: string, organisationId: string) => void): Array<AvixoTableColumnProps> => [
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
      const { name, photo, profession, id = '', organisations = [] } = value;
      return (
        <Box sx={{ display: 'flex' }} onClick={() => onRowClick(id.toString(), organisations[0].id.toString())}>
          <Avatar alt={name || ''} src={photo} />
          <Box sx={{ ml: '12px', alignSelf: 'center' }}>
            <TextField height="fitConetent" variant="subtitle2">
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
          {premises.map((premise: Premise) => (
            <TextField key={premise.id}>{premise.name}</TextField>
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
    field: 'id',
    label: 'actions',
    alignLabel: 'left',
    customRender: (value: Practitioner) => (
      <Tooltip placement="top" id="practitioner-remove-btn" title="Remove Practitioner">
        <Link
          href={`${PAGE_URLS.ORGANISATION('Practitioner')}&action=delete-practitioner&practitionerId=${
            value?.id
          }&titleMessage=${value?.name}`}
        >
          <RemoveButton area-label="practitioner-remove-btn">
            <TrashIcon />
          </RemoveButton>
        </Link>
      </Tooltip>
    ),
  },
];

const PractitionerList: FC<PractitionerListProps> = props => {
  const { practitioners } = props;
  const router = useRouter();

  const onRowClick = useCallback(
    (id = '', organisationId = '') => {
      router.push(PAGE_URLS.ORGANISATION_PRACTITIONER_DETAILS(organisationId, id));
    },
    [router],
  );

  return (
    <Box sx={{ p: 1 }}>
      <Box sx={{ pb: 4 }} data-cy="practicioner-search-box">
        <AvixoSearchBar placeholder="Search practitioner" defaultValue="" />
      </Box>
      <Box sx={{ mx: -4 }} data-cy="practitioner-table">
        <AvixoTable
          data-cy="list-of-practitioner"
          columns={getTableColumns(onRowClick)}
          data={{ records: practitioners }}
          primaryKey="id"
          hasSelectedFn
          emptyText="No practitioner have been created."
          mode="offline"
          pagination={{
            pageSize: 10,
            pageSizeOptions: [10, 20, 50],
            onPageChange: (page: number) => {
              console.log(page);
            },
            onPageSizeChange: (pageSize: number) => {
              console.log(pageSize);
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default PractitionerList;
