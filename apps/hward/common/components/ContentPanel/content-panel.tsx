import { Accordion, AccordionDetails, AccordionSummary, Box, SxProps, Theme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useIsMobile from 'common/hooks/useIsMobile';
import PanelHeader from '../PanelHeader';
import EmptyContent from '../EmptyContent/empty-content';

interface ContentPanelProps {
  title: string;
  children?: React.ReactElement;
  Icon: React.FC;
  Footer?: React.ReactElement;
  justifyContent?: 'space-between' | 'flex-start';
  className?: string;
  sx?: SxProps<Theme>;
}

const ContentPanel = ({
  title,
  children,
  Icon,
  Footer,
  justifyContent = 'space-between',
  className = '',
  sx,
}: ContentPanelProps) => {
  const isMobile = useIsMobile();

  const content = (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      justifyContent={justifyContent}
      className={className}
      padding={isMobile ? 0 : '0px 24px 24px 24px'}
      sx={sx}
    >
      {children || <EmptyContent />}
      {Footer || null}
    </Box>
  );
  return isMobile ? (
    <Accordion disableGutters defaultExpanded={isMobile}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ margin: 0, padding: 0 }}>
        <PanelHeader icon={<Icon />} title={title} />
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 0, marginTop: 2 }}>{content}</AccordionDetails>
    </Accordion>
  ) : (
    <Box display="flex" flexDirection="column" height="100%">
      <PanelHeader icon={<Icon />} title={title} />
      {content}
    </Box>
  );
};

export default ContentPanel;
