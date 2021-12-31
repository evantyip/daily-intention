import React from 'react';
import { signIn } from 'next-auth/react';

const Login = () => {
  return (
    <div className="navbar mb-2 shadow-lg bg-base-200 text-neutral rounded-box">
      <div className="flex-1 px-2 mx-2">
        <span className="text-lg font-bold">Intent</span>
      </div>
      <div className="flex-none">
        <button onClick={() => signIn()} className="btn btn-ghost">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;
