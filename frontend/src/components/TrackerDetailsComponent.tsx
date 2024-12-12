import { useState } from "react";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import Divider from "@mui/material/Divider";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import TitleOutlinedIcon from "@mui/icons-material/TitleOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EditFilledIcon from "@mui/icons-material/Edit";

export default function TrackerDetailsComponent() {
  // Separate states for each icon
  type IconState = {
    edit: "outlined" | "filled";
    [key: string]: "outlined" | "filled";
  };

  const [icons, setIcons] = useState<IconState>({
    edit: "outlined",
  });

  // Updated mock data for the details table
  const detailsData = [
    {
      icon: <DescriptionOutlinedIcon sx={{ fontSize: 20 }} />,
      label: "Case No.",
      value: "RCT-001",
    },
    {
      icon: <TitleOutlinedIcon sx={{ fontSize: 20 }} />,
      label: "Title",
      value: "BPI SAVINGS v. LABINDO",
    },
    {
      icon: <PersonOutlineIcon sx={{ fontSize: 20 }} />,
      label: "Incident",
      value: "Breach of Contract",
    },
    {
      icon: <CalendarTodayOutlinedIcon sx={{ fontSize: 20 }} />,
      label: "Date SFD",
      value: "October 12, 2024",
    },
    {
      icon: <CalendarTodayOutlinedIcon sx={{ fontSize: 20 }} />,
      label: "Date of Order",
      value: "October 15, 2024",
    },
    {
      icon: <CheckCircleOutlineOutlinedIcon sx={{ fontSize: 20 }} />,
      label: "Status",
      value: "In Progress",
    },
    {
      icon: <CalendarTodayOutlinedIcon sx={{ fontSize: 20 }} />,
      label: "Deadlines",
      value: "November 30, 2024",
    },
    {
      icon: <DescriptionOutlinedIcon sx={{ fontSize: 20 }} />,
      label: "Notes",
      value: "Awaiting further documentation from both parties.",
    },
  ];

  // Generic handler for mouse enter/leave and click
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

  return (
    <Card
      sx={{
        minWidth: 400,
        maxWidth: 400,
        minHeight: 590,
        maxHeight: 590,
        boxShadow: "none",
        border: "1px solid",
        borderColor: "#DBDEE3",
        borderRadius: 3,
      }}
    >
      <CardContent sx={{ padding: 4 }}>
        <Box sx={{ color: "#0F2043" }}>
          <Stack spacing={1}>
            {/* Header */}
            <Stack direction={"row"}>
              <Typography variant="h6" fontWeight="bold">
                Details
              </Typography>
              <Box sx={{ flexGrow: 1 }} />

              <Stack direction={"row"} alignItems="center">
                {/* Edit Button */}
                <Tooltip
                  title="Edit Details"
                  slots={{ transition: Zoom }}
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
                    aria-label="Edit"
                    onClick={() => handleIconChange("click", "edit")}
                    onMouseEnter={() => handleIconChange("enter", "edit")}
                    onMouseLeave={() => handleIconChange("leave", "edit")}
                    sx={{
                      borderRadius: "50%",
                      minWidth: "auto",
                      minHeight: "auto",
                    }}
                  >
                    {icons.edit === "outlined" ? (
                      <EditOutlinedIcon className="text-[#0F2043]" />
                    ) : (
                      <EditFilledIcon className="text-[#0F2043]" />
                    )}
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
            <Divider sx={{ width: "calc(100% - 0.75rem)" }} />

            {/* Details Table */}
            <Box
              sx={{
                maxHeight: 480,
                overflow: "auto",
                "&::-webkit-scrollbar": {
                  width: 4, // Width of the scrollbar
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "#f0f0f0", // Scrollbar track color
                  borderRadius: 4,
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#D9D9D9", // Scrollbar thumb color
                  borderRadius: 4,
                  "&:hover": {
                    backgroundColor: "#909090", // Thumb color on hover
                  },
                },
              }}
            >
              <Stack spacing={2} mt={2}>
                {detailsData.map((detail, index) => (
                  <Stack
                    key={index}
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{ minHeight: 40 }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "40%",
                      }}
                    >
                      {detail.icon}
                      <Typography
                        variant="body2"
                        sx={{ ml: 1, fontWeight: "bold" }}
                      >
                        {detail.label}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ width: "60%", wordBreak: "break-word" }}
                    >
                      {detail.value}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
