import React, {useState} from 'react';

import tiktokVideo from '../assets/videos/share.mp4';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

function LoginPage() {
  const [signInWindow, setSignInWindow] = useState(false);
  const [signUpWindow, setSignUpWindow] = useState(false);

  const handleSignInWindow = () =>{
    setSignInWindow(!signInWindow);
  }

  const handleSignUpWindow = () =>{
    setSignUpWindow(!signUpWindow);
  }

  return (
    <section className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video
        src={tiktokVideo}
        type='video/mp4'
        loop
        controls={false}
        muted
        autoPlay
        className='w-full h-full object-cover'
        />
        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
          <div className='shadow-2xl w-auto h-auto flex flex-row gap-8'>
            <button className='border bg-white px-4 py-2 rounded-3xl' onClick={handleSignInWindow}>Zaloguj się</button>
            <button className='border bg-white px-4 py-2 rounded-3xl' onClick={handleSignUpWindow}>Zarejestruj się</button>
          </div>
        </div>
        {signInWindow ? <SignIn signInWindow={signInWindow} setSignInWindow={setSignInWindow} /> : ''}
        {signUpWindow ? <SignUp signUpWindow={signUpWindow} setSignUpWindow={setSignUpWindow} /> : ''}
      </div>
    </section>
  )
}

export default LoginPage