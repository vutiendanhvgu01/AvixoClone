import React from 'react';
import { Divider, Grid, useTheme } from '@mui/material';
import { AvixoCard, AvixoCardProps } from 'share-components';

const NUMBER_GRID_COLUMNS = 12;

interface MedicalSectionCardPropsType {
  children?: React.ReactNode;
  content?: {
    components: React.ReactNode[];
    columns?: number;
  };
  footer?: {
    components: React.ReactNode[];
    columns?: number;
  };
  withBackground?: boolean;
  avixoProps?: Partial<AvixoCardProps>;
  withFooterDivider?: boolean;
}

const MedicalSectionCard: React.FC<MedicalSectionCardPropsType> = ({
  children,
  content,
  footer,
  withBackground = true,
  withFooterDivider = true,
}) => {
  const theme = useTheme();
  const contentComponents = content?.components;
  const contentColumns = content?.columns || 4;
  const footerComponents = footer?.components;
  const footerColumns = footer?.columns || 4;

  const generateGridWithColumns = (components: React.ReactNode[] | undefined, numberColumns: number) => (
    <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {components?.map((child, index) => {
        const key = index;
        return (
          <Grid
            key={key}
            item
            xs={NUMBER_GRID_COLUMNS / numberColumns}
            md={NUMBER_GRID_COLUMNS / numberColumns}
            xl={NUMBER_GRID_COLUMNS / numberColumns}
          >
            {child}
          </Grid>
        );
      })}
    </Grid>
  );

  const cardProps = withBackground
    ? {
        bg: theme.palette.card?.main,
        sx: {
          padding: '32px',
          minHeight: 'auto',
          border: `1px solid ${theme.palette.divider}`,
        },
      }
    : {
        sx: {
          padding: '0',
          minHeight: 'auto',
          '.MuiFormControl-fullWidth.MuiFormControl-fullWidth': {
            mb: '8px',
          },
        },
      };

  return (
    <AvixoCard headerComponent={<div />} {...cardProps}>
      {children || (
        <>
          {content && generateGridWithColumns(contentComponents, contentColumns)}
          {footer && (
            <>
              {withFooterDivider && (
                <Divider
                  sx={{
                    margin: '32px 0',
                  }}
                />
              )}
              {generateGridWithColumns(footerComponents, footerColumns)}
            </>
          )}
        </>
      )}
    </AvixoCard>
  );
};

export default MedicalSectionCard;
