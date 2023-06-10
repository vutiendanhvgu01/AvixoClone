import React, { FC } from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import { Allergy } from './allergy-types';

interface AllergyItemProps {
  allergy: Allergy;
  showBorderBottom: boolean;
}

const AllergyHeader = styled(Typography)({
  fontSize: 12,
  fontWeight: 600,
  color: '#D14343',
  textTransform: 'uppercase',
  lineHeight: '30px',
});

const AllergyContent = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  fontWeight: 500,
  color: theme.palette.primary.main,
  lineHeight: '28px',
  marginBottom: 8,
}));

const AllergyFooter = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  fontWeight: 400,
  color: theme.palette.black.main,
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  marginTop: 24,
  marginBottom: 24,
  borderColor: theme.palette.divider,
}));

const AllergyItem: FC<AllergyItemProps> = ({ allergy, showBorderBottom }) => (
  <>
    <AllergyHeader>
      {allergy.subType} {allergy.type}
    </AllergyHeader>
    <AllergyContent>{allergy.name}</AllergyContent>
    <AllergyFooter>
      {allergy.substanceCode} {allergy.adrBrand} Reported by {allergy.createdBy}
    </AllergyFooter>
    {showBorderBottom && <StyledDivider />}
  </>
);

export default AllergyItem;
