import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import NotificationIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import Zoom from "@mui/material/Zoom";

export default function Header({ title }: { title: string }) {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);

  return (
    <Box sx={{ flexGrow: 1, marginTop: 5, border: "1px", marginX: 4 }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{ bgcolor: "#f6f9ff", gap: 4 }}
      >
        <Toolbar>
          <Stack direction="column" sx={{ flexGrow: 1 }}>
            <Typography variant="body1" sx={{ color: "#0f2043" }}>
              {formattedDate}
            </Typography>
            <Typography
              variant="h4"
              component="div"
              sx={{ color: "#0F2043", fontWeight: "bold" }}
            >
              {title}
            </Typography>
          </Stack>
          <Box sx={{ flexGrow: 1 }} />
          <Input
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon style={{ color: "#424242", marginLeft: "15px" }} />
              </InputAdornment>
            }
            placeholder="Search"
            disableUnderline
            style={{
              backgroundColor: "#d3cfcf4d",
              color: "#424242",
              height: "2.5rem",
              borderRadius: "20px",
            }}
          />
          <Tooltip
            title="Notifications"
            TransitionComponent={Zoom}
            placement="bottom"
            arrow
          >
            <IconButton aria-label="Import to Case Tracker" size="small">
              <NotificationIcon
                style={{ color: "#0F2043", cursor: "pointer" }}
              />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
