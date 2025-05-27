import React, { useState, useEffect } from 'react';
import { AuthDetails, SignupAuthDetails, Role } from '../types';

interface AuthFormProps {
  onLogin: (details: AuthDetails) => void;
  onSignup: (details: SignupAuthDetails) => void;
  error: string | null;
  clearError: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onLogin, onSignup, error, clearError }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>(Role.STUDENT);
  const [isLoginView, setIsLoginView] = useState(false); // Default to Sign Up view
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [triggerErrorAnimation, setTriggerErrorAnimation] = useState(false);

  useEffect(() => {
    setUsername('');
    setPassword('');
    setRole(Role.STUDENT);
    setShowPassword(false); // Reset on view change
    clearError();
  }, [isLoginView, clearError]);

  useEffect(() => {
    if (error && isLoginView) {
      setTriggerErrorAnimation(true);
      const timer = setTimeout(() => {
        setTriggerErrorAnimation(false);
      }, 500); // Duration of the shake animation
      return () => clearTimeout(timer);
    }
  }, [error, isLoginView]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    if (!username.trim() || !password.trim()) {
        // Optionally, set a local error for empty fields
        return; 
    }
    if (isLoginView) {
      onLogin({ username: username.trim(), password });
    } else {
      onSignup({ username: username.trim(), password, role });
    }
  };

  const commonInputClass = `w-full p-3 rounded-lg border-2 transition-colors duration-300 focus:outline-none focus:ring-1`;
  const lightInputClass = `bg-slate-50 border-slate-300 text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:ring-sky-500`;

  const commonButtonClass = `w-full px-5 py-3 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2`;
  const lightButtonClass = `bg-sky-600 hover:bg-sky-700 text-white focus:ring-sky-600 focus:ring-offset-white`;
  
  const labelClass = `block text-sm font-medium mb-1 text-slate-700`;

  return (
    <div className={`w-full max-w-md p-8 rounded-lg shadow-2xl bg-white`}>
      <h2 className={`text-3xl font-bold text-center mb-8 text-sky-600`}> 
        {isLoginView ? 'Login' : 'Sign Up'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6"> 
        <div>
          <label htmlFor="username" className={labelClass}>Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className={`${commonInputClass} ${lightInputClass}`}
            required
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="password" className={labelClass}>Password</label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={`${commonInputClass} ${lightInputClass} pr-10`} // Add padding for the icon
              required
              aria-required="true"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-500 hover:text-sky-600 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
          </div>
        </div>
        
        {!isLoginView && (
          <div>
            <label htmlFor="role" className={labelClass}>Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className={`${commonInputClass} ${lightInputClass}`}
              required={!isLoginView}
              aria-required={!isLoginView}
            >
              <option value={Role.STUDENT}>Student</option>
              <option value={Role.TEACHER}>Teacher</option>
            </select>
          </div>
        )}
        
        {error && (
            <p 
              className={`text-sm text-red-600 ${triggerErrorAnimation ? 'animate-shake' : ''}`} 
              role="alert"
            >
                {error}
            </p>
        )}

        <button
          type="submit"
          className={`${commonButtonClass} ${lightButtonClass} mt-2`} 
        >
          {isLoginView ? 'Login' : 'Create Account'}
        </button>
      </form>
      <p className={`mt-8 text-center text-sm text-slate-500`}>
        {isLoginView ? "Don't have an account?" : 'Already have an account?'}
        <button
          onClick={() => setIsLoginView(!isLoginView)}
          className={`ml-1 font-medium transition-colors duration-200
                      text-sky-600 hover:text-sky-700
                      focus:outline-none focus:underline`}
        >
          {isLoginView ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </div>
  );
};
