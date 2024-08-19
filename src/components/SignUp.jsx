import React, {useRef} from 'react'
import {AiOutlineCloseCircle} from 'react-icons/ai';
import useSignUpWithEmailAndPassword from '../hooks/useSignUpWithEmailAndPassword';
import useSignUpWithGoogle from '../hooks/useSignUpWithGoogle';
import Loader from './Loader';


function SignUp({signUpWindow, setSignUpWindow}) {
    
    const handleCloseWindow = () =>{
        setSignUpWindow(!signUpWindow);
    }
    const email = useRef();
    const password = useRef();

    const {isLoadingEmailPassword, isRegistered,  handleSignUp} = useSignUpWithEmailAndPassword(email, password);
    const {isLoadingGoogle, isRegisteredWithGoogle, handleSignUpWithGoogle} = useSignUpWithGoogle()

  return (
    <div className='absolute top-0 left-0 z-10 w-full h-screen bg-transparent flex items-center justify-center'>
        <div className='relative w-1/2 xsm:w-full sm:w-full sm:h-screen xsm:h-screen  h-4/6 bg-white rounded-xl'>
            
            <button onClick={handleCloseWindow} className='absolute top-4 left-4'><AiOutlineCloseCircle fontSize={30}/></button>
            <div className='mt-16 flex flex-col gap-4 items-center'>
                <p className='font-bold text-xl'>Sign Up with Your Email</p>
                <input type='text' name='email' placeholder='Email' ref={email} className='w-4/5 h-10 border px-4'/>
                <input type='password' name='password' placeholder='Password' ref={password} className='w-4/5 h-10 border px-4'/>
                <button onClick={handleSignUp} className='px-4 py-2 border shadow flex gap-2'>
                    Sign Up {isLoadingEmailPassword && <Loader color='white' secondaryColor='#fe2c55' width='w-10' height='h-auto' size='20'/>}
                </button>
                {isRegistered && <p className='text-green-500'>Registration completed successfully. Log in to your account</p>}
                <div className='w-4/5 flex items-center'>
                    <div className='w-full h-px border'></div>
                    <p> Or </p>
                    <div className='w-full h-px border'></div>
                </div>
                <button onClick={handleSignUpWithGoogle} className='px-4 py-2 border shadow flex gap-2'>
                    Sign Up with Google {isLoadingGoogle && <Loader color='white' secondaryColor='#fe2c55' width='w-10' height='h-auto' size='20'/>}
                </button>
                {isRegisteredWithGoogle && <p className='text-green-500'>Registration with Google account completed successfully. Log in to your account</p>}
            </div>
        </div>
       
    </div>
  )
}

export default SignUp