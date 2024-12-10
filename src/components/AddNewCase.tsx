import React from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Divider,
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

const AddNewCase = ({ onClose }: { onClose: () => void }) => {
  return (
    <Box>
      <Stack className="gap-4 p-6">
        {/* Header */}
        <Stack direction={"row"} className="flex items-center">
          <Typography variant="h5" className="text-[#0F2043]">
            Add New Case
          </Typography>
          <Box flexGrow={1}></Box>
          <IconButton onClick={onClose}>
            <CloseIcon className="text-[#0F2043]" />
          </IconButton>
        </Stack>
        <Divider className="mb-2 w-[calc(100%-0.8rem)]" />

        {/*Content*/}
        <Box>
          <Box>
            <Stack className="mt-2 gap-7">
              <Box className="gap-3 text-[#8992A3] flex items-center">
                <CaseNoIcon />
                <Typography className="w-20">Case No.</Typography>
                <input
                  type="text"
                  className="p-1 ml-auto w-full max-w-[16rem] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-[#B1B8C7] focus:border-[#B1B8C7]"
                  placeholder="Empty"
                />
              </Box>

              <Box className=" gap-3 text-[#8992A3] flex items-center">
                <TitleIcon />
                <Typography className="w-20">Title</Typography>
                <input
                  type="text"
                  className="p-1 ml-auto w-full max-w-[16rem] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-[#B1B8C7] focus:border-[#B1B8C7]"
                  placeholder="Empty"
                />
              </Box>

              <Box className=" gap-3 text-[#8992A3] flex items-center">
                <PartyFilerIcon />
                <Typography className="w-20">Party Filer</Typography>
                <input
                  type="text"
                  className="p-1 ml-auto w-full max-w-[16rem] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-[#B1B8C7] focus:border-[#B1B8C7]"
                  placeholder="Empty"
                />
              </Box>
              <Box className=" gap-3 text-[#8992A3] flex items-center w-full">
                <DocumentTypeIcon />
                <Typography className="w-20">Document Type</Typography>
                <input
                  type="text"
                  className="p-1 ml-auto w-full max-w-[16rem] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-[#B1B8C7] focus:border-[#B1B8C7]"
                  placeholder="Empty"
                />
              </Box>
              <Box className=" gap-3 text-[#8992A3] flex items-center w-full">
                <AttachmentIcon />
                <Typography className="w-20">Attachment</Typography>
                <input
                  type="text"
                  className="p-1 ml-auto w-full max-w-[16rem] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-[#B1B8C7] focus:border-[#B1B8C7]"
                  placeholder="Empty"
                />
              </Box>
              <Box className=" gap-3 text-[#8992A3] flex items-center w-full">
                <TagIcon />
                <Typography className="w-20">Tag</Typography>
                <input
                  type="text"
                  className="p-1 ml-auto w-full max-w-[16rem] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-[#B1B8C7] focus:border-[#B1B8C7]"
                  placeholder="Empty"
                />
              </Box>
              <Box className=" gap-3 text-[#8992A3] flex items-center w-full">
                <StatusIcon />
                <Typography className="w-20">Status</Typography>
                <input
                  type="text"
                  className="p-1 ml-auto w-full max-w-[16rem] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-[#B1B8C7] focus:border-[#B1B8C7]"
                  placeholder="Empty"
                />
              </Box>
              <Stack direction={"row"} spacing={2}>
                <Box className="flex-grow"></Box>
                <button className="border border-[#0F2043] text-[#0F2043] px-4 py-2 rounded hover:border-blue-700 hover:bg-blue-100">
                  Discard
                </button>
                <button className="bg-[#0F2043] text-white px-4 py-2 rounded hover:bg-[#0B1730]">
                  Save
                </button>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default AddNewCase;
