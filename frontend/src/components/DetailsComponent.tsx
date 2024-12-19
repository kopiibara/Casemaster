import { useState, useEffect } from "react";
import {
  Stack,
  Box,
  Typography,
  IconButton,
  Divider,
  Zoom,
  Tooltip,
  CardContent,
  Card,
  Dialog,
  DialogContent,
} from "@mui/material";
import ImportOutlinedIcon from "@mui/icons-material/PublishOutlined";
import ImportFilledIcon from "@mui/icons-material/Publish";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import EmailFilledIcon from "@mui/icons-material/Email";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import TitleOutlinedIcon from "@mui/icons-material/TitleOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EditFilledIcon from "@mui/icons-material/Edit";
import ChipComponent from "./ChipComponent"; // Assuming you have this component
import EditCase from "./EditCase"; // Assuming you have this component
import { Document, Page } from "react-pdf"; // React-PDF library
import axios from "axios";

// Props interface
interface DetailsComponentProps {
  values: { [key: string]: string | null } | null; // Allow values to be null
  onEdit: (data: any) => void; // Function to fetch and handle edit
}

export default function DetailsComponent({
  values,
  onEdit,
}: DetailsComponentProps) {
  const [icons, setIcons] = useState<{ [key: string]: string }>({
    import: "outlined",
    email: "outlined",
    edit: "outlined",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const detailsData = [
    {
      icon: <DescriptionOutlinedIcon className="text-lg" />,
      label: "Case No.",
      valueKey: "case_no",
    },
    {
      icon: <TitleOutlinedIcon className="text-lg" />,
      label: "Title",
      valueKey: "title",
    },
    {
      icon: <PersonOutlineIcon className="text-lg" />,
      label: "Party Filer",
      valueKey: "party_filer",
    },
    {
      icon: <CalendarTodayOutlinedIcon className="text-lg" />,
      label: "Date Added",
      valueKey: "date_added",
    },
    {
      icon: <LabelOutlinedIcon className="text-lg" />,
      label: "Document Type",
      valueKey: "case_type",
    },

    {
      icon: <LabelOutlinedIcon className="text-lg" />,
      label: "Tag",
      valueKey: "tag",
    },
    {
      icon: <CheckCircleOutlineOutlinedIcon className="text-lg" />,
      label: "Status",
      valueKey: "status",
    },
  ];

  const handleIconChange = (action: string, iconName: string) => {
    setIcons((prev) => ({
      ...prev,
      [iconName]:
        action === "enter"
          ? "filled"
          : action === "leave"
          ? "outlined"
          : prev[iconName] === "outlined"
          ? "filled"
          : "outlined",
    }));
  };

  const handleDialogOpen = () => setIsDialogOpen(true);
  const handleDialogClose = () => setIsDialogOpen(false);

  const handleEditClick = () => {
    if (values) {
      onEdit(values); // Pass the current data to the parent component
      handleDialogOpen();
    }
  };

  const getValueOrEmpty = (value: string | null) => {
    return value && value.trim() !== "" ? value : "Empty";
  };

  const renderAttachment = (url: string | null) => {
    if (url) {
      return (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault(); // Prevent default link behavior
            fetchFileDetails(url); // Fetch file details and show PDF
          }}
          style={{ color: "#0F2043", textDecoration: "underline" }}
        >
          Open Attachment
        </a>
      );
    }
    return "No attachment available";
  };

  // Function to fetch file details for PDF display
  const fetchFileDetails = async (fileId: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/file-details/${fileId}`);
      setPdfUrl(response.data.webViewLink); // Use the webViewLink for the PDF viewer
      setIsPdfViewerOpen(true);
    } catch (error) {
      console.error("Failed to fetch file details:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderPdfViewer = () => {
    if (loading) {
      return <Typography>Loading...</Typography>;
    }

    return (
      <Document file={pdfUrl || ""}>
        <Page pageNumber={1} />
      </Document>
    );
  };

  const hasData = values && Object.keys(values).length > 0;

  return (
    <>
      <Card
        className="min-w-[400px] p-6 max-w-[400px] min-h-[590px] max-h-[590px] shadow-none border border-[#DBDEE3]"
        sx={{ borderRadius: "0.5rem" }}
      >
        <CardContent className="p-4">
          <Box className="text-[#0F2043]">
            <Stack spacing={1}>
              <Stack direction={"row"}>
                <Typography variant="h6" className="font-bold">
                  Details
                </Typography>
                <Box className="flex-grow" />
                <Stack direction={"row"} alignItems="center">
                  <Tooltip
                    title="Import to Case Tracker"
                    slots={{ transition: Zoom }}
                    arrow
                  >
                    <IconButton
                      aria-label="import"
                      onClick={() => handleIconChange("click", "import")}
                    >
                      {icons.import === "outlined" ? (
                        <ImportOutlinedIcon className="text-[#0F2043]" />
                      ) : (
                        <ImportFilledIcon className="text-[#0F2043]" />
                      )}
                    </IconButton>
                  </Tooltip>

                  <Tooltip
                    title="Check Email"
                    slots={{ transition: Zoom }}
                    arrow
                  >
                    <IconButton
                      aria-label="Email"
                      onClick={() => handleIconChange("click", "email")}
                    >
                      {icons.email === "outlined" ? (
                        <EmailOutlinedIcon className="text-[#0F2043]" />
                      ) : (
                        <EmailFilledIcon className="text-[#0F2043]" />
                      )}
                    </IconButton>
                  </Tooltip>

                  <Tooltip
                    title="Edit Details"
                    slots={{ transition: Zoom }}
                    arrow
                  >
                    <IconButton aria-label="Edit" onClick={handleEditClick}>
                      {icons.edit === "outlined" ? (
                        <EditOutlinedIcon className="text-[#0F2043]" />
                      ) : (
                        <EditFilledIcon className="text-[#0F2043]" />
                      )}
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>
              <Divider />

              {/* Dynamic Content */}
              <Box>
                {hasData ? (
                  <Stack spacing={2} mt={2}>
                    {detailsData.map((detail, index) => (
                      <Stack
                        key={index}
                        direction="row"
                        spacing={4}
                        alignItems="center"
                      >
                        <Stack
                          direction={"row"}
                          spacing={2}
                          className="w-[40%]"
                        >
                          <Box className="text-[#57637B]">{detail.icon}</Box>
                          <Typography
                            variant="subtitle2"
                            className="text-[#57637B]"
                          >
                            {detail.label}
                          </Typography>
                        </Stack>
                        <Typography
                          variant="subtitle2"
                          fontWeight={"bold"}
                          className="w-[60%]"
                        >
                          {detail.valueKey === "file_url" ? (
                            renderAttachment(values[detail.valueKey] as string)
                          ) : detail.valueKey === "status" ? (
                            <ChipComponent
                              label={getValueOrEmpty(
                                values[detail.valueKey] as string
                              )}
                              variant="filled"
                            />
                          ) : (
                            getValueOrEmpty(values[detail.valueKey])
                          )}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Select row to show data
                  </Typography>
                )}
              </Box>
            </Stack>
          </Box>
        </CardContent>
      </Card>

      {/* Dialog for Edit */}
      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogContent>
          <EditCase onClose={handleDialogClose} caseData={values} />
        </DialogContent>
      </Dialog>

      {/* PDF Viewer Dialog */}
      <Dialog
        open={isPdfViewerOpen}
        onClose={() => setIsPdfViewerOpen(false)}
        fullWidth
        maxWidth="lg"
      >
        <DialogContent>{renderPdfViewer()}</DialogContent>
      </Dialog>
    </>
  );
}
