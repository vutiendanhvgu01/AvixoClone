import { Card, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import EllipsisIcon from '../AvixoIcons/ellipsis-icon';
import { AvixoCardNoResultProps, AvixoCardProps } from './avixo-card-types';

const StyledCard = styled(Card)<{ fullHeight?: boolean; background?: string; bordered?: boolean }>(
  ({ fullHeight, background, bordered, theme }) => ({
    borderRadius: '16px',
    padding: '24px',
    width: '100%',
    minHeight: 360,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    marginBottom: 0,
    height: fullHeight ? '100%' : 'auto',
    background: background || 'white',
    border: bordered ? `1px solid ${theme.palette.divider}` : 'none',
  }),
);

const CardHeading = styled(Box)<{ withCardHeadingBorder?: boolean; size?: 'sm' | 'md' }>(
  ({ withCardHeadingBorder, size, theme }) => ({
    display: 'flex',
    alignItems: 'center',
    margin: '0 -24px',
    padding: size === 'sm' ? '0 24px 16px 24px' : '0 24px 24px 24px',
    borderBottom: withCardHeadingBorder ? `1px solid ${theme.palette.divider}` : 'unset',
  }),
);

const HeaderCardAction = styled(Box)(() => ({
  cursor: 'pointer',
  marginLeft: 'auto',
  whiteSpace: 'nowrap',
}));

const FooterCardAction = styled(Box)(() => ({
  cursor: 'pointer',
  margin: 'auto',
  whiteSpace: 'nowrap',
}));

const CardBody = styled(Box)(() => ({
  flex: 1,
}));

const CardIcon = styled(Box)(({ theme }) => ({
  marginRight: 8,
  width: 32,
  height: 32,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 6,
  '> svg ': {
    color: theme.palette.primary.light,
  },
}));

const CardNoResult = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  height: 'calc(100% - 56px)', // Default Height of Card Header
  'span, a': {
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '24px',
    color: theme.palette.chart?.blue5,
    cursor: 'pointer',
  },
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  width: 38,
  height: 34,
  borderRadius: 10,
  border: `1px solid ${theme.palette.divider}`,
}));

export const AvixoCardActionButton = () => (
  <ActionButton>
    <EllipsisIcon />
  </ActionButton>
);

const AvixoCard: React.FC<AvixoCardProps> = ({
  children,
  title = 'Avixo Card Title',
  customTitle,
  titleVariant = 'subtitle1',
  icon,
  action,
  bg,
  headerComponent,
  fullHeight,
  withCardHeadingBorder,
  sx,
  bordered,
  onClick,
  footerAction,
}) => (
  <StyledCard fullHeight={fullHeight} bordered={bordered} background={bg} sx={sx} data-cy={title}>
    {headerComponent || (
      <CardHeading withCardHeadingBorder={withCardHeadingBorder} size={titleVariant === 'overline' ? 'sm' : 'md'}>
        {icon && <CardIcon>{icon}</CardIcon>}
        {!customTitle ? (
          <Typography variant={titleVariant} sx={{ paddingRight: 4 }}>
            {title}
          </Typography>
        ) : (
          customTitle
        )}
        {action && <HeaderCardAction>{action}</HeaderCardAction>}
      </CardHeading>
    )}
    <CardBody onClick={() => onClick && onClick()}>{children}</CardBody>
    {footerAction && <FooterCardAction>{footerAction}</FooterCardAction>}
  </StyledCard>
);

export const AvixoCardNoResult: React.FC<AvixoCardNoResultProps> = ({ title, message }) => (
  <CardNoResult>
    <Typography variant="subtitle2">{title}</Typography>
    <Typography variant="subtitle2">{message}</Typography>
  </CardNoResult>
);

export default AvixoCard;
