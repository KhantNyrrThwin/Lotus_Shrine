import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"

type FormData = {
  email: string;
};

const RequestEmail = () => {
  const form = useForm<FormData>({ mode: 'onBlur' });
  const { register, handleSubmit, formState: { errors } } = form;
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    setErrorMessage('');
    setLoading(true);
    console.log(data)
    try {
      const response = await axios.post(
        'http://localhost/lotus_shrine/checkEmail.php',
        JSON.stringify(data),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      if (response.data.success) {
        localStorage.setItem('userEmail', data.email);
        navigate('/forgotpassword', { state: { email: data.email } });
      } else {
        setErrorMessage('ဤ အီးမေးလ် ဖြင့်အကောင့်မရှိပါ');
      }
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || 'ဆာဗာနှင့် ချိတ်ဆက်မရပါ');
    } finally {
      setLoading(false);
    }
  }

  return(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 1 }}
    >
      <div className="flex bg-[url('./assets/forgot_password.png')] w-full h-screen items-center justify-center 2xl:h-[800px]">
        <div className="w-[489px] h-[446px] bg-[#E2E2E2B3] rounded-2xl flex flex-col justify-center">
          <h2 className="ml-5 mt-5 mb-10 text-[20px] font-extrabold text-[#40320D]">
            အကောင့်ဖွင့်ထားသည့် အီးမေးလ် အား ရိုက်ပါ
          </h2>
          
          <form 
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-2 items-center justify-center'
            noValidate
          >
            <input 
              type="email" 
              placeholder='Email' 
              {...register('email', { 
                required: 'အီးမေးလ်လိုအပ်ပါသည်',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'မှားယွင်းနေသော အီးမေးလ် ပုံစံ'
                }
              })} 
              className='w-[451px] h-[57px] bg-[#ffffff] border border-[#4f3016] rounded-[9px] p-2' 
            />
            {errors.email && (
              <p className="text-red-500 text-sm -mt-2 self-start ml-11">
                {errors.email.message}
              </p>
            )}
            
            {errorMessage && (
              <p className="text-red-500 text-sm -mt-2 self-start ml-11">
                {errorMessage}
              </p>
            )}

            <button 
              disabled={loading}
              className={`w-[251px] cursor-pointer h-[57px] bg-[#4f3016] text-white rounded-[9px] hover:bg-[#3a2411] mt-4 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'လုပ်ဆောင်နေသည်...' : 'Varification Code တောင်းခံမည်'}
            </button>
            
            <a href="/login" className='mt-2 hover:underline cursor-pointer'>
              စကားဝှက်မပြောင်းတော့ပါ
            </a>
          </form>
        </div>
      </div>
    </motion.div>
  )
};

export default RequestEmail;