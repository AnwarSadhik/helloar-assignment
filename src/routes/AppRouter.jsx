import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "../pages/SignIn";
import VerifyOtp from "../pages/VerifyOtp";
import Home from "../pages/Home";

export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/verify-otp" element={<VerifyOtp />} />

                
                <Route path="/home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}