import React, { useEffect, useState } from "react";
import india from "../assets/india-icon.png";
import downArr from "../assets/down-arrow.png";
import { useNavigate, Navigate } from "react-router-dom";
import { useGlobalCtx } from "../context/global";

export default function SignIn() {
  const [number, setNumber] = useState();
  const navigate = useNavigate();
  const auth = sessionStorage?.getItem("otpVerified");

  const handlePhoneNoChange = (e) => {
    setNumber(e.target.value);
  };

  const handleSubmit = () => {
    if (number?.length === 10 && !isNaN(number)) {
      navigate("/verify-otp", { state: number });
    } else {
      alert("Please enter a valid number");
    }
  };

  useEffect(() => {
    if (auth) {
      navigate("/home");
    }
  }, [auth]);

  // console.log(number);
  return (
    <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-col space-y-2 items-start">
        <h2 className="font-medium text-primary text-[38px]">Sign In</h2>
        <p className="md:max-w-sm text-[12px] text-[#101920]">
          Please enter your mobile number to login. we will send an OTP to
          verify your number
        </p>
      </div>
      <div className="max-w-full flex flex-col space-y-5 mt-3">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <img src={india} alt="India Flag" className="h-4" />
            <img src={downArr} alt="Down Arrow" className="pl-1" />
            <span className="ml-2">+91</span>
          </span>
          <input
            type="text"
            name="number"
            value={number}
            id="number"
            placeholder="Phone number"
            onChange={handlePhoneNoChange}
            className="w-full border py-3 rounded-lg pl-[24%] placeholder:text-[#D0D3D4] placeholder:text-lg outline-none focus:outline-primary focus:border-none"
          />
        </div>
        <button
          className="bg-primary text-white font-semibold py-2 rounded-lg text-lg"
          onClick={handleSubmit}
        >
          Sign In
        </button>
      </div>
    </main>
  );
}
