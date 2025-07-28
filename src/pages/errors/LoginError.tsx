import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginError: React.FC = () => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState<number>(5);

  useEffect(() => {
    
    setTimeout(()=>{
      navigate("/login")
    },5000);

    const interval = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, navigate]);


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

          {/* Card */}
          <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl px-6 sm:px-8 pb-6 pt-4 max-w-md border border-white/20">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-xs text-slate-500 font-poppins font-medium">Login Error</div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 via-blue-400 to-sky-300 rounded-full"></div>
                  <div>
                    <div className="h-3 bg-slate-200 rounded w-20"></div>
                    <div className="h-2 bg-slate-200/50 rounded w-16 mt-1"></div>
                  </div>
                </div>
                <div className="bg-rose-100 text-rose-700 w-fit py-3 px-4 rounded-2xl font-poppins rounded-bl-sm ">
                 Oops! Trouble logging you in. Give it another shot.
                </div>
                <p className="mt-4 text-[10px] sm:text-xs text-center font-poppins text-slate-500">
                  Redirecting you to login page in {seconds}s
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginError;
