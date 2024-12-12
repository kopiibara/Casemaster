import { Box } from "@mui/material";
import EmailPreview from "./EmailPreview";
import EmailView from "./MailContent"; // Import the EmailView component

const MailContainer = () => {
  return (
    <Box display="flex" height="77vh" overflow="hidden">
      {/* Left Column: Preview Cards */}
      <Box
        sx={{
          width: "35%",
          overflowY: "auto",
          borderRight: "1px solid #ddd",
          "&::-webkit-scrollbar": {
            width: 4, // Vertical scrollbar width
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f0f0f0",
            borderRadius: 4,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#D9D9D9",
            borderRadius: 4,
            "&:hover": {
              backgroundColor: "#909090",
            },
          },
        }}
      >
        {/* Example Preview Cards */}
        <EmailPreview
          sender="Alice Cooper"
          subject="Meeting Update"
          time="10:30 AM"
          preview="Hi team, please find the updated meeting agenda..."
        />
        <EmailPreview
          sender="Bob Marley"
          subject="Invoice Attached"
          time="9:00 AM"
          preview="Dear Customer, please find the attached invoice..."
          attachmentCount={2}
        />
        <EmailPreview
          sender="Bob Marley"
          subject="Invoice Attached"
          time="9:00 AM"
          preview="Dear Customer, please find the attached invoice..."
          attachmentCount={2}
        />
        <EmailPreview
          sender="Bob Marley"
          subject="Invoice Attached"
          time="9:00 AM"
          preview="Dear Customer, please find the attached invoice..."
          attachmentCount={2}
        />
        {/* Additional EmailPreview components */}
      </Box>

      {/* Right Column: Mail View */}
      <Box
        sx={{
          width: "65%",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: 4, // Vertical scrollbar width
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f0f0f0",
            borderRadius: 4,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#D9D9D9",
            borderRadius: 4,
            "&:hover": {
              backgroundColor: "#909090",
            },
          },
        }}
      >
        {/* Replace the placeholder with EmailView */}
        <EmailView
          sender="Kendo Jenner"
          email="kendo_counsel@gmail.com"
          timestamp="October 17, 2024 10:00 PM"
          subject="CHI MING TSOI, petitioner, vs. COURT OF APPEALS, GINA LAO TSOI"
          content={`Good day, Attorney.\n\nIt appears that there is absence of empathy between petitioner and private respondent. That is — a shared feeling which between husband and wife must be experienced not only by having spontaneous sexual intimacy but a deep sense of spiritual communion. Marital union is a two-way process. An expressive interest in each other's feelings at a time it is needed by the other can go a long way in deepening the marital relationship. Marriage is definitely not for children but for two consenting adults who view the relationship with love, amor dignit amorem, respect, sacrifice and a continuing commitment to compromise, conscious of its value as a sublime social institution.\n\nIN VIEW OF THE FOREGOING PREMISES, the assailed decision of the Court of Appeals dated November 29, 1994 is hereby AFFIRMED in all respects and the petition is hereby DENIED for lack of merit.`}
          attachment={{
            name: "101424_motion_recon.pdf",
            size: "198KB",
          }}
        />
      </Box>
    </Box>
  );
};

export default MailContainer;
