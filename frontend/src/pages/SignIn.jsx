import React, { useState } from 'react';
import { Compass, Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SignIn() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login();
    }, 800);
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
          <p className="text-sm text-slate-500 font-medium">Sign in to your workspace</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase block mb-1.5">Company Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-slate-300 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all" 
                placeholder="alex@studioalpha.com"
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase block">Password</label>
              <a href="#" className="text-xs font-bold text-blue-600 hover:underline">Forgot?</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-slate-300 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all" 
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading || !email || !password}
            className="w-full py-3 mt-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:hover:bg-blue-700 flex justify-center items-center gap-2"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <><LogIn className="w-4 h-4"/> Sign In</>}
          </button>
        </form>
        
        <p className="text-center text-xs text-slate-500 font-medium mt-8">
          Secured by Studio Alpha SSO
        </p>
      </div>
    </div>
  );
}
