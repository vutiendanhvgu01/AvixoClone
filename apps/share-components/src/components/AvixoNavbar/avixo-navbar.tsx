import { Toolbar, AppBar, Box, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '../AvixoIcons/menu-icon';
import AccountButton from './AccountButton/account-button';
import { AvixoNavbarProps } from './avixo-navbar-type';
import AvixoBreadcrumbs from './Breadcrumbs/breadcrumbs';

const NavbarRoot = styled(AppBar)(() => ({
  backgroundColor: 'transparent',
  boxShadow: 'none',
}));

const ToolbarActions = styled(Box)(() => ({
  display: 'flex',
}));

const StyledToolbar = styled(Toolbar)(() => ({
  left: 0,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const AvixoNavbar = ({ breadcrumbs, onOpenSidebar, withTopbar, account, ...props }: AvixoNavbarProps) => (
  <NavbarRoot
    sx={{
      top: withTopbar ? 112 : 32,
      left: {
        xs: 24,
        lg: 344,
      },
      width: {
        xs: 'calc(100% - 48px)',
        lg: 'calc(100% - 376px)',
      },
    }}
    {...props}
  >
    <StyledToolbar disableGutters>
      <IconButton
        color="inherit"
        onClick={onOpenSidebar}
        sx={{
          display: {
            lg: 'none',
          },
        }}
      >
        <MenuIcon fontSize="small" />
      </IconButton>
      <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
        <AvixoBreadcrumbs breadcrumbs={breadcrumbs} />
      </Box>
      <ToolbarActions>
        <AccountButton account={account} />
      </ToolbarActions>
    </StyledToolbar>
  </NavbarRoot>
);

AvixoNavbar.defaultProps = {
  breadcrumbs: [],
};

export default AvixoNavbar;
