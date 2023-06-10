import { Box, Button, MenuItem, Popper } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { DotsIcon } from 'share-components';
import { PAGE_URLS } from 'share-components/src/constants';

const MenuDotsButton = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'navigation-popper' : undefined;

  const menu = [
    { name: 'Appointments', link: PAGE_URLS.HWARD_APPOINTMENTS() },
    { name: 'Patients', link: PAGE_URLS.HWARD_PATIENT_LIST() },
  ];
  return (
    <>
      <Button variant="hward-outlined" sx={{ padding: 0, margin: 0 }} onClick={handleClick} id="dot-menu">
        <DotsIcon />
      </Button>

      <Popper open={open} placement="top-start" id={id} anchorEl={anchorEl} disablePortal>
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: '10px',
            border: '1px #D1D5DB solid',
            marginBottom: 2,
            position: 'relative',
            zIndex: 3002,
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          {menu.map(item => (
            <MenuItem key={item.name}>
              <Link href={item.link} passHref>
                {item.name}
              </Link>
            </MenuItem>
          ))}
        </Box>
      </Popper>
    </>
  );
};

export default MenuDotsButton;
