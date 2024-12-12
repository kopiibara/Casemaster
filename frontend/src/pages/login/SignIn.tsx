import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

const SignIn = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/profile-setup");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex items-center justify-center flex-col text-center">
        <img
          src="/sign-in-logo-blue.png"
          alt="Sign-In Logo"
          style={{ width: "60px", height: "auto" }}
        />
        <p className="text-[6rem] font-bold text-[#0f2043]">CaseMaster</p>
        <p className="text-4xl text-[#0f2043]">
          Your go-to Legal Workflow Manager
        </p>
        <p className="text-l text-[rgba(15,32,67,0.3)] my-7">
          Putting ease in all your legal workflow—all in one place.
        </p>
        <Button
          onClick={handleSignIn}
          variant="contained"
          sx={{
            backgroundColor: "#0f2043",
            color: "white",
            width: "16rem",
            height: "2.5rem",
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: "medium",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#0c1833", // Darker shade for hover
              boxShadow: "none",
            },
          }}
        >
          <Box
            component="img"
            src="/microsoft-logo.png" // Replace with the actual path to your Microsoft logo
            alt="Microsoft Logo"
            sx={{
              width: "1rem",
              height: "1rem",
              objectFit: "contain",
            }}
          />
          Sign In With Microsoft
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
