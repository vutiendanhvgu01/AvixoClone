import * as React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button, Box } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { LeftArrowIcon } from 'share-components';
import { AvixoBreadcrumbsProps } from './breadcrumbs-types';

const AvixoBreadcrumbs = ({ breadcrumbs = [], ...props }: AvixoBreadcrumbsProps) => {
  const router = useRouter();

  const navigateBackInBreadcrumbs = () => {
    if (breadcrumbs.length > 1) {
      // At least two paths in the breadcrumb
      const previousBreadcrumb = breadcrumbs[breadcrumbs.length - 2]; // Get the penultimate breadcrumb
      router.push(previousBreadcrumb.url); // Navigate to the penultimate breadcrumb
    }
  };

  return (
    <Box display="flex" alignItems="center">
      {breadcrumbs.length > 0 && (
        <Button onClick={navigateBackInBreadcrumbs} color="whiteLight" startIcon={<LeftArrowIcon />}>
          Back
        </Button>
      )}
      <Breadcrumbs
        sx={{
          display: {
            sm: 'none',
            md: 'block',
            ml: 18,
          },
          ml: 4,
        }}
        aria-label="breadcrumb"
        {...props}
      >
        {breadcrumbs.map((it, index) => {
          const isLastItem = index === breadcrumbs.length - 1;

          return isLastItem ? (
            <Typography key={it.url} color="white" fontSize="14px">
              {it.label}
            </Typography>
          ) : (
            <Link key={it.url} href={it.url}>
              {it.label}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default AvixoBreadcrumbs;
