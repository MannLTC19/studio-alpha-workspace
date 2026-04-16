import React, { useState } from 'react';
import { Compass, Mail, Lock, LogIn, UserPlus, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { sanitizeEmail, sanitizeFullName, validateAuthInput } from '../utils/security';

export default function SignIn() {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const validation = validateAuthInput({
      email,
      password,
      fullName,
      isRegister,
    });

    if (!validation.valid) {
      setError(validation.message);
      return;
    }

    const {
      email: safeEmail,
      password: safePassword,
      fullName: safeFullName,
    } = validation.sanitized;

    setLoading(true);

    try {
      let result;
      if (isRegister) {
        result = await register(safeEmail, safePassword, safeFullName);
      } else {
        result = await login(safeEmail, safePassword);
      }

      if (result.success) {
        setSuccess(isRegister ? 'Account created successfully!' : 'Signed in successfully!');
        // Clear form
        setEmail('');
        setPassword('');
        setFullName('');
      } else {
        setError(result.error || 'An error occurred');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center bg-slate-50 p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
         <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
         <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-100 p-8 z-10 relative">
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-700 flex items-center justify-center text-white shadow-lg">
            <Compass className="w-8 h-8" />
          </div>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1">Studio Alpha Portal</h1>
          <p className="text-sm text-slate-500 font-medium">
            {isRegister ? 'Create a new account' : 'Sign in to your workspace'}
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 flex gap-2 items-start">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-5 p-3 rounded-lg bg-green-50 border border-green-200">
            <p className="text-sm text-green-700">{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegister && (
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase block mb-1.5">Full Name</label>
              <input 
                type="text" 
                required
                value={fullName}
                onChange={(e) => setFullName(sanitizeFullName(e.target.value))}
                maxLength={80}
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all" 
                placeholder="John Doe"
              />
            </div>
          )}
          
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase block mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(sanitizeEmail(e.target.value))}
                maxLength={254}
                className="w-full border border-slate-300 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all" 
                placeholder="alex@studioalpha.com"
                autoComplete="email"
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase block">Password</label>
              {!isRegister && <a href="#" className="text-xs font-bold text-blue-600 hover:underline">Forgot?</a>}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength={128}
                className="w-full border border-slate-300 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all" 
                placeholder="••••••••"
                autoComplete={isRegister ? 'new-password' : 'current-password'}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading || !email || !password || (isRegister && !fullName)}
            className="w-full py-3 mt-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:hover:bg-blue-700 flex justify-center items-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : isRegister ? (
              <><UserPlus className="w-4 h-4"/> Create Account</>
            ) : (
              <><LogIn className="w-4 h-4"/> Sign In</>
            )}
          </button>
        </form>
        
        <div className="mt-6 pt-6 border-t border-slate-200">
          <p className="text-center text-sm text-slate-600">
            {isRegister ? 'Already have an account? ' : "Don't have an account? "}
            <button 
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
                setSuccess('');
              }}
              className="font-bold text-blue-600 hover:underline"
            >
              {isRegister ? 'Sign In' : 'Register'}
            </button>
          </p>
        </div>
        
        <p className="text-center text-xs text-slate-500 font-medium mt-6">
          Secured by Studio Alpha SSO + Supabase
        </p>
      </div>
    </div>
  );
}
