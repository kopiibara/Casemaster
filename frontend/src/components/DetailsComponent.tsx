import { useState } from "react";

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

export default function DetailsComponent() {
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

  const detailsData = [
    {
      icon: <DescriptionOutlinedIcon className="text-lg" />,
      label: "Case No.",
      value: "RCT-001",
    },
    {
      icon: <TitleOutlinedIcon className="text-lg" />,
      label: "Title",
      value: "BPI SAVINGS v. LABINDO",
    },
    {
      icon: <PersonOutlineIcon className="text-lg" />,
      label: "Party Filer",
      value: "Yvez Lawrence",
    },
    {
      icon: <CalendarTodayOutlinedIcon className="text-lg" />,
      label: "Date Added",
      value: "October 12, 2024 5:30 PM",
    },
    {
      icon: <LabelOutlinedIcon className="text-lg" />,
      label: "Document Type",
      value: "Motion",
    },
    {
      icon: <AttachFileOutlinedIcon className="text-lg" />,
      label: "Attachment",
      value: "101424_motion_recon.pdf",
    },
    {
      icon: <LabelOutlinedIcon className="text-lg" />,
      label: "Tag",
      value: "None",
    },
    {
      icon: <CheckCircleOutlineOutlinedIcon className="text-lg" />,
      label: "Status",
      value: "New",
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

  return (
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
                    className="rounded-full min-w-auto min-h-auto"
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
                    className="rounded-full min-w-auto min-h-auto"
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
                    className="rounded-full min-w-auto min-h-auto"
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
            <Divider className="w-[calc(100%-0.75rem)]" />

            <Box className="max-h-[480px] overflow-auto scrollbar-thin scrollbar-thumb-[#D9D9D9] scrollbar-track-[#f0f0f0] scrollbar-thumb-rounded hover:scrollbar-thumb-[#909090]">
              <Stack spacing={2} mt={2}>
                {detailsData.map((detail, index) => (
                  <Stack
                    key={index}
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    className="min-h-[40px] text-[#8992A3]"
                  >
                    <Box className="flex items-center w-[40%] gap-3   ">
                      {detail.icon}
                      <Typography variant="body2" className=" text-[#8992A3]">
                        {detail.label}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      className="w-[60%] break-words text-[#0F2043]"
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
