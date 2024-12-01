import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import ArchiveIcon from "@mui/icons-material/Archive";

export default function Sidebar() {
  const [activeItem, setActiveItem] = React.useState("Dashboard");
  const [openSections, setOpenSections] = React.useState({
    logbook: false,
    mails: false,
    attachments: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const listItemStyles = (item) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    py: 1, // Reduce vertical padding
    px: 2, // Slightly reduce horizontal padding
    borderRadius: 3,
    cursor: "pointer",
    color: "white",
    fontSize: "0.75rem", // Slightly smaller font size
    "&:hover": {
      bgcolor: "#0B1730", // Default hover behavior
    },
    "&.Mui-selected": {
      bgcolor: "white", // Active background
      color: "#0f2043", // Active text color
      fontWeight: "bold",
      "&:hover": {
        bgcolor: "white", // Override hover when active
      },
    },
  });

  return (
    <Stack className="w-65 bg-[#0F2043] h-screen p-8" spacing={4}>
      <Stack direction="row" spacing={2}>
        <Box>
          <img
            src="/logo-white.ico"
            alt="Casemaster Logo"
            style={{ width: 50, height: 50 }}
          />
        </Box>
        <Box>
          <Typography
            sx={{ color: "#f6f9ff", fontWeight: "bold" }}
            variant="h4"
          >
            Casemaster
          </Typography>
        </Box>
      </Stack>

      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          color: "#f6f9ff",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton
          sx={listItemStyles("Dashboard")}
          selected={activeItem === "Dashboard"}
          onClick={() => handleItemClick("Dashboard")}
        >
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton
          sx={listItemStyles("Logbook")}
          onClick={() => toggleSection("logbook")}
        >
          <ListItemText primary="Logbook" />
          {openSections.logbook ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openSections.logbook} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={listItemStyles("From Email")}
              selected={activeItem === "From Email"}
              onClick={() => handleItemClick("From Email")}
            >
              <ListItemText primary="From Email" />
            </ListItemButton>
            <ListItemButton
              sx={listItemStyles("Manual Input")}
              selected={activeItem === "Manual Input"}
              onClick={() => handleItemClick("Manual Input")}
            >
              <ListItemText primary="Manual Input" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton
          sx={listItemStyles("Mails")}
          onClick={() => toggleSection("mails")}
        >
          <ListItemText primary="Mails" />
          {openSections.mails ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openSections.mails} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={listItemStyles("Inbox")}
              selected={activeItem === "Inbox"}
              onClick={() => handleItemClick("Inbox")}
            >
              <ListItemText primary="Inbox" />
            </ListItemButton>
            <ListItemButton
              sx={listItemStyles("Sent")}
              selected={activeItem === "Sent"}
              onClick={() => handleItemClick("Sent")}
            >
              <ListItemText primary="Sent" />
            </ListItemButton>
            <ListItemButton
              sx={listItemStyles("Starred")}
              selected={activeItem === "Starred"}
              onClick={() => handleItemClick("Starred")}
            >
              <ListItemText primary="Starred" />
            </ListItemButton>
            <ListItemButton
              sx={listItemStyles("Archive")}
              selected={activeItem === "Archive"}
              onClick={() => handleItemClick("Archive")}
            >
              <ListItemText primary="Archive" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton
          sx={listItemStyles("Attachments")}
          onClick={() => toggleSection("attachments")}
        >
          <ListItemText primary="Attachments" />
          {openSections.attachments ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openSections.attachments} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={listItemStyles("All Attachments")}
              selected={activeItem === "All Attachments"}
              onClick={() => handleItemClick("All Attachments")}
            >
              <ListItemText primary="All Attachments" />
            </ListItemButton>
            <ListItemButton
              sx={listItemStyles("My Attachments")}
              selected={activeItem === "My Attachments"}
              onClick={() => handleItemClick("My Attachments")}
            >
              <ListItemText primary="My Attachments" />
            </ListItemButton>
            <ListItemButton
              sx={listItemStyles("Shared with Me")}
              selected={activeItem === "Shared with Me"}
              onClick={() => handleItemClick("Shared with Me")}
            >
              <ListItemText primary="Shared with Me" />
            </ListItemButton>
            <ListItemButton
              sx={listItemStyles("Starred Attachments")}
              selected={activeItem === "Starred Attachments"}
              onClick={() => handleItemClick("Starred Attachments")}
            >
              <ListItemText primary="Starred Attachments" />
            </ListItemButton>
            <ListItemButton
              sx={listItemStyles("Archive Attachments")}
              selected={activeItem === "Archive Attachments"}
              onClick={() => handleItemClick("Archive Attachments")}
            >
              <ListItemText primary="Archive Attachments" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton
          sx={listItemStyles("Case Tracker")}
          selected={activeItem === "Case Tracker"}
          onClick={() => handleItemClick("Case Tracker")}
        >
          <ListItemText primary="Case Tracker" />
        </ListItemButton>

        <ListItemButton
          sx={listItemStyles("Archive")}
          selected={activeItem === "Archive"}
          onClick={() => handleItemClick("Archive")}
        >
          <ListItemText primary="Archive" />
        </ListItemButton>
      </List>
    </Stack>
  );
}
