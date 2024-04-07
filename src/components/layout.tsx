import Add from "@mui/icons-material/Add";
import "@mui/lab/themeAugmentation";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import type { User } from "../api/data";
import { UserList } from "./user-list";

const drawerWidth = 240;

type LayoutProps = {
  isLoading: boolean;
  users?: Promise<User[]>;
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
