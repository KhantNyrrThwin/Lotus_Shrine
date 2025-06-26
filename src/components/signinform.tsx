import {useForm} from 'react-hook-form'
import {DevTool} from '@hookform/devtools'

const signinform = () => {
    const form = useForm();
    const {register, control} = form;
    

    const onSubmit = (data: any) => {
        console.log(data)
    }

  return (
    <div className='mt-[15px]'>
        <form className='flex flex-col gap-2 items-center justify-center'>
            <div className='flex flex-col items-start w-full px-11'>
            <label htmlFor="email" className='text-[#4f3016] text-left text-[16px] font-bold'>အီးမေးလ်ရိုက်ထည့်ပါ </label>
            </div>
            <input type="email" placeholder='အီးမေးလ်' {...register('email')} className='w-[451px] h-[57px] bg-[#ffffff] border border-[#4f3016] rounded-[9px] p-2' />
            <div className='flex flex-row items-start w-full px-11'>
            <div className='flex flex-col items-start w-full gap-2'>
            <div className='flex flex-col items-start w-full'>
            <label htmlFor="name" className='text-[#4f3016] text-left text-[16px] font-bold'>အသုံးပြုသူအမည် </label>
            </div>
            <input type="name" placeholder='အသုံးပြုသူအမည်' {...register('name')} className='w-[216px] h-[57px] bg-[#ffffff] border border-[#4f3016] rounded-[9px] p-2' />
           
            </div>
            <div className='flex flex-col items-start w-full gap-2'>
            <div className='flex flex-col items-start w-full'>
            <label htmlFor="age" className='text-[#4f3016] text-left text-[16px] font-bold'>အသက် </label>
            </div>
            <input type="number" placeholder='အသက်' {...register('age')} className='w-[216px] h-[57px] bg-[#ffffff] border border-[#4f3016] rounded-[9px] p-2' />
           
            </div>
            <div>

            </div>
            </div>
            
            


            <div className='flex flex-col items-start w-full px-11'>
            <label htmlFor="password" className='text-[#4f3016] text-[16px] font-bold'>စကားဝှက်ရိုက်ထည့်ပါ</label>
            </div>
            <input type="password" placeholder='စကားဝှက်' {...register('password')} className='w-[451px] h-[57px] bg-[#ffffff] border border-[#4f3016] rounded-[9px] p-2' />
            <div className='flex flex-col items-start w-full px-11'>
            <label htmlFor="password" className='text-[#4f3016] text-[16px] font-bold'>စကားဝှက်အတည်ပြုပါ</label>
            </div>
            <input type="password" placeholder='စကားဝှက်အတည်ပြုရန်' {...register('confirm_password')} className='w-[451px] h-[57px] bg-[#ffffff] border border-[#4f3016] rounded-[9px] p-2' />
            
            <div className='w-full flex justify-end'>
            
         
            
            </div>

            <button className='w-[251px] cursor-pointer h-[57px] bg-[#4f3016] text-[#ffffff] rounded-[9px] hover:bg-[#3a2411] hover:text-extrabold'>အကောင့်ဖွင့်မည်</button>
            <a href="/login">
            <label className='hover:underline cursor-pointer'>အကောင့်ဝင်ရန်</label>
            </a>
        </form>
        <DevTool control={control} />
    </div>
  )
}

export default signinform