import { Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomTooltip = styled(({ className, ...props }: TooltipProps) =>
  props.title !== '' ? <Tooltip {...props} arrow={false} classes={{ popper: className }} /> : props.children,
)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    borderRadius: 4,
  },
}));

export default CustomTooltip;
