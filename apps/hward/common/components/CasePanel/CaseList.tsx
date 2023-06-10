import { Divider, Stack, Typography } from '@mui/material';
import { PatientCasesResponse } from 'modules/cases/api/case-type';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PatientStatus from 'share-components/src/components/PatientStatus/patient-status';
import { formatDate } from 'share-components/src/utils/formatUtils';

interface CaseListProps {
  cases: PatientCasesResponse[];
}

const CaseList: React.FC<CaseListProps> = ({ cases }) => {
  const router = useRouter();

  if (!cases.length) return null;

  return (
    <Stack gap={2}>
      {cases?.map(c => {
        const { ref, id, status, createdAt, dischargedAt } = c;
        if (!ref) return null;
        return (
          <Link href={`/cases/${ref}?prev=${router.asPath}`} key={id} passHref>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ marginBottom: 1 }}>
              <Typography variant="h6">C-{id}</Typography>
              <PatientStatus label={status} size="small" />
            </Stack>
            <Stack direction="row" gap={1}>
              <Typography variant="subtitle2" color="neutral.500" width={dischargedAt ? 74 : undefined}>
                Created
              </Typography>
              <Typography variant="subtitle2" color="neutral.500">
                {formatDate(createdAt, 'dd/MM/yyyy - hh:mm')}
              </Typography>
            </Stack>
            {!!dischargedAt && (
              <Stack direction="row" gap={1}>
                <Typography variant="subtitle2" color="neutral.500" width={74}>
                  Discharged
                </Typography>
                <Typography variant="subtitle2" color="neutral.500">
                  {formatDate(dischargedAt, 'dd/MM/yyyy - hh:mm')}
                </Typography>
              </Stack>
            )}
            {cases.length !== 1 && <Divider sx={{ paddingTop: 2 }} />}
          </Link>
        );
      })}
    </Stack>
  );
};

export default CaseList;
