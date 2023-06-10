import * as React from 'react';
import { ListItem, Stack, Typography, Divider, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DataSectionProps, ListItemProps } from './details-list-types';

const Item = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: '500',
}));

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: '600',
  minWidth: 100,
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: '600',
  fontSize: '0.7rem',
}));

const DetailStack = styled(Stack)(({ theme }) => ({
  borderLeft: 1,
  borderColor: 'transparent',
  borderLeftColor: theme.palette.divider,
  borderStyle: 'solid',
  marginLeft: -20,
  paddingLeft: 20,
}));

const DataSection: React.FC<DataSectionProps> = ({ data }) => (
  <>
    <Box sx={{ py: 2, px: 2 }}>
      <ListItem component="div" disablePadding>
        <Stack direction="row" spacing={3} key={data.name}>
          <Title>{data.name}</Title>
          {Array.isArray(data.detail) ? (
            <Box>
              <DetailStack spacing={2}>
                {data.detail.map((item: ListItemProps) => (
                  <Stack spacing={1} key={item.name}>
                    <SubTitle>{item.name}</SubTitle>
                    <Item>{item.detail}</Item>
                  </Stack>
                ))}
              </DetailStack>
            </Box>
          ) : (
            <Item>{data.detail}</Item>
          )}
        </Stack>
      </ListItem>
    </Box>
    <Divider />
  </>
);

export default DataSection;
