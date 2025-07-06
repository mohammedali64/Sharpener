import React, { useState } from 'react'
import { firebaseApiKey } from '../Api keys/signup.env';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../Store/authSlice';

const AuthForm = () => {
    const [isLogin,setIsLogin] = useState(true);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleSubmit = async(event)=>{
        event.preventDefault();
        if(isLogin){
            console.log('Login');
            try{
                const data = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseApiKey}`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        email:email,
                        password:password,
                        returnSecureToken:true
                    })
                });
                const response = await data.json();
                console.log(response);
                if(response.error){
                    alert(response.error.message);
                    return;
                }
                console.log(response);
                localStorage.setItem('token',response.idToken);
                localStorage.setItem('userId',response.localId);
                localStorage.setItem('isLoggedIn',true);
                dispatch(login({isLoggedIn:false,token:response.idToken,userId:response.localId}));
                alert('Login Successful');
                navigate('/');
            }catch(err){
                console.log(err);
                alert(err);
            }
            setEmail('');
            setPassword('');
        }else{
            console.log('Register');
            if(password !== confirmPassword){
                alert('Passwords do not match');
                return;
            }
            try{
                const data = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseApiKey}`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        email:email,
                        password:password,
                        returnSecureToken:true
                    })
                });
                const response = await data.json();
                console.log(response);
                if(response.error){
                    alert(response.error.message);
                    return;
                }
                alert('Registered Successfully');
                setIsLogin(true);
                localStorage.setItem('token',response.idToken);
                navigate("/");
            }catch(error){
                console.log(error.message);
            }
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        }
    }
    const handleForgotPassword = ()=>{
        navigate("/forgotPassword");
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-600">
      <div className="bg-white p-6 rounded-md shadow-2xl w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {isLogin ? "Login" : "SignUp"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-3xl bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-3xl bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded-3xl bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              required
            />
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            {isLogin ? "Login" : "Sign up"}
          </button>
        </form>
        <div className='flex justify-center items-center pt-1'>
            <button className='cursor-pointer' type='button' onClick={handleForgotPassword}>Forgot Password</button>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Have an account?"}{" "}
            <button
              type="button"
              className="text-blue-600 hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
