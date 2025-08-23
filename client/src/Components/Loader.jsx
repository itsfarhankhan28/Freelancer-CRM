import React from "react";
import { Card, CardContent, Skeleton, Box, Typography } from "@mui/material";

const Loader = () => {
  return (
    <Card
      sx={{
        maxWidth: 600,
        margin: "auto",
        mt: 5,
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <CardContent>
        {/* Profile Section */}
        <Box display="flex" alignItems="center" mb={2}>
          <Skeleton variant="circular" width={60} height={60} />
          <Box ml={2} flex={1}>
            <Skeleton variant="text" width="50%" height={30} />
            <Skeleton variant="text" width="30%" height={20} />
          </Box>
        </Box>

        {/* Client Info */}
        <Box mb={2}>
          <Skeleton variant="text" width="80%" height={20} />
          <Skeleton variant="text" width="60%" height={20} />
          <Skeleton variant="text" width="40%" height={20} />
        </Box>

        {/* Project Section Title */}
        <Typography variant="h6" mb={1}>
          <Skeleton width="40%" />
        </Typography>

        {/* Scrollable Projects Section */}
        <Box
          sx={{
            maxHeight: 150,
            overflowY: "auto",
            border: "1px solid #ddd",
            borderRadius: 2,
            p: 1,
          }}
        >
          {[...Array(4)].map((_, index) => (
            <Box key={index} mb={1}>
              <Skeleton variant="rectangular" width="100%" height={40} />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default Loader;
