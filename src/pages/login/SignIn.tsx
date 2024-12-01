import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/dashboard/dashboard");
  };

  return (
    <div className="text-[#0F2043] flex justify-center items-center flex-col min-h-screen gap-2">
      <h1 className="text-3xl font-bold">Sign In</h1>
      <p>Sign in to your account to continue</p>
      <button
        className="bg-white text-[#0F2043] border border-[#0F2043] rounded-md px-3 py-1 shadow-sm hover:bg-[#0F2043] hover:text-white cursor-pointer"
        onClick={handleSignIn}
      >
        Sign In
      </button>
    </div>
  );
};

export default SignIn;
