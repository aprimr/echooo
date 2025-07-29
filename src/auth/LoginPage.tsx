import { NavLink, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { RxCross2 } from "react-icons/rx";
import useAuthStore from "../store/auth";
import { useEffect } from "react";
import Loading from "../components/Loading";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  useEffect(() => {
    if (!loading && user) {
      console.log("User already authenticated.");
      navigate("/app/home");
    }
  }, [user, loading, navigate]);

  const handleLogin = () => {
    login();
  };

  if (loading)
    return (
      <Loading
        chatMessage="Authenticating with Google..."
        message="Let us setup your echooo account real quick"
      />
    );

  return (
    <div className="h-screen w-full flex justify-center items-center relative overflow-hidden px-4">
      {/* Bg image */}
      <img
        src="https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/wac.92a80da2.svg"
        alt="background"
        className="absolute right-0 top-0 h-full w-full object-cover z-0"
      />

      <div className="flex justify-center lg:justify-end">
        <div className="relative">
          {/* Gradient Blur Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 rounded-3xl blur-3xl opacity-30 transform rotate-6 scale-105"></div>

          {/* Login Card */}
          <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl px-6 sm:px-8 pb-6 pt-4 max-w-md border border-white/20">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div
                    onClick={() => navigate("/")}
                    className="relative w-3 h-3 bg-red-500 flex justify-center items-center rounded-full hover:scale-110 group transition-all duration-300 cursor-default"
                  >
                    <RxCross2
                      size={10}
                      className="text-white hidden group-hover:flex"
                    />
                  </div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-xs text-slate-500 font-poppins font-medium">
                  Login
                </div>
              </div>

              {/* Chat */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 rounded-full"></div>
                  <div>
                    <div className="h-3 bg-slate-200 rounded w-20"></div>
                    <div className="h-2 bg-slate-200/50 rounded w-16 mt-1"></div>
                  </div>
                </div>
                <div className="bg-slate-200 w-fit py-3 px-4 rounded-2xl font-poppins rounded-bl-sm ">
                  Hey👋! How can I join{" "}
                  <span className="font-semibold text-blue-500">echooo...</span>{" "}
                  ?
                </div>
                <div className="flex items-center justify-end space-x-3">
                  <div>
                    <div className="h-3 bg-slate-200 rounded w-24"></div>
                    <div className="h-2 bg-slate-200/50 rounded w-20 mt-1"></div>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 via-emerald-400 to-emerald-300 rounded-full"></div>
                </div>
                <div className="bg-blue-500 text-white py-3 px-4 rounded-2xl rounded-br-sm w-fit font-poppins ml-auto">
                  It's simple. Just click the button below.
                </div>
              </div>

              {/* Login with Google */}
              <div className="pt-4">
                <button
                  onClick={handleLogin}
                  className="w-full flex items-center justify-center space-x-3 border border-slate-300 rounded-lg py-2.5 px-4 bg-white text-slate-700 hover:bg-blue-50 transition cursor-pointer"
                >
                  <FcGoogle className="w-6 h-6" />
                  <span className="text-sm font-medium">
                    Continue with Google
                  </span>
                </button>
                <p className="mt-4 text-[10px] text-center font-poppins text-slate-500">
                  By continuing, you agree to our{" "}
                  <NavLink to="/terms&privacy" className="text-blue-500">
                    Terms & Privacy Policy
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
