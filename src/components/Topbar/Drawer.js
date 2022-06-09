/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import {
  Avatar,
  Box,
  Button,
  Drawer as MUIdrawer,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import {
  StorefrontTwoTone,
  ReceiptOutlined,
  FavoriteBorder,
  SettingsOutlined,
  StarBorder,
  Logout,
} from '@mui/icons-material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeAuthIdentity } from '../../redux/sliceAuth';
import DialogCreateToko from '../DialogCreateToko';

function TabHeadToko() {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <StorefrontTwoTone />
      <Typography maxWidth={100} fontSize={12} fontWeight={800} display="block" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
        Toko Saya
      </Typography>
    </Box>
  );
}

function TabHeadUser() {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Avatar src="https://source.unsplash.com/random" alt="user" sx={{ width: 30, height: 30 }} />
      <Typography maxWidth={100} fontSize={12} fontWeight={800} display="block" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
        Rizki Setyawan
      </Typography>
    </Box>
  );
}

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function BasicTabs({ onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const [openDialogToko, setOpenDialogToko] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpenDialogToko = () => {
    setOpenDialogToko(true);
  };

  const handleCloseDialogToko = () => {
    setOpenDialogToko(false);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label={<TabHeadUser />} {...a11yProps(0)} />
          <Tab label={<TabHeadToko />} {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Typography fontSize={15} fontWeight={800} m={2}>Aktifitas Saya</Typography>
        {[
          {
            title: 'Pembelian',
            icon: <ReceiptOutlined sx={({ palette }) => ({ color: palette.text.secondary })} />,
            handleClick: (e) => {
              onClose(e);
              navigate('/order');
            },
          },
          {
            title: 'Wishlist',
            icon: <FavoriteBorder sx={({ palette }) => ({ color: palette.text.secondary })} />,
            handleClick: (e) => {
              onClose(e);
              navigate('/wishlist');
            },
          },
          {
            title: 'Ulasan',
            icon: <StarBorder sx={({ palette }) => ({ color: palette.text.secondary })} />,
            handleClick: (e) => {
              onClose(e);
              navigate('/reviews');
            },
          },
          {
            title: 'Pengaturan',
            icon: <SettingsOutlined sx={({ palette }) => ({ color: palette.text.secondary })} />,
            handleClick: (e) => {
              onClose(e);
              navigate('/settings');
            },
          },
          {
            title: 'Logout',
            icon: <Logout sx={({ palette }) => ({ color: palette.text.secondary })} />,
            handleClick: () => {
              dispatch(removeAuthIdentity());
              navigate('login');
            },
          },
        ].map(({ title, icon, handleClick }) => (
          <React.Fragment key="title">
            <Box display="flex" alignItems="center" gap={1} sx={{ cursor: 'pointer', m: 2 }} onClick={handleClick}>
              {icon}
              <Typography fontSize={14} color="text.secondary">{title}</Typography>
            </Box>
          </React.Fragment>
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box m={2} mt="30%">
          <Typography fontSize={14} color="text.secondary" mb={2} textAlign="center">Anda belum memiliki Toko</Typography>
          <Button variant="contained" fullWidth sx={{ fontSize: 12, fontWeight: 800 }} onClick={handleOpenDialogToko}>Buka Toko Gratis</Button>
        </Box>
        <DialogCreateToko open={openDialogToko} onClose={handleCloseDialogToko} />
      </TabPanel>
    </Box>
  );
}

function Drawer({ open, onClose }) {
  return (
    <MUIdrawer
      anchor="right"
      open={open}
      onClose={onClose}
    >
      <Box minWidth={250} pt={2} px={1}>
        <BasicTabs onClose={onClose} />
      </Box>
    </MUIdrawer>
  );
}

export default Drawer;
