import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Eye, EyeOff, Lock, Mail, ShieldAlert, ArrowRight, ShieldCheck, Briefcase, UserCheck } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { FormField } from '../../components/forms/FormField';
import toast from 'react-hot-toast';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }

    setIsLoading(true);

    try {
      const user = await login(email, password);
      toast.success(`Welcome back, ${user.name}!`);

      // Determine redirect path by role
      const redirectByRole = {
        ADMIN: '/admin/dashboard',
        STAFF: '/staff/dashboard',
        CUSTOMER: '/customer/dashboard',
      };

      const defaultPath = redirectByRole[user.role] || '/customer/dashboard';
      const fromPath = location.state?.from?.pathname;

      // Ensure that if there was a redirected path, user's role is allowed for it
      let targetPath = defaultPath;
      if (fromPath) {
        if (fromPath.startsWith('/admin') && user.role === 'ADMIN') targetPath = fromPath;
        else if (fromPath.startsWith('/staff') && (user.role === 'ADMIN' || user.role === 'STAFF')) targetPath = fromPath;
        else if (fromPath.startsWith('/customer') && user.role === 'CUSTOMER') targetPath = fromPath;
      }

      navigate(targetPath, { replace: true });
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Authentication failed. Please check your credentials.';
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const setPresetCredentials = (presetEmail, presetRole) => {
    setEmail(presetEmail);
    setPassword('Password123!');
    toast.success(`Loaded ${presetRole} credentials`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center items-center space-x-2">
          <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-md">
            BL
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900">Brightloop</span>
        </div>
        <h2 className="mt-4 text-center text-2xl font-bold tracking-tight text-slate-900">
          Sign in to your account
        </h2>
        <p className="mt-1 text-center text-sm text-slate-500">
          Subscription Management System
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-sm border border-slate-200/80 rounded-2xl sm:px-10">
          {error && (
            <div className="mb-5 rounded-lg bg-red-50 p-3.5 border border-red-200 flex items-start space-x-2.5">
              <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="text-xs text-red-800 font-medium">{error}</div>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <FormField label="Email address" required>
              <div className="relative">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="pl-10"
                  autoComplete="email"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </FormField>

            <FormField label="Password" required>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                  autoComplete="current-password"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </FormField>

            <Button type="submit" className="w-full mt-2" size="lg" isLoading={isLoading}>
              Sign In
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>

          {/* Quick Initial Seed Credentials Helper for Testing */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-center mb-3">
              Initial Testing Credentials
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPresetCredentials('admin@brightloop.io', 'Admin')}
                className="flex flex-col items-center justify-center p-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 transition-all text-center group cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-indigo-600 mb-1" />
                <span className="text-[11px] font-semibold text-slate-700 group-hover:text-indigo-700">Admin</span>
              </button>

              <button
                type="button"
                onClick={() => setPresetCredentials('staff@brightloop.io', 'Staff')}
                className="flex flex-col items-center justify-center p-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-cyan-50 hover:border-cyan-200 transition-all text-center group cursor-pointer"
              >
                <Briefcase className="w-4 h-4 text-cyan-600 mb-1" />
                <span className="text-[11px] font-semibold text-slate-700 group-hover:text-cyan-700">Staff</span>
              </button>

              <button
                type="button"
                onClick={() => setPresetCredentials('customer@acmecorp.com', 'Customer')}
                className="flex flex-col items-center justify-center p-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 transition-all text-center group cursor-pointer"
              >
                <UserCheck className="w-4 h-4 text-emerald-600 mb-1" />
                <span className="text-[11px] font-semibold text-slate-700 group-hover:text-emerald-700">Customer</span>
              </button>
            </div>
            <p className="mt-2 text-[10px] text-center text-slate-400">
              Default password: <span className="font-mono text-slate-600">Password123!</span>
            </p>
          </div>

          <div className="mt-6 text-center text-xs text-slate-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-500">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
