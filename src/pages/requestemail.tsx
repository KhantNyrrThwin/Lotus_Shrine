  import { useForm } from 'react-hook-form';
  import { useState, useEffect } from 'react';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';
  import { motion } from "framer-motion"


type FormData = {
    name: string;
    email: string;
    age: number;
    password: string;
    confirm_password: string;
  };
  
  type PasswordStrength = 'very-weak' | 'weak' | 'medium' | 'strong' | '';

const RequestEmail = () => {
  const form = useForm<FormData>({ mode: 'onBlur' });
  const { register, control, handleSubmit, formState: { errors }, watch } = form;
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>('');
  const [strengthMessage, setStrengthMessage] = useState('');
  const navigate = useNavigate();

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
    
    if (data.password !== data.confirm_password) {
      setPasswordError('စကားဝှက်များ မတူညီပါ');
      return;
    }

    setLoading(true);
    
    try {
      const { confirm_password, ...userData } = data;      
      const response = await axios.post(
        'http://localhost/lotus_shrine/register.php',
        JSON.stringify(userData),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        }
      );

      if (response.data.success) {
        // Redirect to login page on success
        navigate('/login', { state: { fromSignup: true } });
      } else {
        setPasswordError(response.data.message || 'မှတ်ပုံတင်ရာတွင် အမှားအယွင်းရှိပါသည်');
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

  return(
    <>
    <motion.div
     initial={{ opacity: 0 }}
     animate={{ opacity: 1, y: 0 }}
     exit={{ opacity: 0, y: -20 }}
     transition={{ duration: 1 }}
    >
     <div className="flex bg-[url('./assets/forgot_password.png')] w-full h-screen items-center justify-center 2xl:h-[800px]">
        <div className="w-[489px] h-[446px] bg-[#E2E2E2B3] rounded-2xl flex flex-col justify-center">
        <h2 className="ml-5 mt-5 mb-10 text-[20px] font-extrabold text-[#40320D]">အကောင့်ဖွင့်ထားသည့် Email အား ရိုက်ပါ</h2>
        <form 
    onSubmit={handleSubmit(onSubmit)}
    className='flex flex-col gap-2 items-center justify-center'
    noValidate
  >
   

    {/* Password Fields */}
    
    <input 
      type="password" 
      placeholder='Email' 
      {...register('password', { 
        required: 'Emailလိုအပ်ပါသည်',
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

   

    {/* Submit Button */}
    <a href="/forgotpassword" className='mt-2 hover:underline cursor-pointer'>
    <button 
      disabled={loading}
      className={`w-[251px] cursor-pointer h-[57px] bg-[#4f3016] text-white rounded-[9px] hover:bg-[#3a2411] mt-4 ${
        loading ? 'opacity-70 cursor-not-allowed' : ''
      }`}
    >
      {loading ? 'လုပ်ဆောင်နေသည်...' : 'Varification Code တောင်းခံမည်'}
    </button>
    </a>
    
    <a href="/login" className='mt-2 hover:underline cursor-pointer'>
      စကားဝှက်မပြောင်းတော့ပါ
    </a>
    <a href="/forgotpassword" className='mt-2 hover:underline cursor-pointer'>
      For Test onlt Code ရိုက်ဖို့ Page အတွက်ပါ ကိုပိုင် (ပြီးရင် Delete လုပ်ပါ)
    </a>
  </form>
    
        </div>
    </div>
    </motion.div>
    </>
)
};

export default RequestEmail;