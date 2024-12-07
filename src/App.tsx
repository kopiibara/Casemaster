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
import MainLayout from "./MainLayout";
import ProfileSetup from "./pages/login/ProfileSetup";
import PINSetup from "./pages/login/PINSetup";
import Profiles from "./pages/login/Profiles";
import LoginExistingProfile from "./pages/login/ExistingProfile/LoginExistingProfile";
import ExistingProfilePin from "./pages/login/ExistingProfile/ExistingProfilePin";
import AddExistingProfile from "./pages/login/ExistingProfile/AddExistingProfile";
import ConfirmExistingProfile from "./pages/login/ExistingProfile/ConfirmExistingProfile";



function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<SignIn />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/pin-setup" element={<PINSetup />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/login-existing-profile" element={<LoginExistingProfile/>}/>
        <Route path="/add-existing-profile" element={<AddExistingProfile/>}/>
        <Route path="/existing-profile-pin" element={<ExistingProfilePin/>}/>
        <Route path="/confirm-existing-profile" element={<ConfirmExistingProfile/>}/>

        {/* Protected Routes (with Sidebar and Header) */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/caselogs/FromEmail" element={<FromEmail />} />
          <Route path="/caselogs/ManualInput" element={<ManualInput />} />
          <Route path="/mails/Inbox" element={<InboxMails />} />
          <Route path="/mails/Sent" element={<SentMails />} />
          <Route path="/mails/Starred" element={<StarredMails />} />
          <Route path="/mails/Archive" element={<ArchiveMails />} />
          <Route
            path="/attachments/AllAttachments"
            element={<AllAttachments />}
          />
          <Route
            path="/attachments/MyAttachments"
            element={<MyAttachments />}
          />
          <Route path="/attachments/SharedWithMe" element={<SharedWithMe />} />
          <Route path="/attachments/Starred" element={<StarredAttachments />} />
          <Route path="/attachments/Archive" element={<ArchiveAttachments />} />
          <Route path="/casetracker/CaseTracker" element={<CaseTracker />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
