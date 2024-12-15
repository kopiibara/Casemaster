import { Box, Button, Stack, Typography } from "@mui/material";

import FilterButtons from "../../components/FilterButtons";
import TableComponent from "../../components/TableComponent";
import Folders from "./Folders";

import SubMenuIcon from "@mui/icons-material/FiberManualRecord";

const AllAttachments = () => {
  const tableHeadData = ["File Name", "Owner", "Date Added"];
  const tableBodyData = [
    {
      "File Name": "12345.pdf",
      Owner: "Gwyneth Uy",
      "Date Added": "2024-12-01 12:00 PM",
    },
  ];

  const buttonData = [
    "Preview",
    "Download",
    "Rename",
    "Move to",
    "See Details",
  ];

  const popoverContent = (
    <Box style={{ padding: "1rem" }}>
      <Stack direction={"column"} spacing={1}>
        {buttonData.map((text) => (
          <Button
            key={text}
            variant="contained"
            color="primary"
            disableElevation
            sx={{
              textTransform: "none",
              backgroundColor: "transparent",
              color: "#0F2043",
              justifyContent: "flex-start",
              "&:hover": {
                backgroundColor: "#DCE5F6",
              },
            }}
          >
            <SubMenuIcon
              sx={{ width: "0.5rem", height: "0.5rem", marginRight: "0.5rem" }}
              className={"text-[#0F2043]"}
            />
            {text}
          </Button>
        ))}
      </Stack>
    </Box>
  );

  return (
    <Box sx={{ marginX: 3 }}>
      <Stack spacing={3}>
        {/* Buttons */}
        <Stack direction={"row"} spacing={1}>
          <Button
            variant="contained"
            disableElevation
            sx={{
              backgroundColor: "#0F2043",
              color: "#FFFFFF",
              borderRadius: "0.3rem",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#0B1730",
              },
            }}
          >
            {" "}
            <Stack
              direction={"row"}
              spacing={2}
              className="flex justify-center items-center px-4"
            >
              Upload File
            </Stack>
          </Button>
          <FilterButtons
            options={[
              "Date Added",
              "Today",
              "Yesterday",
              "7 days ago",
              "30 days ago",
            ]}
            defaultIndex={0}
          />
        </Stack>

        {/* Folder */}
        <Stack spacing={2} className="flex justify-start items-start">
          <Typography
            variant="h6"
            fontWeight={"bold"}
            className="text-[#0F2043]"
          >
            {" "}
            Folders
          </Typography>

          <Stack direction={"row"} spacing={3} className="flex justify-between">
            <Folders
              folderName="Criminal Case"
              folderContent="23 files"
              fileSize="30mb"
              width={"full"}
            />
            <Folders
              folderName="Civil Case"
              folderContent="25 files"
              fileSize="30mb"
            />
            <Folders
              folderName="Special Case"
              folderContent="10 files"
              fileSize="30mb"
            />
          </Stack>
        </Stack>

        {/* Files */}
        <Stack spacing={2} className="flex justify-start items-start">
          <Typography
            variant="h6"
            fontWeight={"bold"}
            className="text-[#0F2043]"
          >
            {" "}
            Files
          </Typography>
          <TableComponent
            tableHeadData={tableHeadData}
            tableBodyData={tableBodyData}
            popoverContent={popoverContent}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default AllAttachments;
