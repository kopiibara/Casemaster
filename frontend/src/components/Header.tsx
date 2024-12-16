import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import NotificationIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import Zoom from "@mui/material/Zoom";
import Divider from "@mui/material/Divider";

export default function Header({ title }: { title: string }) {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);

  return (
    <Box className="flex-grow pt-10 px-6 po">
      <AppBar
        position="static"
        elevation={0}
        className="gap-1.5"
        sx={{ backgroundColor: "#f6f9ff" }}
      >
        <Toolbar>
          <Stack direction="column" spacing={0.1}>
            <Typography variant="body1" className="text-[#828CA0]">
              {formattedDate}
            </Typography>
            <Typography
              variant="h4"
              component="div"
              className="text-[#0F2043]"
              fontWeight={"bold"}
            >
              {title}
            </Typography>
          </Stack>
          <Box className="flex-grow" />
          <Stack spacing={2} direction="row">
            {/* Conditionally render the search bar */}
            {title !== "Dashboard" && (
              <Input
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon
                      style={{ color: "#424242", marginLeft: "15px" }}
                    />
                  </InputAdornment>
                }
                placeholder="Search"
                disableUnderline
                className="bg-[#d3cfcf4d] text-[#424242] h-10 rounded-full"
              />
            )}
            <Tooltip
              title="Notifications"
              TransitionComponent={Zoom}
              placement="bottom"
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
              <IconButton aria-label="Notification">
                <NotificationIcon className="text-[#0F2043] cursor-pointer" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Toolbar>
        <Box className="ml-6">
          <Divider className="w-[calc(100%-1.5rem)] pt-1" />
        </Box>
      </AppBar>
    </Box>
  );
}
