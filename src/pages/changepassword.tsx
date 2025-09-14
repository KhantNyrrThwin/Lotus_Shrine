
import { Link} from "react-router-dom"
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"

type FormData = {
    password: string;
    confirm_password: string;
};

type PasswordStrength = 'very-weak' | 'weak' | 'medium' | 'strong' | '';

const ChangePassword = () => {
    const form = useForm<FormData>({ mode: 'onBlur' });
    const { register, handleSubmit, formState: { errors }, watch } = form;
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>('');
    const [strengthMessage, setStrengthMessage] = useState('');
    const navigate = useNavigate();

    // Get email from localStorage
    const email = localStorage.getItem('userEmail') || '';
    const resetToken = localStorage.getItem('resetToken') || '';

    // Watch password changes
    const password = watch('password');
    
    useEffect(() => {
        if (!password) {
            setPasswordStrength('');
            setStrengthMessage('');
            return;
        }

        // Check password strength
        const hasLower = /[a-z]/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasDigit = /[0-9]/.test(password);
        const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
        const length = password.length;

        let strength: PasswordStrength = 'very-weak';
        let message = '';

        if (length < 8) {
            message = 'အားနည်းလွန်းနေပါသည် (အနည်းဆုံး ၈ လုံးလိုအပ်ပါသည်)';
            strength = 'very-weak';
        } else if (!(hasLower && hasUpper && hasDigit && hasSpecial)) {
            message = 'အားနည်းနေပါသေးသည် - အင်္ဂလက္ခရာကြီး၊ အက္ခရာသေး၊ ဂဏန်းနှင့် သင်္ကေတများ ပေါင်းစပ်ထည့်သွင်းပါ';
            strength = 'weak';
        } else {
            message = 'စကားဝှက်အားကောင်းပါသည်';
            strength = 'strong';
        }


        setPasswordStrength(strength);
        setStrengthMessage(message);
    }, [password]);

    const onSubmit = async (data: FormData) => {
        setPasswordError('');
        
        // Check if passwords match
        if (data.password !== data.confirm_password) {
            setPasswordError('စကားဝှက်များ မတူညီပါ');
            return;
        }

        // Check if we have the required data
        if (!email || !resetToken) {
            setPasswordError('အချက်အလက်များ မပြည့်စုံပါ');
            return;
        }

        setLoading(true);
        
        try {
            const response = await axios.post(
                'http://localhost/lotus_shrine/updatePassword.php',
                JSON.stringify({
                    email,
                    newPassword: data.password,
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                }
            );

            if (response.data.success) {
                // Clear reset data
                localStorage.removeItem('userEmail');
                localStorage.removeItem('resetToken');
                // Redirect to login page with success message
                navigate('/login', { state: { fromReset: true } });
            } else {
                setPasswordError(response.data.message || 'စကားဝှက်ပြောင်းရာတွင် အမှားအယွင်းရှိပါသည်');
            }
        } catch (err: any) {
            setPasswordError(err.response?.data?.message || 'ဆာဗာနှင့် ချိတ်ဆက်မရပါ');
        } finally {
            setLoading(false);
        }
    }

    const getStrengthColor = () => {
        switch (passwordStrength) {
            case 'very-weak': return 'text-red-500';
            case 'weak': return 'text-orange-500';
            case 'strong': return 'text-green-600';
            default: return 'text-gray-500';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
        >
            <div className="flex bg-[url('./assets/forgot_password.png')] w-full h-screen items-center justify-center bg-cover ">
                <div className="w-[489px] h-[446px] bg-[#E2E2E2B3] rounded-2xl flex flex-col justify-center">
                    <h2 className="ml-5 mt-5 text-[20px] font-extrabold text-[#40320D]">စကားဝှက် ပြန်လည်သတ်မှတ်မည်</h2>
                    
                    <form 
                        onSubmit={handleSubmit(onSubmit)}
                        className='flex flex-col gap-2 items-center justify-center'
                        noValidate
                    >
                        {/* Password Field */}
                        <div className='flex flex-col items-start w-full px-5 mt-5'>
                            <label htmlFor="password" className='text-[#4f3016] text-[16px] font-bold'>
                                စကားဝှက်အသစ်ရိုက်ထည့်ပါ
                            </label>
                        </div>
                        <input 
                            type="password" 
                            placeholder='စကားဝှက်' 
                            {...register('password', { 
                                required: 'စကားဝှက်လိုအပ်ပါသည်',
                                minLength: {
                                    value: 8,
                                    message: 'အနည်းဆုံး ၈ လုံးရှိရပါမည်'
                                },
                            })} 
                            className='w-[451px] h-[57px] bg-[#ffffff] border border-[#4f3016] rounded-[9px] p-2' 
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm -mt-2 self-start ml-11">
                                {errors.password.message}
                            </p>
                        )}
                        
                        {/* Password Strength Indicator */}
                        {password && !errors.password && (
                            <p className={`text-sm -mt-2 self-start ml-11 ${getStrengthColor()}`}>
                                {strengthMessage}
                            </p>
                        )}

                        {/* Confirm Password Field */}
                        <div className='flex flex-col items-start w-full px-5 mt-2'>
                            <label htmlFor="password" className='text-[#4f3016] text-[16px] font-bold'>
                                စကားဝှက်အတည်ပြုပါ
                            </label>
                        </div>
                        <input 
                            type="password" 
                            placeholder='စကားဝှက်အတည်ပြုရန်' 
                            {...register('confirm_password', { 
                                required: 'စကားဝှက်အတည်ပြုရန်လိုအပ်ပါသည်'
                            })} 
                            className='w-[451px] h-[57px] bg-[#ffffff] border border-[#4f3016] rounded-[9px] p-2' 
                        />
                        {passwordError && (
                            <p className="text-red-500 text-sm -mt-2 self-start ml-11">
                                {passwordError}
                            </p>
                        )}

                        {/* Submit Button */}
                        <button 
                            type='submit' 
                            disabled={loading}
                            className={`w-[251px] cursor-pointer h-[57px] bg-[#4f3016] text-white rounded-[9px] hover:bg-[#3a2411] mt-4 ${
                                loading ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                        >
                            {loading ? 'လုပ်ဆောင်နေသည်...' : 'စကားဝှက်ပြောင်းမည်'}
                        </button>
                        
                        <Link to="/login" className='mt-2 hover:underline cursor-pointer text-[14px] font-bold text-[#40320D]'>
                            စကားဝှက်မပြောင်းတော့ပါ
                        </Link>
                    </form>
                </div>
            </div>
        </motion.div>
    )
};

export default ChangePassword;
