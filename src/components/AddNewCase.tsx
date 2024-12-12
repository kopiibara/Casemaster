import React from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CaseNoIcon from "@mui/icons-material/DescriptionOutlined";
import TitleIcon from "@mui/icons-material/TitleOutlined";
import PartyFilerIcon from "@mui/icons-material/PersonOutline";
import DocumentTypeIcon from "@mui/icons-material/CalendarTodayOutlined";
import AttachmentIcon from "@mui/icons-material/AttachFileOutlined";
import TagIcon from "@mui/icons-material/LabelOutlined";
import StatusIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

const AddNewCase = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          width: "500px", // Custom width for smaller modal
          maxWidth: "none", // Remove maxWidth restriction
        },
      }}
    >
      <DialogTitle>
        <Stack direction="row" alignItems="center">
          <Typography variant="h5" color="#0F2043">
            Add New Case
          </Typography>
          <Box flexGrow={1}></Box>
          <IconButton onClick={onClose}>
            <CloseIcon sx={{ color: "#0F2043" }} />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ paddingTop: "10px" }}> {/* Added padding-top to give space between title and inputs */}
        <Stack spacing={3}>
          {/* Form Content */}
          <Box display="flex" alignItems="center" gap={2}>
            <CaseNoIcon sx={{ color: "#8992A3" }} />
            <Typography sx={{ width: "80px", color: "#8992A3" }}>Case No.</Typography>
            <input
              type="text"
              className="p-1 w-full max-w-[16rem] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-[#B1B8C7] focus:border-[#B1B8C7]"
              placeholder="Empty"
              style={{ borderColor: "#D3D3D3" }} // Light gray border
            />
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <TitleIcon sx={{ color: "#8992A3" }} />
            <Typography sx={{ width: "80px", color: "#8992A3" }}>Title</Typography>
            <input
              type="text"
              className="p-1 w-full max-w-[16rem] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-[#B1B8C7] focus:border-[#B1B8C7]"
              placeholder="Empty"
              style={{ borderColor: "#D3D3D3" }} // Light gray border
            />
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <PartyFilerIcon sx={{ color: "#8992A3" }} />
            <Typography sx={{ width: "80px", color: "#8992A3" }}>Party Filer</Typography>
            <input
              type="text"
              className="p-1 w-full max-w-[16rem] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-[#B1B8C7] focus:border-[#B1B8C7]"
              placeholder="Empty"
              style={{ borderColor: "#D3D3D3" }} // Light gray border
            />
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <DocumentTypeIcon sx={{ color: "#8992A3" }} />
            <Typography sx={{ width: "80px", color: "#8992A3" }}>Document Type</Typography>
            <input
              type="text"
              className="p-1 w-full max-w-[16rem] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-[#B1B8C7] focus:border-[#B1B8C7]"
              placeholder="Empty"
              style={{ borderColor: "#D3D3D3" }} // Light gray border
            />
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <AttachmentIcon sx={{ color: "#8992A3" }} />
            <Typography sx={{ width: "80px", color: "#8992A3" }}>Attachment</Typography>
            <input
              type="text"
              className="p-1 w-full max-w-[16rem] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-[#B1B8C7] focus:border-[#B1B8C7]"
              placeholder="Empty"
              style={{ borderColor: "#D3D3D3" }} // Light gray border
            />
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <TagIcon sx={{ color: "#8992A3" }} />
            <Typography sx={{ width: "80px", color: "#8992A3" }}>Tag</Typography>
            <input
              type="text"
              className="p-1 w-full max-w-[16rem] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-[#B1B8C7] focus:border-[#B1B8C7]"
              placeholder="Empty"
              style={{ borderColor: "#D3D3D3" }} // Light gray border
            />
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <StatusIcon sx={{ color: "#8992A3" }} />
            <Typography sx={{ width: "80px", color: "#8992A3" }}>Status</Typography>
            <input
              type="text"
              className="p-1 w-full max-w-[16rem] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-[#B1B8C7] focus:border-[#B1B8C7]"
              placeholder="Empty"
              style={{ borderColor: "#D3D3D3" }} // Light gray border
            />
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="primary" onClick={onClose}>
          Discard
        </Button>
        <Button variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewCase;
