import { Grid, GridProps, Typography } from '@mui/material';

interface MedicalSectionCardItemPropsType extends Partial<GridProps> {
  title?: string;
  content?: string | React.ReactNode;
}

const MedicalSectionCardItem: React.FC<MedicalSectionCardItemPropsType> = props => {
  const { title = '', content = '-', ...gridProps } = props;
  return (
    <Grid item {...gridProps}>
      <Typography
        variant="caption"
        display="block"
        sx={{ marginBottom: typeof content === 'string' ? 0.5 : 2.5, textTransform: 'upperCase' }}
      >
        {title}
      </Typography>
      {typeof content === 'string' ? <Typography variant="subtitle2">{content}</Typography> : content}
    </Grid>
  );
};

export default MedicalSectionCardItem;
