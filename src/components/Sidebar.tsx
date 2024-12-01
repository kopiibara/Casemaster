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

export default function Sidebar() {
  const [open, setOpen] = React.useState(true);
  const [activeItem, setActiveItem] = React.useState(null);

  const handleClick = (item) => {
    setActiveItem(item);
    if (item === "Inbox") {
      setOpen(!open);
    }
  };

  return (
    <Stack className="w-s bg-[#0F2043] h-screen p-8" spacing={4}>
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
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 1.5,
            px: 2.5,
            borderRadius: 3,
            cursor: "pointer",
            color: "white",
            fontSize: "0.875rem", // Corresponds to text-sm
            "&:hover": {
              bgcolor: activeItem === "Sent mail" ? "inherit" : "#0B1730", // Disable hover for active item
            },
            "&.Mui-selected": {
              bgcolor: "white", // bg-white
              color: "#0f2043", // text-[#0f2043]
              //font-semibold
            },
          }}
          selected={activeItem === "Sent mail"}
          onClick={() => handleClick("Sent mail")}
        >
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Sent mail" />
        </ListItemButton>

        <ListItemButton
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 1.5,
            px: 2.5,
            borderRadius: 3,
            cursor: "pointer",
            color: "white",
            fontSize: "0.875rem", // Corresponds to text-sm
            "&:hover": {
              bgcolor: activeItem === "Sent mail" ? "inherit" : "#0B1730", // Disable hover for active item
            },
            "&.Mui-selected": {
              bgcolor: "white", // bg-white
              color: "#0f2043", // text-[#0f2043]
              fontWeight: "bold", // font-semibold
            },
          }}
          selected={activeItem === "Drafts"}
          onClick={() => handleClick("Drafts")}
        >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItemButton>

        <ListItemButton
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 1.5,
            px: 2.5,
            borderRadius: 3,
            cursor: "pointer",
            color: "white",
            fontSize: "0.875rem", // Corresponds to text-sm
            "&:hover": {
              bgcolor: activeItem === "Sent mail" ? "inherit" : "#0B1730", // Disable hover for active item
            },
            "&.Mui-selected": {
              bgcolor: "white", // bg-white
              color: "#0f2043", // text-[#0f2043]
              fontWeight: "bold", // font-semibold
            },
          }}
          selected={activeItem === "Inbox"}
          onClick={() => handleClick("Inbox")}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 1.5,
                px: 2.5,
                borderRadius: 3,
                cursor: "pointer",
                color: "white",
                fontSize: "0.875rem", // Corresponds to text-sm
                "&:hover": {
                  bgcolor: activeItem === "Sent mail" ? "inherit" : "#0B1730", // Disable hover for active item
                },
                "&.Mui-selected": {
                  bgcolor: "white", // bg-white
                  color: "#0f2043", // text-[#0f2043]
                  fontWeight: "bold", // font-semibold
                },
              }}
              selected={activeItem === "Starred"}
              onClick={() => handleClick("Starred")}
            >
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Stack>
  );
}
