import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGlobalCtx } from "../context/global";

export default function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useGlobalCtx();

  const number = location?.state;
  const [otp, setOtp] = useState(["", "", "", ""]);
  const refs = [useRef(), useRef(), useRef(), useRef()];

  const handleOtpChange = (index, value) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;

    if (value !== "" && index < 3) {
      refs[index + 1].current.focus();
    }

    setOtp(updatedOtp);
  };

  useEffect(() => {

    if (!number) {
      return navigate("/")
    }
  },[navigate])

  const handleKeyPress = (index, e) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      refs[index - 1].current.focus();
    }
  };

  const handleVerify = () => {
    const pass = otp.join("");

    if (pass !== "5678") {
      alert("incorrect otp please enter right one");
      return;
    }
    login();
    navigate("/home");
  };

  useEffect(() => {
    if (refs[0].current) {
      refs[0].current.focus();
    }
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("otpVerified")) {
       navigate("/home");
    } else if (refs[0].current) {
      refs[0].current.focus();
    }
  }, [navigate]);



  return (
    <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-col items-start">
        <h2 className="font-medium text-primary text-[38px]">
          OTP Verification
        </h2>
        <p className="md:max-w-sm text-[12px] text-[#101920] py-2">
          We have sent an OTP to +91{number}. Please enter the code received to
          verify.
        </p>
      </div>
      <div className="flex flex-col md:space-y-6 mt-3">
        <div className="max-w-md flex justify-between ">
          {otp.map((value, index) => (
            <>
            <input
              key={index}
              value={value}
              ref={refs[index]}
              type="text"
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyPress(index, e)}
              className="border h-[77px] w-[74px] rounded-lg placeholder:text-[#D0D3D4] placeholder:text-xl text-center outline-none focus:outline-primary focus:border-none"
              />
              </>
          ))}
        </div>
        <button
          className="bg-primary text-white font-semibold py-2 rounded-lg text-lg"
          onClick={handleVerify}
        >
          Verify
        </button>
        <div className="text-center flex flex-col space-y-3">
        <span className="underline text-gray-400 cursor-pointer">Resend OTP</span>
        <span className="underline text-gray-400 cursor-pointer"
          onClick={() => navigate("/")}
        >use another number</span>
        </div>
      </div>
    </main>
  );
}
