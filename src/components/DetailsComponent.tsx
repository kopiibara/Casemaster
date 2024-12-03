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
import ImportOutlinedIcon from "@mui/icons-material/PublishOutlined";
import ImportFilledIcon from "@mui/icons-material/Publish";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import EmailFilledIcon from "@mui/icons-material/Email";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EditFilledIcon from "@mui/icons-material/Edit";

export default function DetailsComponent() {
  // Separate states for each icon
  type IconState = {
    import: "outlined" | "filled";
    email: "outlined" | "filled";
    edit: "outlined" | "filled";
    [key: string]: "outlined" | "filled";
  };

  const [icons, setIcons] = useState<IconState>({
    import: "outlined",
    email: "outlined",
    edit: "outlined",
  });

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
                {/* Import Button */}
                <Tooltip
                  title="Import to Case Tracker"
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
                    aria-label="import"
                    onClick={() => handleIconChange("click", "import")}
                    onMouseEnter={() => handleIconChange("enter", "import")}
                    onMouseLeave={() => handleIconChange("leave", "import")}
                    sx={{
                      borderRadius: "50%",
                      minWidth: "auto",
                      minHeight: "auto",
                    }}
                  >
                    {icons.import === "outlined" ? (
                      <ImportOutlinedIcon className="text-[#0F2043]" />
                    ) : (
                      <ImportFilledIcon className="text-[#0F2043]" />
                    )}
                  </IconButton>
                </Tooltip>

                {/* Email Button */}
                <Tooltip
                  title="Check Email"
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
                    aria-label="Email"
                    onClick={() => handleIconChange("click", "email")}
                    onMouseEnter={() => handleIconChange("enter", "email")}
                    onMouseLeave={() => handleIconChange("leave", "email")}
                    sx={{
                      borderRadius: "50%",
                      minWidth: "auto",
                      minHeight: "auto",
                    }}
                  >
                    {icons.email === "outlined" ? (
                      <EmailOutlinedIcon className="text-[#0F2043]" />
                    ) : (
                      <EmailFilledIcon className="text-[#0F2043]" />
                    )}
                  </IconButton>
                </Tooltip>

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
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
