import { useContext } from 'react';
import {
  InboxOutlined,
  MailOutlineOutlined,
} from '@mui/icons-material';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

import { UIContext } from '../../context/ui';

const menuItems: string[] = [
  'Inbox',
  'Starred',
  'Send email',
  'Drafts',
];

export const Sidebar = () => {
  const { sideMenuOpen, closeSideMenu } = useContext(UIContext);

  return (
    <Drawer anchor='left' open={sideMenuOpen} onClose={closeSideMenu}>
      <Box sx={{ width: '250px' }}>
        <Box sx={{ padding: '5px 10px' }}>
          <Typography variant='h4' color='primary'>
            Menu
          </Typography>
        </Box>
        <List>
          {menuItems.map((text, index) => (
            <ListItem key={text} button>
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <InboxOutlined />
                ) : (
                  <MailOutlineOutlined />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />

        <List>
          {menuItems.map((text, index) => (
            <ListItem key={text} button>
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <InboxOutlined />
                ) : (
                  <MailOutlineOutlined />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
