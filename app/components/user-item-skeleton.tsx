import { Box, Skeleton } from "@mui/material";

export const USER_ITEM_SKELETONS_COUNT = 4;

export const UserItemSkeleton = () => (
  <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
    <Skeleton variant="circular" width={32} height={32} animation="wave" />
    <Box sx={{ ml: 2 }}>
      <Skeleton variant="text" width={120} animation="wave" />
    </Box>
  </Box>
);
