import React, { useRef } from 'react';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import useSignInWithEmailAndPassword from '../hooks/useSignInWithEmailAndPassword';
import useSignInWithGoogle from '../hooks/useSignInWithGoogle';
import Loader from '../components/Loader'

function SignIn({signInWindow, setSignInWindow}) {
    const handleCloseWindow = () =>{
        setSignInWindow(!signInWindow);
    }

    const email = useRef();
    const password = useRef();
    const {isLoadingEAP, handleSignIn} = useSignInWithEmailAndPassword(email, password);
    const {isLoadingG, handleSignInWithGoogle} = useSignInWithGoogle();

  return (
    <div className='absolute top-0 left-0 z-10 w-full h-screen bg-transparent flex items-center justify-center'>
        <div className='relative w-1/2 xsm:w-full sm:w-full h-4/6 bg-white rounded-xl'>
            
            <button onClick={handleCloseWindow} className='absolute top-4 left-4'><AiOutlineCloseCircle fontSize={30}/></button>
            <div className='mt-16 flex flex-col gap-4 items-center'>
                <p className='font-bold text-xl'>Sign In with Your Email</p>
                <input type='text' name='email' placeholder='Email' ref={email} className='w-4/5 h-10 border px-4'/>
                <input type='password' name='password' placeholder='Password' ref={password} className='w-4/5 h-10 border px-4'/>
                <button onClick={handleSignIn} className='px-4 py-2 border shadow flex gap-2'>
                   Sign In {isLoadingEAP && <Loader color='white' secondaryColor='#fe2c55' width='w-auto' height='h-auto' size='20'/>}
                </button>
                <div className='w-4/5 flex items-center'>
                    <div className='w-full h-px border'></div>
                    <p> Or </p>
                    <div className='w-full h-px border'></div>
                </div>
                <button onClick={handleSignInWithGoogle} className='px-4 py-2 border shadow flex gap-2'>
                    Sign In with Google {isLoadingG && <Loader/>}
                </button>
            </div>
        </div>
    </div>
  )
}

export default SignIn