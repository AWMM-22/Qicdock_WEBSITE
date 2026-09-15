import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, AlertCircle, ArrowRight, CheckCircle2, KeyRound } from 'lucide-react';

export default function LoginPage() {
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  
  // OTP flow states
  const [otpSent, setOtpSent] = useState(false);
  
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/';

  const handlePasswordAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);
    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        
        if (data.session) {
           navigate(from, { replace: true });
        } else {
           setSuccessMsg('Account created successfully! You can now sign in (check your email for a verification link if required).');
           setIsSignUp(false);
           setPassword('');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address first.');
      return;
    }
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true, // Allow creating account via OTP
        }
      });
      if (error) throw error;
      setOtpSent(true);
      setSuccessMsg('A magic code has been sent to your email!');
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP code');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email'
      });
      if (error) throw error;
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Invalid or expired code');
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setError(null);
    setSuccessMsg(null);
    setPassword('');
    setOtp('');
    setOtpSent(false);
  };

  return (
    <main className="flex-1 flex items-center justify-center bg-[#F4F0E6] py-20 px-4">
      <div className="w-full max-w-md bg-[#FAF7F0] border border-[#E2DAC8] rounded-3xl p-8 md:p-10 shadow-[0_15px_40px_rgba(10,30,63,0.08)]">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-['Anton'] text-[#0A1E3F] uppercase tracking-wide mb-2">
            {loginMethod === 'otp' ? 'Login with Code' : (isSignUp ? 'Create Account' : 'Welcome Back')}
          </h1>
          <p className="text-gray-600 text-sm">
            {loginMethod === 'otp' 
              ? 'Enter your email to receive a magic sign-in code.' 
              : (isSignUp ? 'Join the QICDOCK ecosystem today.' : 'Sign in to access your orders and saved setups.')}
          </p>
        </div>

        {/* Login Method Toggle */}
        <div className="flex bg-[#EBE5D9] rounded-xl p-1 mb-8">
          <button
            onClick={() => { setLoginMethod('password'); resetState(); }}
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${loginMethod === 'password' ? 'bg-white shadow-sm text-[#0A1E3F]' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Password
          </button>
          <button
            onClick={() => { setLoginMethod('otp'); resetState(); setIsSignUp(false); }}
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${loginMethod === 'otp' ? 'bg-white shadow-sm text-[#0A1E3F]' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Magic Code
          </button>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl flex items-start gap-3 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        {/* Success State */}
        {successMsg && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl flex items-start gap-3 text-sm">
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
            <p>{successMsg}</p>
          </div>
        )}

        {/* Password Form */}
        {loginMethod === 'password' && (
          <form onSubmit={handlePasswordAuth} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0A1E3F] uppercase tracking-wider pl-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#EBE5D9] border border-[#D6CDB8] rounded-xl pl-12 pr-4 py-3.5 text-sm font-medium text-[#0A1E3F] focus:outline-none focus:border-[#0A1E3F] transition-colors placeholder:text-gray-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0A1E3F] uppercase tracking-wider pl-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#EBE5D9] border border-[#D6CDB8] rounded-xl pl-12 pr-4 py-3.5 text-sm font-medium text-[#0A1E3F] focus:outline-none focus:border-[#0A1E3F] transition-colors placeholder:text-gray-500"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#0A1E3F] hover:bg-[#152B52] text-[#F4F0E6] disabled:opacity-70 font-bold uppercase tracking-widest text-xs py-4 rounded-xl transition-all shadow-[0_5px_15px_rgba(10,30,63,0.3)] mt-2"
            >
              {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
        )}

        {/* OTP Form */}
        {loginMethod === 'otp' && (
          <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0A1E3F] uppercase tracking-wider pl-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  disabled={otpSent}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#EBE5D9] border border-[#D6CDB8] rounded-xl pl-12 pr-4 py-3.5 text-sm font-medium text-[#0A1E3F] focus:outline-none focus:border-[#0A1E3F] transition-colors placeholder:text-gray-500 disabled:opacity-50"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {otpSent && (
              <div className="space-y-1.5 animate-fadeIn">
                <label className="text-xs font-bold text-[#0A1E3F] uppercase tracking-wider pl-1">6-Digit Code</label>
                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                    className="w-full bg-[#EBE5D9] border border-[#D6CDB8] rounded-xl pl-12 pr-4 py-3.5 text-sm font-medium text-[#0A1E3F] focus:outline-none focus:border-[#0A1E3F] transition-colors placeholder:text-gray-500 tracking-[0.5em] text-center"
                    placeholder="000000"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#0A1E3F] hover:bg-[#152B52] text-[#F4F0E6] disabled:opacity-70 font-bold uppercase tracking-widest text-xs py-4 rounded-xl transition-all shadow-[0_5px_15px_rgba(10,30,63,0.3)] mt-2"
            >
              {loading ? 'Processing...' : (otpSent ? 'Verify Code' : 'Send Magic Code')}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
            
            {otpSent && (
              <button 
                type="button"
                onClick={() => setOtpSent(false)}
                className="w-full text-center text-xs font-bold text-gray-500 hover:text-[#0A1E3F] uppercase tracking-wider mt-4"
              >
                Change Email Address
              </button>
            )}
          </form>
        )}

        {/* Toggle Sign Up / Sign In (Only for Password Mode) */}
        {loginMethod === 'password' && (
          <div className="mt-8 text-center border-t border-[#E2DAC8] pt-6">
            <p className="text-sm text-gray-600">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError(null);
                }}
                className="font-bold text-[#0A1E3F] hover:underline uppercase tracking-wide text-xs"
              >
                {isSignUp ? 'Sign In' : 'Create One'}
              </button>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
