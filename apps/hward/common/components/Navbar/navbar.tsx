import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import React from 'react';
import useScroll from 'hward/common/hooks/useScroll';
import MenuIcon from 'share-components/src/components/AvixoIcons/menu-icon';
import AvixoBg2 from 'share-components/assets/background/rectangle-2.svg';
import NavbarDrawer from 'common/components/Navbar/navbar-drawer';
import { useRouter } from 'next/router';
import { getBreadcrumbsFromRouter } from 'share-components/src/utils/pageUtils';
import AvixoBreadcrumbs from 'share-components/src/components/AvixoNavbar/Breadcrumbs/breadcrumbs';
import useIsMobile from 'common/hooks/useIsMobile';
import { styled } from '@mui/system';
import { LeftArrowIcon } from 'share-components';
import Link from 'next/link';
import AccountButton from './AccountButton/account-button';

const CustomToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  paddingLeft: '32px !important',
  paddingRight: '32px !important',
  marginTop: '24px',
  [theme.breakpoints.down('md')]: {
    paddingLeft: '16px !important',
    paddingRight: '13px !important',
    marginTop: '0px',
  },
}));

const Navbar: React.FC = () => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const breadcrumbs = getBreadcrumbsFromRouter(router);
  // Get second last breadcrumb item
  const previousLink = breadcrumbs[breadcrumbs.length - 2];
  const scrollY = useScroll();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        aria-label="navbar"
        component="nav"
        style={{
          backgroundColor: 'transparent',
          backgroundImage:
            scrollY > 0
              ? `linear-gradient(294.83deg, #CC3399 -8.26%, #7337B3 59.68%, #44179B 98.44%), url(${AvixoBg2.src})`
              : '',
          backgroundSize: 'cover',
          backgroundBlendMode: 'lighten',
          backgroundAttachment: 'fixed',
          display: 'flex',
          height: isMobile ? 50 : 78,
        }}
      >
        <CustomToolbar
          sx={{
            justifyContent: !previousLink ? 'flex-end' : 'space-between',
          }}
        >
          {isMobile && previousLink ? (
            <Link href={previousLink.url} passHref>
              <IconButton sx={{ padding: 0, color: 'white' }}>
                <LeftArrowIcon />
              </IconButton>
            </Link>
          ) : (
            <AvixoBreadcrumbs breadcrumbs={breadcrumbs} />
          )}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' }, marginTop: 1, marginBottom: 1 }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              display: {
                xs: 'none',
                md: 'flex',
              },
            }}
          >
            <AccountButton aria-label="open popover" />
          </Box>
        </CustomToolbar>
      </AppBar>
      <NavbarDrawer mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
    </Box>
  );
};

export default Navbar;
