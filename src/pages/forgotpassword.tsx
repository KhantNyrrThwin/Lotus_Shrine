import { useState, useEffect } from "react"
import React from "react"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "../components/ui/input-otp"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import axios from 'axios';

export default function ForgotPassword() {
    const [otp, setValue] = React.useState("")
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [resendSuccess, setResendSuccess] = useState(false);
    const [resendError, setResendError] = useState("");
    const [rateLimitExceeded, setRateLimitExceeded] = useState(false);
    const [rateLimitMessage, setRateLimitMessage] = useState("");
    const [verificationError, setVerificationError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedEmail = localStorage.getItem('userEmail');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    const handleResend = async () => {
        setResendLoading(true);
        setResendSuccess(false);
        setResendError("");
        setRateLimitExceeded(false);
        setVerificationError("");
        
        try {
            const response = await axios.post(
                'http://localhost/lotus_shrine/checkEmail.php',
                JSON.stringify({ email }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            if (response.data.success) {
                setResendSuccess(true);
                setTimeout(() => setResendSuccess(false), 5000);
            } else {
                if (response.status === 429) {
                    setRateLimitExceeded(true);
                    setRateLimitMessage(response.data.message);
                } else {
                    setResendError(response.data.message || 'OTP ပြန်ပို့ရာတွင် ပြဿနာရှိပါသည်');
                }
            }
        } catch (err: any) {
            if (err.response?.status === 429) {
                setRateLimitExceeded(true);
                setRateLimitMessage(err.response.data.message);
            } else {
                setResendError(err.response?.data?.message || 'ဆာဗာနှင့် ချိတ်ဆက်မရပါ');
            }
        } finally {
            setResendLoading(false);
        }
    }

    const verifyOtp = async () => {
        if (otp.length !== 6) {
            setVerificationError('OTP ကုဒ် ၆ လုံး ဖြည့်ရန်လိုအပ်ပါသည်');
            return;
        }

        setLoading(true);
        setVerificationError("");
        setResendError("");
        
        try {
            const response = await axios.post(
                'http://localhost/lotus_shrine/verifyOTP.php',
                JSON.stringify({ email, otp }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            if (response.data.success) {
                // Store verification token for password change
                localStorage.setItem('resetToken', response.data.token || 'verified');
                navigate('/changepassword');
            } else {
                setVerificationError(response.data.message || 'OTP ကုဒ် မှားယွင်းနေပါသည်');
            }
        } catch (err: any) {
            setVerificationError(err.response?.data?.message || 'ဆာဗာနှင့် ချိတ်ဆက်မရပါ');
        } finally {
            setLoading(false);
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
        >
            <div className="flex bg-[url('./assets/forgot_password.png')] w-full h-screen items-center justify-center 2xl:h-[800px]">
                <div className="w-[489px] h-[446px] bg-[#E2E2E2B3] rounded-2xl flex flex-col justify-center">
                    <h2 className="ml-5 mt-5 text-[20px] font-extrabold text-[#40320D]">စကားဝှက်မေ့သွားပါသည်</h2>
                    <p className="ml-5 mt-5 text-[18px] font-bold text-[#40320D]">
                        စကားဝှက်  ပြန်လည်သတ်မှတ်ရန် သင်၏ Email <br />
                        <span className="text-[20px] font-extrabold underline">{email}</span> အား message ပို့ထားပါသည်
                    </p>
                    
                    <div className="flex flex-col mt-3 justify-center items-center space-y-2">
                        <InputOTP
                            maxLength={6}
                            value={otp}
                            onChange={(value) => {
                                setValue(value);
                                setVerificationError("");
                            }}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                        
                        {verificationError && (
                            <p className="text-red-500 text-sm mt-1">
                                {verificationError}
                            </p>
                        )}
                    </div>
                    
                    <div className='w-full flex flex-col items-end mt-2'>
                        <button 
                            onClick={handleResend}
                            disabled={resendLoading || rateLimitExceeded}
                            className={`mr-[50px] text-[14px] font-bold ${
                                rateLimitExceeded ? 'text-gray-400 cursor-not-allowed' : 'text-[#40320D] hover:underline'
                            } ${resendLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {resendLoading ? 'လုပ်ဆောင်နေသည်...' : 'message ပြန်ပို့ပေးပါ'}
                        </button>
                        
                        {resendSuccess && (
                            <p className="mr-[50px] text-green-500 text-sm mt-1">
                                OTP ကုဒ်အသစ်ကို သင့်အီးမေးလ်သို့ ပို့ပြီးပါပြီ!
                            </p>
                        )}
                        
                        {resendError && (
                            <p className="mr-[50px] text-red-500 text-sm mt-1">
                                {resendError}
                            </p>
                        )}
                        
                        {rateLimitExceeded && (
                            <p className="mr-[50px] text-red-500 text-sm mt-1">
                                {rateLimitMessage}
                            </p>
                        )}
                    </div>
                    
                    <div className="flex flex-col mt-3 justify-center items-center space-y-2 h-[100px]">
                        <button
                            onClick={verifyOtp}
                            disabled={loading}
                            className={`w-[150px] h-[40px] text-[14px] font-bold bg-[#4f3016] text-[#ffffff] rounded-[9px] hover:bg-[#3a2411] hover:text-extrabold ${
                                loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
                            }`}
                        >
                            {loading ? 'စစ်ဆေးနေသည်...' : 'ရှေ့ဆက်မည်'}
                        </button>
                        
                        <Link to="/login" className='hover:underline text-[14px] font-bold text-[#40320D]'>
                            စကားဝှက်သိပြီ
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}