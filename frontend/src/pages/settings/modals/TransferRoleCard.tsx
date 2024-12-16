import React from "react";
import { Box, Stack, Button, Typography } from "@mui/material";
import { useAppContext } from "../../../AppContext";

const TransferRoleCard = () => {
  const { profileData } = useAppContext();
  return (
  <>
  {profileData.role !== "Staff" && (
    <Box>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="h6" fontWeight={"bold"}>
            Transfer Admin Role
          </Typography>
          <Typography variant="body2">
            Transfer admin responsibilities to another user. Once assigned, the
            new admin will have full control, and you will no longer have admin
            access unless reassigned.
          </Typography>
        </Stack>
        <Stack direction={"row"}>
          <Button
            variant="contained"
            disableElevation
            sx={{
              color: "white",
              borderColor: "#2E49D5",
              borderRadius: "0.5rem",
              height: "2rem",
              width: "full",
              marginBottom: "0.5rem",
              fontSize: "0.7rem",
              textTransform: "none",
            }}
          >
            Transfer Role Admin
          </Button>
          <Box flexGrow={1}></Box>
        </Stack>
      </Stack>
    </Box>
    )}
    </>
  );
};

export default TransferRoleCard;
