import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/login/SignIn";
import DashboardPage from "./pages/dashboard/Dashboard";
import FromEmail from "./pages/caselogs/FromEmail";
import ManualInput from "./pages/caselogs/ManualInput";
import InboxMails from "./pages/mails/Inbox";
import SentMails from "./pages/mails/Sent";
import StarredMails from "./pages/mails/Starred";
import ArchiveMails from "./pages/mails/Archive";
import AllAttachments from "./pages/attachments/AllAttachments";
import MyAttachments from "./pages/attachments/MyAttachments";
import SharedWithMe from "./pages/attachments/SharedWithMe";
import StarredAttachments from "./pages/attachments/Starred";
import ArchiveAttachments from "./pages/attachments/Archive";
import CaseTracker from "./pages/casetracker/CaseTracker";
import Sidebar from "./components/Sidebar";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Include Login */}
        <Route path="/" element={<SignIn />} />
        {/* Include Dashboard */}

        <Route path="/dashboard/*" element={<DashboardPage />} />
        {/* Include Caselogs */}
        <Route path="/caselogs/FromEmail" element={<FromEmail />} />
        <Route path="/caselogs/ManualInput" element={<ManualInput />} />
        {/* Include Mails */}
        <Route path="/mails/Inbox" element={<InboxMails />} />
        <Route path="/mails/Sent" element={<SentMails />} />
        <Route path="/mails/Starred" element={<StarredMails />} />
        <Route path="/mails/Archive" element={<ArchiveMails />} />
        {/* Include Attachments */}
        <Route
          path="/attachments/AllAttachments"
          element={<AllAttachments />}
        />
        <Route path="/attachments/MyAttachments" element={<MyAttachments />} />
        <Route path="/attachments/SharedWithMe" element={<SharedWithMe />} />
        <Route path="/attachments/Starred" element={<StarredAttachments />} />
        <Route path="/attachments/Achive" element={<ArchiveAttachments />} />
        {/* Include Case Tracker */}
        <Route path="/casetracker/CaseTracker" element={<CaseTracker />} />
      </Routes>
    </Router>
  );
}

export default App;
