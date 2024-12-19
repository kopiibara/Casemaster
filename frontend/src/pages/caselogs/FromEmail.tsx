import { Box } from "@mui/system";
import FilterButtons from "../../components/FilterButtons";
import Stack from "@mui/material/Stack";
import TableComponent from "../../components/TableComponent";
import { IconButton, Button } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InfoFilledIcon from "@mui/icons-material/Info";
import React, { useState, useEffect } from "react";
import DetailsComponent from "../../components/DetailsComponent";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import CancelIcon from "@mui/icons-material/Cancel";
import SubMenuIcon from "@mui/icons-material/FiberManualRecord";
import axios from "axios";

const FromEmail: React.FC = () => {
  const DocumentType = [
    "Document Type",
    "All",
    "Motion",
    "Pleadings",
    "Incident",
    "Criminal Case",
    "Civil Case",
    "Special Case",
  ];

  const Status = ["Status", "New", "Active", "Closed", "Appealed", "Archived"];

  const Dates = ["Date", "Today", "Yesterday", "Last 7 days", "Last 30 days"];

  const tableHeadData = ["Case No.", "Title", "Date Added", "Status"];

  // State to store case logs fetched from the backend
  const [tableBodyData, setTableBodyData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch case logs from the backend
  useEffect(() => {
    const fetchCaseLogs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:3000/api/caselogs");
        setTableBodyData(
          response.data.map((log: any) => ({
            "Case No.": log.case_no,
            Title: log.title,
            "Date Added": new Date(log.date_added).toLocaleDateString(),
            Status: log.status,
          }))
        );
      } catch (err) {
        setError("Failed to load case logs.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaseLogs();
  }, []);

  const popoverContent = (
    <Box style={{ padding: "1rem" }}>
      <Stack direction={"column"} spacing={1}>
        <Button
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
          View Details
        </Button>
        <Button
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
          Edit Details
        </Button>
        <Button
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
          View Email
        </Button>
        <Button
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
          Import to Case Tracker
        </Button>
        <Button
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
          Archive
        </Button>
      </Stack>
    </Box>
  );

  const [icon, setIcon] = useState("outlined");
  const [showCard, setShowCard] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleMouseEnter = () => setIcon("filled");
  const handleMouseLeave = () => setIcon("outlined");

  const handleClick = () => {
    setIsDetailsOpen((prev) => !prev);
    setIcon(isDetailsOpen ? "outlined" : "filled");
    setShowCard((prev) => !prev);
  };

  return (
    <Box sx={{ marginX: 3 }}>
      <Stack spacing={2}>
        <Stack spacing={1} direction="row">
          <FilterButtons options={DocumentType} defaultIndex={0} />
          <FilterButtons options={Status} defaultIndex={0} />
          <FilterButtons options={Dates} defaultIndex={0} />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ marginLeft: "auto" }}>
            <Tooltip
              title={isDetailsOpen ? "Close Details" : "Details"}
              TransitionComponent={Zoom}
              placement="top"
              arrow
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, -5],
                      },
                    },
                  ],
                },
              }}
            >
              <IconButton
                aria-label="Details"
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {isDetailsOpen ? (
                  <CancelIcon className="text-[#0F2043]" />
                ) : icon === "outlined" ? (
                  <InfoOutlinedIcon className="text-[#0F2043]" />
                ) : (
                  <InfoFilledIcon className="text-[#0F2043]" />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Stack>

        <Box
          sx={{ display: "flex", flexDirection: "row", gap: 2, width: "100%" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexGrow: 1,
              height: "100%",
              overflow: "hidden",
            }}
          >
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <TableComponent
                tableHeadData={tableHeadData}
                tableBodyData={tableBodyData}
                popoverContent={popoverContent}
              />
            )}
          </Box>

          {showCard && <DetailsComponent />}
        </Box>
      </Stack>
    </Box>
  );
};

export default FromEmail;
