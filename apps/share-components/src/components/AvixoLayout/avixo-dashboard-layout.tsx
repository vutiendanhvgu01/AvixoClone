import { FC, useState, useEffect, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Theme } from '@mui/system';
import { useMediaQuery } from '@mui/material';
import Image from 'next/image';

import AvixoNavbar from '../AvixoNavbar/avixo-navbar';
import AvixoSideBar from '../AvixoSideBar/avixo-sidebar';
import Layout from './avixo-layout';

import { AvixoOrganisationProps } from '../AvixoSideBar/avixo-sidebar-types';
import { AvixoDashboardLayoutProps } from './avixo-dashboard-layout-type';

import SidebarCaret from '../../../assets/logo/caret-sidebar.svg';

const subBackgroundColor = '#F3F3F3';
const FIX_BACKGROUND_HEIGHT = 320;

const Content = styled(Box)<{ withTopbar?: boolean; isSidebarCollapsed?: boolean }>(
  ({ theme, withTopbar, isSidebarCollapsed }) => ({
    padding: withTopbar ? '208px 24px 32px' : '128px 24px 32px',
    position: 'relative',
    minHeight: 'calc(100vh - 160px)',
    flexGrow: 1,
    [theme.breakpoints.up('lg')]: {
      padding: withTopbar ? '208px 32px 32px 344px' : '128px 32px 32px 344px',
      paddingLeft: isSidebarCollapsed ? '148px' : '344px',
    },
  }),
);
const SubBackground = styled(Box)(() => ({
  position: 'fixed',
  background: subBackgroundColor,
  width: '100%',
  bottom: 0,
  left: 0,
}));

const AvixoDashboardLayout: FC<AvixoDashboardLayoutProps> = ({
  children,
  breadcrumbs,
  extraMainHeight,
  withTopbar,
  sidebarSection,
  organisations,
  account = {
    name: '',
    photo: '',
  },
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [selectedOrganisation, setSelectedOrganisation] = useState<AvixoOrganisationProps | null>(null);
  const [isCaretVisible, setIsCaretVisible] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(!isSidebarOpen);
  }, [isSidebarOpen]);

  const toggleCaret = useCallback(() => setIsCaretVisible(prev => !prev), []);

  const collapseSidebar = useCallback(() => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  }, [isSidebarCollapsed]);

  const onOrganisationChange = useCallback((org: AvixoOrganisationProps) => {
    setSelectedOrganisation(org);
  }, []);

  useEffect(() => {
    if (organisations && organisations.length > 0) {
      setSelectedOrganisation(organisations[0]);
    }
  }, [organisations]);

  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'), {
    noSsr: true,
  });

  // Reset sidebar collapsed state when screen size changes

  useEffect(() => {
    if (!lgUp) {
      setIsSidebarCollapsed(false);
    }
  }, [lgUp]);

  return (
    <Layout>
      {lgUp && (
        <Box
          sx={{
            position: 'fixed',
            left: isSidebarCollapsed ? '100px' : '296px',
            transform: isSidebarCollapsed ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
            top: '65px',
            zIndex: 9999,
            cursor: 'pointer',
            opacity: isCaretVisible ? 1 : 0,
          }}
          onClick={() => {
            collapseSidebar();
          }}
          onMouseOver={toggleCaret}
          onMouseOut={toggleCaret}
        >
          <Image alt="sidebarcaret" src={SidebarCaret} />
        </Box>
      )}
      <SubBackground
        sx={{
          height: `calc(100% - ${FIX_BACKGROUND_HEIGHT + (extraMainHeight || 0)}px)`,
        }}
      />
      <Box onMouseOver={toggleCaret} onMouseOut={toggleCaret}>
        <AvixoSideBar
          withTopbar={withTopbar}
          onClose={toggleSidebar}
          isCollapsed={isSidebarCollapsed}
          onChildrenClick={collapseSidebar}
          onChange={onOrganisationChange}
          open={isSidebarOpen}
          sections={sidebarSection}
          userName={selectedOrganisation?.name}
          userTier="Standard"
          organisations={organisations}
        />
      </Box>
      <AvixoNavbar withTopbar={withTopbar} onOpenSidebar={toggleSidebar} breadcrumbs={breadcrumbs} account={account} />
      <Content withTopbar={withTopbar} isSidebarCollapsed={isSidebarCollapsed}>
        {children}
      </Content>
    </Layout>
  );
};

export default AvixoDashboardLayout;
