import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill out both email and password.');
      return;
    }

    setIsLoading(true);
    setError('');

    const full_name = formData.email.split('@')[0] || 'User';
    const result = await signup({ ...formData, full_name });
    
    setIsLoading(false);
    
    if (result.success) {
      navigate('/signin');
    } else {
      setError(result.error || 'Failed to sign up. Please try again.');
    }
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-6 sm:p-12 overflow-x-hidden">
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-0 lg:gap-16 items-stretch bg-white lg:bg-transparent rounded-2xl overflow-hidden shadow-2xl lg:shadow-none">
        
        {/* Left Side: Branding/Marketing */}
        <div className="hidden lg:flex lg:w-5/12 flex-col justify-between p-12 rounded-2xl editorial-gradient relative overflow-hidden shadow-2xl">
          {/* Decorative Elements */}
          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-5%] left-[-5%] w-96 h-96 bg-primary-fixed/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl overflow-hidden shadow-lg">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="font-headline text-2xl font-extrabold text-white tracking-tight">Inventory Pro</h1>
                <p className="font-label text-xs text-primary-fixed uppercase tracking-widest opacity-80">Warehouse Management</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="font-headline text-5xl font-extrabold text-white leading-tight">
                Precision in <br/> <span className="text-secondary-fixed">Every Palette.</span>
              </h2>
              <p className="font-body text-lg text-white/80 max-w-md leading-relaxed">
                Step into a workspace designed for focus. Manage complex stock levels with the clarity of a digital gallery.
              </p>
            </div>
          </div>
          
          <div className="relative z-10 mt-auto">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <img alt="User Avatar" className="w-10 h-10 rounded-full border-2 border-primary ring-2 ring-white/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBroWfOHuK2joiDPIbb5qSQ5wxoBPhFWvExg_6sYwJpI56rY1lzY2j1s3pnJD_U3xGb9MTeKKrVGn6OrfwrXuxrVqXcGFKiCr7SB5RiXtlUnnp7bM97usdIX68X75YRieklCNGrnCPS5-jg6qgz2yP_7uhr8u4KyOwO6yeV4ShUYhJFzZrmwOKb_-Fry1Z1QwJIrkuh6rotU-dCy9TvRVJhTKfHFxcRFMO210L2aMRrdDKfDAT7dN-7LUxXwmG26vuXOUyKFjPVJrrt"/>
                <img alt="User Avatar" className="w-10 h-10 rounded-full border-2 border-primary ring-2 ring-white/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5178gBlxA2YNuu6jILscfUWKObfHiI4BB9BQdiYRkZAuM_kKg6LiYfzJSgGp3m-wwYrjDyap52MEkFXUes-Tq3xt1Du3rP6TBT8iu0zehGZTEQW8FAgQ8NdjcnyINM1A_BHf5Etn7CaAPD59-_RPI6Ryj2tcnN6Ke9iEBvPcM2M-Gdo_kvNGAGAihIHygNx6mRqmJ3Y92fUo2ah-mdkcQFrsv1w7iV4GryYrWDdIOHv_N8kZxckRGN0rblfzSUC7pTUuORMfRtmne"/>
                <img alt="User Avatar" className="w-10 h-10 rounded-full border-2 border-primary ring-2 ring-white/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnkvb3BqBRN9KqpseZheh55M-J8xTrqy6MYPIztXEDjzhL4Po3t97y2VYJxI5APqtIFhNNwG-_EiViaj6788CJyOWEyTRYvkC9knQHkw4Lzf7GVz0PogK0wSE5KbqWe5sBeSwKuaV1FQ9tlpeG0QnEygEoDSJjOYmPugSom8VayNVwLs94M295WigiJ26pZviD9laCprRvrFat3dhc86WAFSyZsRCiKnoDWEVEI5wlHy_oIU3KjK0-Z4WuZTOywR1Vs0G1djRXnlKK"/>
              </div>
              <p className="font-label text-sm text-white/90">Joined by 2,400+ warehouse managers</p>
            </div>
          </div>
        </div>
        
        {/* Right Side: Sign Up Form */}
        <div className="w-full lg:w-7/12 flex flex-col justify-center p-8 md:p-12 lg:p-0">
          
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg shadow-md overflow-hidden">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="font-headline text-xl font-bold text-on-surface">Inventory Pro</h1>
          </div>
          
          <div className="max-w-md mx-auto w-full space-y-8">
            <div>
              <h3 className="font-headline text-3xl font-bold text-on-surface mb-2">New Account</h3>
              <p className="font-body text-on-surface-variant text-sm">Create your organization profile to get started.</p>
            </div>
            
            <form className="space-y-6" onSubmit={handleSignUp}>
              <div className="space-y-2">
                <label className="font-label text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Work Email</label>
                <div className="relative">
                  <input 
                    className="w-full no-border-input py-4 px-4 placeholder:text-outline/50 pl-4" 
                    placeholder="john@company.com" 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant">alternate_email</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-label text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Password</label>
                <div className="relative">
                  <input 
                    className="w-full no-border-input py-4 px-4 placeholder:text-outline/50 pl-4" 
                    placeholder="Min. 8 characters" 
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant">lock</span>
                </div>
              </div>
              
              <div className="flex items-start gap-3 py-2">
                <input className="mt-1 rounded border-outline-variant text-primary focus:ring-primary/30" type="checkbox"/>
                <p className="text-xs text-on-surface-variant leading-tight">
                  I agree to the <a className="text-primary font-medium hover:underline" href="#">Terms of Service</a> and <a className="text-primary font-medium hover:underline" href="#">Privacy Policy</a>.
                </p>
              </div>
              
              {error && (
                <div className="bg-error/10 text-error p-3 rounded-md text-sm font-medium">
                  {error}
                </div>
              )}
              
              <button 
                type="submit" 
                disabled={isLoading}
                className={`block text-center w-full bg-on-secondary-fixed text-white py-4 rounded-xl font-headline font-bold text-sm tracking-wide shadow-lg shadow-on-secondary-fixed/20 hover:shadow-on-secondary-fixed/30 hover:bg-on-primary-fixed active:scale-[0.98] transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
              </button>
            </form>
            
            <div className="pt-2 flex items-center gap-4">
              <div className="h-px flex-1 bg-surface-container-high"></div>
              <span className="text-[10px] font-bold text-outline-variant uppercase tracking-widest">Demo Credentials</span>
              <div className="h-px flex-1 bg-surface-container-high"></div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setFormData({ email: 'admin@example.com', password: 'admin123' })}
                className="flex flex-col items-center justify-center p-3 bg-surface-container-lowest rounded-xl border border-outline-variant/10 hover:bg-surface-container-low transition-colors group"
              >
                <span className="text-[10px] font-bold text-primary uppercase tracking-tighter">Admin Access</span>
                <span className="text-[9px] font-medium text-on-surface-variant group-hover:text-on-surface">admin@example.com</span>
              </button>
              <button 
                onClick={() => setFormData({ email: 'staff@example.com', password: 'staff123' })}
                className="flex flex-col items-center justify-center p-3 bg-surface-container-lowest rounded-xl border border-outline-variant/10 hover:bg-surface-container-low transition-colors group"
              >
                <span className="text-[10px] font-bold text-secondary uppercase tracking-tighter">Staff Access</span>
                <span className="text-[9px] font-medium text-on-surface-variant group-hover:text-on-surface">staff@example.com</span>
              </button>
            </div>
            
            <p className="text-center text-sm text-on-surface-variant">
              Already have an account? <Link className="text-primary font-bold hover:underline" to="/signin">Sign In</Link>
            </p>
            
            <div className="bg-tertiary-container/20 p-4 rounded-xl flex gap-3">
              <span className="material-symbols-outlined text-on-tertiary-container" style={{fontVariationSettings: "'FILL' 1"}}>verified_user</span>
              <p className="text-[11px] text-on-tertiary-container font-medium leading-relaxed">
                Your inventory data is encrypted with enterprise-grade AES-256 standards.
              </p>
            </div>

            <div className="pt-8 border-t border-surface-container-high flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-[10px] text-outline font-medium uppercase tracking-wider">© 2024 Inventory Pro System</p>
              <div className="flex gap-4">
                <a className="text-[10px] text-outline font-bold hover:text-primary transition-colors uppercase tracking-wider" href="#">Help</a>
                <a className="text-[10px] text-outline font-bold hover:text-primary transition-colors uppercase tracking-wider" href="#">Privacy</a>
                <a className="text-[10px] text-outline font-bold hover:text-primary transition-colors uppercase tracking-wider" href="#">Terms</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
