import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography, Modal, CircularProgress, Tooltip } from "@mui/material";
import axios from "axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import PreviewIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import RenameIcon from "@mui/icons-material/Edit";
import MoveIcon from "@mui/icons-material/Folder";
import DetailsIcon from "@mui/icons-material/Info";
import FilterButtons from "../../components/FilterButtons"; // Import FilterButtons component
import Folders from "./Folders"; // Import Folders component

const AllAttachments = () => {
  const [tableBodyData, setTableBodyData] = useState<any[]>([]);
  const [selectedAttachment, setSelectedAttachment] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttachments = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/attachments");
        const formattedData = response.data.map((attachment: any) => ({
          id: attachment.attachment_id,
          fileName: attachment.file_name,
          owner: attachment.uploaded_by,
          dateAdded: new Date(attachment.uploaded_at).toLocaleDateString(),
          actions: attachment
        }));
        setTableBodyData(formattedData);
      } catch (error) {
        console.error("Error fetching attachments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttachments();
  }, []);

  const handlePreview = (attachment: any) => {
    setSelectedAttachment(attachment);
    setModalOpen(true);
  };

  const handleDownload = (filePath: string, fileName: string) => {
    axios.get(`http://localhost:3000${filePath}`, { responseType: "blob" })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(error => console.error("Error downloading attachment:", error));
  };

  const handleRename = async (attachment) => {
    const newName = prompt("Enter new name", attachment.file_name) || attachment.file_name;
    try {
      await axios.put(`http://localhost:3000/api/attachments/${attachment.attachment_id}`, { newName });
      setTableBodyData((prevData) =>
        prevData.map((item) =>
          item.id === attachment.attachment_id ? { ...item, fileName: newName } : item
        )
      );
    } catch (error) {
      console.error("Error renaming attachment:", error);
    }
  };

  const handleMove = async (attachment: any, newFolderId: number) => {
    try {
      await axios.put(`http://localhost:3000/api/attachments/${attachment.attachment_id}/move`, { newFolderId });
      // Update state if necessary
    } catch (error) {
      console.error("Error moving attachment:", error);
    }
  };

  const handleSeeDetails = (attachment: any) => {
    setSelectedAttachment(attachment);
    setModalOpen(true);
  };

  const columns: GridColDef[] = [
    { field: "fileName", headerName: "File Name", flex: 1 },
    { field: "owner", headerName: "Owner", flex: 1 },
    { field: "dateAdded", headerName: "Date Added", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Preview">
            <Button onClick={() => handlePreview(params.value)}>
              <PreviewIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Download">
            <Button onClick={() => handleDownload(params.value.file_path, params.value.file_name)}>
              <DownloadIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Rename">
            <Button onClick={() => handleRename(params.value)}>
              <RenameIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Move to">
            <Button onClick={() => handleMove(params.value)}>
              <MoveIcon />
            </Button>
          </Tooltip>
          <Tooltip title="See Details">
            <Button onClick={() => handleSeeDetails(params.value)}>
              <DetailsIcon />
            </Button>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ marginX: 3 }}>
      <Stack spacing={3}>
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

        <Stack spacing={2} className="flex justify-start items-start">
          <Typography
            variant="h6"
            fontWeight={"bold"}
            className="text-[#0F2043]"
          >
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

        <Stack spacing={2} className="flex justify-start items-start">
          <Typography
            variant="h6"
            fontWeight={"bold"}
            className="text-[#0F2043]"
          >
            Files
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : (
            <DataGrid
              rows={tableBodyData}
              columns={columns}
              autoHeight
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
            />
          )}
        </Stack>
      </Stack>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={{ padding: 4, backgroundColor: "white", margin: "auto", marginTop: "10%", borderRadius: 2, boxShadow: 24, width: "60%", maxHeight: "80%", overflowY: "auto" }}>
          {selectedAttachment && (
            <div>
              <Typography variant="h6">{selectedAttachment.file_name}</Typography>
              <Typography>Owner: {selectedAttachment.uploaded_by}</Typography>
              <Typography>Date Added: {new Date(selectedAttachment.uploaded_at).toLocaleDateString()}</Typography>
              <Typography>File Size: {selectedAttachment.file_size}</Typography>
              <Typography>File Type: {selectedAttachment.file_type}</Typography>
              {selectedAttachment.file_type === "application/pdf" ? (
                <iframe
                  src={`http://localhost:3000${selectedAttachment.file_path}`}
                  width="100%"
                  height="500px"
                ></iframe>
              ) : (
                <img
                  src={`http://localhost:3000${selectedAttachment.file_path}`}
                  alt={selectedAttachment.file_name}
                  style={{ width: "100%" }}
                />
              )}
            </div>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default AllAttachments;