import React, { useState } from 'react'
import useSignIn from '../Hooks/useSignIn';
import useSignUp from '../Hooks/useSignUp';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error,setError] = useState('');
  const {login} = useSignIn();
  const {signUp} = useSignUp();

  const handleLoginSubmit = async (e) => {
  e.preventDefault();
    try {
        const result = await login(loginEmail, loginPassword);
        console.log('Login successful:', result);
        setError('');
    } catch (error) {
        setError(error.message);
        setTimeout(() => setError(''), 3000);
    }
  };

  const handleSignupSubmit = async(e) => {
    e.preventDefault();
    try{
        if (signupPassword !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        const result = await signUp(signupEmail,signupPassword);
        console.log('Login successful:', result);
        setError('');
        
    }catch(error){
        setError(error.message);
        setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 transition-all duration-500">
        <div className="flex justify-center mb-8">
          <div className="bg-white/20 rounded-full p-1 flex gap-2">
            <button
              onClick={() => setIsLogin(true)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-500 ${
                isLogin ? 'bg-white text-indigo-600 shadow-md' : 'text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-500 ${
                !isLogin ? 'bg-white text-indigo-600 shadow-md' : 'text-white'
              }`}
            >
              Signup
            </button>
          </div>
        </div>

        <div className="transition-opacity duration-500">
          {isLogin ? (
            <div>
              <h2 className="text-3xl font-bold text-white text-center mb-6">Welcome Back</h2>
              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 text-white placeholder-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Password</label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 text-white placeholder-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                {error && (
                    <div className="text-red-500 text-sm font-medium text-center">
                        {error}
                    </div>
                )}
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300"
                >
                  Login
                </button>
              </form>
            </div>
          ) : (
            <div>
              <h2 className="text-3xl font-bold text-white text-center mb-6">Create Account</h2>
              <form onSubmit={handleSignupSubmit} className="space-y-6">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 text-white placeholder-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Password</label>
                  <input
                    type="password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 text-white placeholder-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 text-white placeholder-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
                {error && (
                    <div className="text-red-500 text-sm font-medium text-center">
                        {error}
                    </div>
                )}
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300"
                >
                  Signup
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthForm
