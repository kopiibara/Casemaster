import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DashboardIcon from "@mui/icons-material/SpaceDashboardOutlined";
import CaseLogsIcon from "@mui/icons-material/AutoStoriesOutlined";
import MailIcon from "@mui/icons-material/EmailOutlined";
import AttachmentIcon from "@mui/icons-material/AttachmentOutlined";
import CaseTrackerIcon from "@mui/icons-material/TableChartOutlined";
import SubMenuIcon from "@mui/icons-material/FiberManualRecord";

export default function Sidebar() {
  const [activeItem, setActiveItem] = React.useState("Dashboard");
  const [openSections, setOpenSections] = React.useState<
    Record<string, boolean>
  >({
    logbook: false,
    mails: false,
    attachments: false,
  });

  const toggleSection = (
    section: string,
    defaultItem: string | null = null
  ) => {
    setOpenSections((prev) => {
      const isOpening = !prev[section];
      if (isOpening && defaultItem) {
        setActiveItem(defaultItem); // Set the default item when expanding
      }
      return {
        ...prev,
        [section]: isOpening,
      };
    });
  };

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  const listItemStyles = (items) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 3,
    cursor: "pointer",
    color: "white",
    fontSize: "0.75rem",
    "&:hover": {
      bgcolor: "#0B1730",
    },
    "&.Mui-selected": {
      bgcolor: "white",
      color: "#0f2043",
      fontWeight: "bold",
      "&:hover": {
        bgcolor: "white",
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
        aria-labelledby="casemaster"
      >
        {/* Dashboard */}
        <ListItemButton
          sx={{
            ...listItemStyles("Dashboard"),
            paddingY: "0.5rem",
            paddingX: "1rem",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
          selected={activeItem === "Dashboard"}
          onClick={() => handleItemClick("Dashboard")}
        >
          <ListItemIcon
            sx={{
              minWidth: "unset",
              marginRight: "0.25rem",
            }}
          >
            <DashboardIcon
              className={
                activeItem === "Dashboard" ? "text-[#0F2043]" : "text-[#f6f9ff]"
              }
            />
          </ListItemIcon>
          <ListItemText
            primary="Dashboard"
            sx={{
              margin: "0.3rem",
            }}
          />
        </ListItemButton>

        {/* Caselogs */}
        <ListItemButton
          sx={{
            ...listItemStyles("Caselogs"),
            paddingY: "0.5rem",
            paddingX: "1rem",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
          onClick={() => toggleSection("caselogs", "From Email")}
        >
          <ListItemIcon
            sx={{
              minWidth: "unset",
              marginRight: "0.25rem",
            }}
          >
            <CaseLogsIcon
              className={
                activeItem === "Caselogs" ? "text-[#0F2043]" : "text-[#f6f9ff]"
              }
            />
          </ListItemIcon>
          <ListItemText
            primary="Case Logs"
            sx={{
              marginLeft: "0.3rem",
            }}
          />
          {openSections.caselogs ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openSections.caselogs} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{
                ...listItemStyles("From Email"),
                paddingY: "0.5rem",
                paddingX: "1rem",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
              selected={activeItem === "From Email"}
              onClick={() => handleItemClick("From Email")}
            >
              <ListItemIcon
                sx={{
                  minWidth: "unset",
                }}
              >
                <SubMenuIcon
                  sx={{
                    width: "0.7rem",
                    height: "0.7rem",
                    marginLeft: "0.25rem",
                  }}
                  className={
                    activeItem === "From Email"
                      ? "text-[#0F2043]"
                      : "text-[#f6f9ff]"
                  }
                />
              </ListItemIcon>
              <ListItemText
                primary="From Email"
                sx={{
                  paddingLeft: "1rem",
                }}
              />
            </ListItemButton>
            <ListItemButton
              sx={{
                ...listItemStyles("Manual Input"),
                paddingY: "0.5rem",
                paddingX: "1rem",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
              selected={activeItem === "Manual Input"}
              onClick={() => handleItemClick("Manual Input")}
            >
              <ListItemIcon
                sx={{
                  minWidth: "unset",
                }}
              >
                <SubMenuIcon
                  sx={{
                    width: "0.7rem",
                    height: "0.7rem",
                    marginLeft: "0.25rem",
                  }}
                  className={
                    activeItem === "Manual Input"
                      ? "text-[#0F2043]"
                      : "text-[#f6f9ff]"
                  }
                />
              </ListItemIcon>
              <ListItemText
                primary="Manual Input"
                sx={{
                  paddingLeft: "1rem",
                }}
              />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Mails */}
        <ListItemButton
          sx={{
            ...listItemStyles("Mails"),
            paddingY: "0.5rem",
            paddingX: "1rem",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
          onClick={() => toggleSection("mails", "Inbox")}
        >
          <ListItemIcon
            sx={{
              minWidth: "unset",
              marginRight: "0.5rem",
            }}
          >
            <MailIcon
              className={
                activeItem === "Caselogs" ? "text-[#0F2043]" : "text-[#f6f9ff]"
              }
            />
          </ListItemIcon>

          <ListItemText
            primary="Mails"
            sx={{
              marginLeft: "0.3rem",
            }}
          />
          {openSections.mails ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openSections.mails} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{
                ...listItemStyles("Inbox"),
                paddingY: "0.5rem",
                paddingX: "1rem",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
              selected={activeItem === "Inbox"}
              onClick={() => handleItemClick("Inbox")}
            >
              <ListItemIcon
                sx={{
                  minWidth: "unset",
                }}
              >
                <SubMenuIcon
                  sx={{
                    width: "0.7rem",
                    height: "0.7rem",
                    marginLeft: "0.25rem",
                  }}
                  className={
                    activeItem === "Inbox" ? "text-[#0F2043]" : "text-[#f6f9ff]"
                  }
                />
              </ListItemIcon>
              <ListItemText
                primary="Inbox"
                sx={{
                  paddingLeft: "1rem",
                }}
              />
            </ListItemButton>
            <ListItemButton
              sx={{
                ...listItemStyles("Sent"),
                paddingY: "0.5rem",
                paddingX: "1rem",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
              selected={activeItem === "Sent"}
              onClick={() => handleItemClick("Sent")}
            >
              <ListItemIcon
                sx={{
                  minWidth: "unset",
                }}
              >
                <SubMenuIcon
                  sx={{
                    width: "0.7rem",
                    height: "0.7rem",
                    marginLeft: "0.25rem",
                  }}
                  className={
                    activeItem === "Sent" ? "text-[#0F2043]" : "text-[#f6f9ff]"
                  }
                />
              </ListItemIcon>
              <ListItemText
                primary="Sent"
                sx={{
                  paddingLeft: "1rem",
                }}
              />
            </ListItemButton>
            <ListItemButton
              sx={{
                ...listItemStyles("Starred"),
                paddingY: "0.5rem",
                paddingX: "1rem",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
              selected={activeItem === "Starred"}
              onClick={() => handleItemClick("Starred")}
            >
              <ListItemIcon
                sx={{
                  minWidth: "unset",
                }}
              >
                <SubMenuIcon
                  sx={{
                    width: "0.7rem",
                    height: "0.7rem",
                    marginLeft: "0.25rem",
                  }}
                  className={
                    activeItem === "Starred"
                      ? "text-[#0F2043]"
                      : "text-[#f6f9ff]"
                  }
                />
              </ListItemIcon>
              <ListItemText
                primary="Starred"
                sx={{
                  paddingLeft: "1rem",
                }}
              />
            </ListItemButton>
            <ListItemButton
              sx={{
                ...listItemStyles("Archive"),
                paddingY: "0.5rem",
                paddingX: "1rem",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
              selected={activeItem === "Archive"}
              onClick={() => handleItemClick("Archive")}
            >
              <ListItemIcon
                sx={{
                  minWidth: "unset",
                }}
              >
                <SubMenuIcon
                  sx={{
                    width: "0.7rem",
                    height: "0.7rem",
                    marginLeft: "0.25rem",
                  }}
                  className={
                    activeItem === "Archive"
                      ? "text-[#0F2043]"
                      : "text-[#f6f9ff]"
                  }
                />
              </ListItemIcon>
              <ListItemText
                primary="Archive"
                sx={{
                  paddingLeft: "1rem",
                }}
              />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Attachments */}
        <ListItemButton
          sx={{
            ...listItemStyles("Attachments"),
            paddingY: "0.5rem",
            paddingX: "1rem",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
          onClick={() => toggleSection("attachments", "All Attachments")}
        >
          <ListItemIcon
            sx={{
              minWidth: "unset",
              marginRight: "0.5rem",
            }}
          >
            <AttachmentIcon
              className={
                activeItem === "Attachments"
                  ? "text-[#0F2043]"
                  : "text-[#f6f9ff]"
              }
            />
          </ListItemIcon>
          <ListItemText
            primary="Attachments"
            sx={{
              paddingLeft: "0.3rem",
            }}
          />
          {openSections.attachments ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openSections.attachments} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{
                ...listItemStyles("All Attachments"),
                paddingY: "0.5rem",
                paddingX: "1rem",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
              selected={activeItem === "All Attachments"}
              onClick={() => handleItemClick("All Attachments")}
            >
              <ListItemIcon
                sx={{
                  minWidth: "unset",
                }}
              >
                <SubMenuIcon
                  sx={{
                    width: "0.7rem",
                    height: "0.7rem",
                    marginLeft: "0.25rem",
                  }}
                  className={
                    activeItem === "All Attachments"
                      ? "text-[#0F2043]"
                      : "text-[#f6f9ff]"
                  }
                />
              </ListItemIcon>
              <ListItemText
                primary="All Attachments"
                sx={{
                  paddingLeft: "1rem",
                }}
              />
            </ListItemButton>
            <ListItemButton
              sx={{
                ...listItemStyles("My Attachments"),
                paddingY: "0.5rem",
                paddingX: "1rem",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
              selected={activeItem === "My Attachments"}
              onClick={() => handleItemClick("My Attachments")}
            >
              <ListItemIcon
                sx={{
                  minWidth: "unset",
                }}
              >
                <SubMenuIcon
                  sx={{
                    width: "0.7rem",
                    height: "0.7rem",
                    marginLeft: "0.25rem",
                  }}
                  className={
                    activeItem === "My Attachments"
                      ? "text-[#0F2043]"
                      : "text-[#f6f9ff]"
                  }
                />
              </ListItemIcon>
              <ListItemText
                primary="My Attachments"
                sx={{
                  paddingLeft: "1rem",
                }}
              />
            </ListItemButton>
            <ListItemButton
              sx={{
                ...listItemStyles("Shared with Me"),
                paddingY: "0.5rem",
                paddingX: "1rem",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
              selected={activeItem === "Shared with Me"}
              onClick={() => handleItemClick("Shared with Me")}
            >
              <ListItemIcon
                sx={{
                  minWidth: "unset",
                }}
              >
                <SubMenuIcon
                  sx={{
                    width: "0.7rem",
                    height: "0.7rem",
                    marginLeft: "0.25rem",
                  }}
                  className={
                    activeItem === "Shared with Me"
                      ? "text-[#0F2043]"
                      : "text-[#f6f9ff]"
                  }
                />
              </ListItemIcon>
              <ListItemText
                primary="Shared with Me"
                sx={{
                  paddingLeft: "1rem",
                }}
              />
            </ListItemButton>
            <ListItemButton
              sx={{
                ...listItemStyles("Starred Attachments"),
                paddingY: "0.5rem",
                paddingX: "1rem",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
              selected={activeItem === "Starred Attachments"}
              onClick={() => handleItemClick("Starred Attachments")}
            >
              <ListItemIcon
                sx={{
                  minWidth: "unset",
                }}
              >
                <SubMenuIcon
                  sx={{
                    width: "0.7rem",
                    height: "0.7rem",
                    marginLeft: "0.25rem",
                  }}
                  className={
                    activeItem === "Starred Attachments "
                      ? "text-[#0F2043]"
                      : "text-[#f6f9ff]"
                  }
                />
              </ListItemIcon>
              <ListItemText
                primary="Starred Attachments"
                sx={{
                  paddingLeft: "1rem",
                }}
              />
            </ListItemButton>
            <ListItemButton
              sx={{
                ...listItemStyles("Archive Attachments"),
                paddingY: "0.5rem",
                paddingX: "1rem",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
              selected={activeItem === "Archive Attachments"}
              onClick={() => handleItemClick("Archive Attachments")}
            >
              <ListItemIcon
                sx={{
                  minWidth: "unset",
                }}
              >
                <SubMenuIcon
                  sx={{
                    width: "0.7rem",
                    height: "0.7rem",
                    marginLeft: "0.25rem",
                  }}
                  className={
                    activeItem === "Archive Attachments"
                      ? "text-[#0F2043]"
                      : "text-[#f6f9ff]"
                  }
                />
              </ListItemIcon>
              <ListItemText
                primary="Archive Attachments"
                sx={{
                  paddingLeft: "1rem",
                }}
              />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton
          sx={listItemStyles("Case Tracker")}
          selected={activeItem === "Case Tracker"}
          onClick={() => handleItemClick("Case Tracker")}
        >
          <ListItemIcon
            sx={{
              minWidth: "unset",
              marginRight: "0.5rem",
            }}
          >
            <CaseTrackerIcon
              className={
                activeItem === "Case Tracker"
                  ? "text-[#0F2043]"
                  : "text-[#f6f9ff]"
              }
            />
          </ListItemIcon>
          <ListItemText
            primary="Case Tracker"
            sx={{
              paddingLeft: "0.3rem",
            }}
          />
        </ListItemButton>
      </List>
    </Stack>
  );
}
