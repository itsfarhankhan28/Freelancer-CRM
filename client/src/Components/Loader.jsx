import React from "react";
import { Card, CardContent, Skeleton, Box, Button } from "@mui/material";

const ClientProfileSkeleton = () => {
  return (
    <Card sx={{ maxWidth: 400, p: 2, borderRadius: 3, boxShadow: 3 }}>
      <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        {/* Profile Picture */}
        <Skeleton variant="circular" width={80} height={80} />

        {/* Name */}
        <Skeleton variant="text" width="60%" height={30} />

        {/* Email */}
        <Skeleton variant="text" width="80%" height={20} />

        {/* Button */}
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 2 }}>
          <Skeleton variant="rectangular" width={120} height={40} sx={{ borderRadius: 2 }} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ClientProfileSkeleton;
