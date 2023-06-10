import { FC, useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Box, Typography, Drawer, useMediaQuery, DrawerProps } from '@mui/material';
import type { Theme } from '@mui/material';
import SelectorIcon from '../AvixoIcons/selector-icon';
import Scrollbar from './Scrollbar/scrollbar';
import AvixoLogo from '../../../assets/logo/logo.svg';
import AvixoLogoOnly from '../../../assets/logo/logo-only.svg';
import OrganizationPopover from './OrganiztionPopover/organization-popover';
import SidebarSection from './SidebarSection/sidebar-section';
import { AvixoSideBarContentProps, AvixoSidebarProps } from './avixo-sidebar-types';

const initDrawerProps: DrawerProps = {
  anchor: 'left',
  sx: {
    overflowX: 'hidden',
    width: 312,
  },
  PaperProps: {
    sx: {
      height: 'auto',
      backgroundColor: 'primary.contrastText',
      boxShadow: 'none',
      color: 'neutral.900',
      width: 280,
      '&::-webkit-scrollbar': { display: 'none' },
      top: '32px',
      left: '32px',
      bottom: '32px',
      borderRadius: '16px',
    },
  },
};

const AvixoSidebarLogo = ({ isCollapsed }: { isCollapsed?: boolean }) => (
  <Box sx={{ my: 4, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Image alt="logo" src={isCollapsed ? AvixoLogoOnly : AvixoLogo} />
  </Box>
);

const AvixoSideBarContent: React.FC<AvixoSideBarContentProps> = ({
  sections = [],
  userName,
  userTier,
  organisations,
  onChange,
  isCollapsed,
  onChildrenClick,
}) => {
  const organizationsRef = useRef<HTMLButtonElement | null>(null);
  const [openOrganizationsPopover, setOpenOrganizationsPopover] = useState<boolean>(false);

  const handleOpenOrganizationsPopover = (): void => {
    setOpenOrganizationsPopover(true);
  };

  const handleCloseOrganizationsPopover = (): void => {
    setOpenOrganizationsPopover(false);
  };
  const handleClose = useCallback(handleCloseOrganizationsPopover, []);
  const hasManyOrganisations = useCallback(() => organisations && organisations.length > 1, [organisations]);

  return (
    <>
      <Scrollbar
        sx={{
          height: '100%',
          '& .simplebar-content': {
            height: '100%',
          },
          '& .simplebar-placeholder': {
            display: 'none',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <div>
            <AvixoSidebarLogo isCollapsed={isCollapsed} />
            <Box sx={{ px: 2 }}>
              <Box
                onClick={useCallback(handleOpenOrganizationsPopover, [])}
                ref={organizationsRef}
                sx={{
                  alignItems: 'center',
                  backgroundColor: 'neutral.100',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  px: 3,
                  mb: isCollapsed ? 5 : 2,
                  py: '11px',
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'primary.contrastText',
                  minHeight: '67px',
                  ':hover': !openOrganizationsPopover
                    ? {
                        borderColor: 'primary.states.hoverBackground',
                        backgroundColor: 'primary.states.hoverBackground',
                      }
                    : {},
                  ...(openOrganizationsPopover
                    ? {
                        borderColor: 'primary.main',
                        backgroundColor: 'primary.states.hoverBackground',
                      }
                    : {}),
                }}
              >
                <div>
                  {!isCollapsed && (
                    <>
                      <Typography color="inherit" variant="subtitle1">
                        {userName}
                      </Typography>
                      <Typography color="neutral.400" variant="body2">
                        Your tier : {userTier}
                      </Typography>
                    </>
                  )}
                </div>
                <SelectorIcon
                  sx={{
                    color: 'neutral.500',
                    width: 14,
                    height: 14,
                    ml: isCollapsed ? -0.7 : 0,
                  }}
                />
              </Box>
            </Box>
          </div>
          <Box
            sx={{
              flexGrow: 1,
              mt: isCollapsed ? 0 : 3,
              ml: isCollapsed ? -0.5 : 0,
            }}
          >
            {sections.map(section => (
              <SidebarSection
                key={section.title}
                sx={{
                  mt: 2,
                  '& + &': {
                    mt: 2,
                  },
                }}
                {...section}
                isCollapsed={isCollapsed}
                onChildrenClick={onChildrenClick}
              />
            ))}
          </Box>
        </Box>
      </Scrollbar>
      {hasManyOrganisations() && (
        <OrganizationPopover
          anchorEl={organizationsRef.current}
          onClose={handleClose}
          onChange={onChange}
          open={openOrganizationsPopover}
          organisations={organisations}
        />
      )}
    </>
  );
};

const AvixoSideBar: FC<AvixoSidebarProps> = props => {
  const { open, onClose, withTopbar, isCollapsed, onChildrenClick, ...rest } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'), {
    noSsr: true,
  });

  useEffect(() => {
    if (!router.isReady) return;

    if (open && onClose) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, router.asPath]);

  const sidebarWidth = isCollapsed ? 84 : 280;

  if (lgUp) {
    return (
      <Drawer
        {...initDrawerProps}
        sx={{ width: sidebarWidth }}
        PaperProps={{
          sx: { ...initDrawerProps.PaperProps?.sx, top: withTopbar ? 112 : 32, width: sidebarWidth },
        }}
        open
        variant="permanent"
      >
        <AvixoSideBarContent isCollapsed={isCollapsed} onChildrenClick={onChildrenClick} {...rest} />
      </Drawer>
    );
  }

  return (
    <Drawer
      {...initDrawerProps}
      PaperProps={{
        sx: { ...initDrawerProps.PaperProps?.sx, top: 32, left: 32, bottom: 32 },
      }}
      variant="temporary"
      open={open}
      onClose={onClose}
    >
      <AvixoSideBarContent isCollapsed={isCollapsed} onChildrenClick={onChildrenClick} {...rest} />
    </Drawer>
  );
};

export default AvixoSideBar;
