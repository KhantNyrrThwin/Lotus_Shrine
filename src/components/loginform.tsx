import {useForm} from 'react-hook-form'
import {DevTool} from '@hookform/devtools'

const loginform = () => {
    const form = useForm();
    const {register, control} = form;
    

    const onSubmit = (data: any) => {
        console.log(data)
    }

  return (
    <div className='mt-[25px]'>
        <form className='flex flex-col gap-4 items-center justify-center'>
            
            <input type="email" placeholder='အီးမေးလ်' {...register('email')} className='w-[451px] h-[57px] bg-[#ffffff] border border-[#4f3016] rounded-[9px] p-2' />
            <input type="password" placeholder='စကားဝှက်' {...register('password')} className='w-[451px] h-[57px] bg-[#ffffff] border border-[#4f3016] rounded-[9px] p-2' />
            <div className='w-full flex justify-end'>
            <button className='mr-[50px]'>စကားဝှက်မေ့နေပါသလား</button>
            </div>

            <button className='w-[251px] h-[57px] bg-[#4f3016] text-[#ffffff] rounded-[9px] '>အကောင့်ဝင်မည်</button>
            <button className=''>အကောင့်အသစ်ဖွင့်မည်</button>
        </form>
        <DevTool control={control} />
    </div>
  )
}

export default loginform