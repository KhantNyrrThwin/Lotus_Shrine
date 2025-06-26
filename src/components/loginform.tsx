import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

type FormData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const form = useForm<FormData>();
  const { register, control, handleSubmit } = form;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError('');
    console.log(data);
    try {
      const response = await axios.post(
        'http://localhost/lotus_shrine/checkLogin.php',
        JSON.stringify(data),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        }
      );
     console.log('Full response:', response);
     console.log('Response data:', response.data);
     localStorage.setItem('userName', response.data.name);
      if (response.data?.success) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', data.email);
      navigate('/');
    } else {
      setError(response.data?.message || 'Invalid email or password');
    }
  } catch (err: any) {
    console.error('Full error:', err);
    console.error('Error response:', err.response);
    
    setError(
      err.response?.data?.message || 
      err.message || 
      'Server connection failed'
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className='mt-[25px]'>
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-4 items-center justify-center'
      >
        <input 
          type="email" 
          placeholder='အီးမေးလ်' 
          {...register('email', { required: true })}
          className='w-[451px] h-[57px] bg-[#ffffff] border border-[#4f3016] rounded-[9px] p-2' 
        />
        
        <input 
          type="password" 
          placeholder='စကားဝှက်' 
          {...register('password', { required: true })}
          className='w-[451px] h-[57px] bg-[#ffffff] border border-[#4f3016] rounded-[9px] p-2' 
        />
        
        <div className='w-full flex justify-end'>
          <Link to="/forgot-password" className='mr-[50px] hover:underline'>
        စကားဝှက်မေ့နေပါသလား
        </Link>
        </div>

        <button 
          type='submit' 
          disabled={loading}
          className={`w-[251px] h-[57px] bg-[#4f3016] text-[#ffffff] rounded-[9px] hover:bg-[#3a2411] ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'လုပ်ဆောင်နေသည်...' : 'အကောင့်ဝင်မည်'}
        </button>
        
        <Link to="/signin" className='hover:underline'>
      အကောင့်အသစ်ဖွင့်မည်
        </Link>
      </form>
      
      {error && (
        <div className="mt-4 text-center">
          <p className="text-red-500 font-medium">{error}</p>
        </div>
      )}
      
      <DevTool control={control} />
    </div>
  )
}

export default LoginForm;