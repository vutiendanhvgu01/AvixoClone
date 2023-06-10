import React from 'react';
import CaseCard from 'share-components/src/components/CaseCard/case-card';
import { PAGE_URLS } from 'share-components/src/constants';
import { Box, Divider, Skeleton } from '@mui/material';
import Link from 'next/link';
import { DataProps } from './cases-types';
import EmptyComponent from './empty-component';

const CasesLoading = () => (
  <>
    {[...Array(3)].map(() => (
      <>
        <Box sx={{ mx: 3, my: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItem: 'center', justifyContent: 'space-between' }}>
            <Skeleton variant="rectangular" width={100} height={22} />
            <Skeleton variant="rectangular" width={60} height={22} />
          </Box>
          <Skeleton variant="rectangular" width={180} height={20} sx={{ mt: 1 }} />
          <Skeleton variant="rectangular" width={200} height={20} sx={{ mt: 2 }} />
        </Box>
        <Divider />
      </>
    ))}
  </>
);

const CasesCards = ({ data, loading = false }: DataProps) => {
  if (loading) return <CasesLoading />;
  if (!data.length) return <EmptyComponent />;

  return (
    <Box mb={4}>
      {data.map(item => (
        <Link href={PAGE_URLS.HWARD_CASE_DETAILS(item?.ref)} passHref key={item.uuid}>
          <CaseCard case={item} />
        </Link>
      ))}
    </Box>
  );
};

export default CasesCards;
