import { Add } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import type { SerializeFrom } from "@remix-run/node";
import { Link } from "@remix-run/react";
import type { User } from "../api/data.server";
import { UserList } from "./user-list";

const drawerWidth = 240;

type LayoutProps = {
  isLoading: boolean;
  users: Promise<SerializeFrom<User[]> | undefined>;
  children: React.ReactNode;
  selectedUserId?: string | null;
};

export const Layout = ({
  children,
  selectedUserId,
  isLoading,
  users,
}: LayoutProps) => (
  <Box sx={{ display: "flex", height: "100vh" }}>
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          My App
        </Typography>
      </Toolbar>
    </AppBar>
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <UserList
          users={users}
          isLoading={isLoading}
          selectedUserId={selectedUserId}
        />
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton to="/" component={Link} selected={!selectedUserId}>
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              <ListItemText primary={"Add"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        bgcolor: "#ededed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Toolbar />
      {children}
    </Box>
  </Box>
);
