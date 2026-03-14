import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignIn() {
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    setError('');

    const result = await login(email, password);

    setIsLoading(false);

    if (result.success) {
      navigate('/warehouse');
    } else {
      setError(result.error || 'Failed to sign in. Please check your credentials.');
    }
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-6 overflow-hidden">
      {/* Background Decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute top-[60%] -right-[5%] w-[35%] h-[35%] bg-secondary-container/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Main Auth Container */}
      <main className="relative z-10 w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-12 glass-panel rounded-xl overflow-hidden ambient-shadow">
        {/* Brand Visual Side (Curated Gallery Aesthetic) */}
        <div className="hidden lg:flex lg:col-span-5 bg-surface-container-low p-12 flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 rounded flex items-center justify-center overflow-hidden">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-headline font-extrabold text-xl tracking-tight text-on-surface">Inventory Pro</span>
            </div>
            <h1 className="font-headline text-4xl font-bold leading-tight mb-6 text-on-surface">
              The Digital Curator for <span className="text-primary">Operational Clarity.</span>
            </h1>
            <p className="text-on-surface-variant text-lg leading-relaxed max-w-xs">
              Managing warehouse stock with editorial precision and high-end aesthetics.
            </p>
          </div>
          <div className="relative z-10 mt-auto">
            <div className="bg-surface-container-lowest p-6 rounded-xl ambient-shadow border border-outline-variant/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container-high">
                  <img alt="User Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvu3EjC597fZMpiPegliQCFFaXK70jyLQcJQlTB7l9ZvcYQqxM3t8wFvV5sCpBu2Caw0es0PkdOHvH5iRPzmLkRtnF0t4VyjX15uJQtn2RXh4kc9E9Y8bVPnZvVHr3Yn0hhWh_v8kLq6zottEi-y2Cf9XfOgFoy_4zrA5NXSXU7FbaHhHqCKUosriJ2ZDzqL1NTj98Xn5oblh97x9T-f1CPB6bR-ctdgzeoyFrdxDUbEDz8_U8NLMmE2VEFtIDmcciMM9Er3wFwkNL" />
                </div>
                <div>
                  <p className="font-headline font-semibold text-on-surface">Alex Rivera</p>
                  <p className="text-xs text-on-surface-variant font-medium">Warehouse Lead @ Logistics Co.</p>
                </div>
              </div>
              <p className="text-on-surface-variant italic text-sm">"Inventory Pro transformed how we view our data. It’s no longer just a list; it’s a high-performance tool."</p>
            </div>
          </div>
          {/* Abstract Decoration */}
          <div className="absolute -bottom-10 -right-10 opacity-20 transform rotate-12">
            <span className="material-symbols-outlined text-[200px] text-primary" style={{ fontVariationSettings: "'wght' 100" }}>grid_view</span>
          </div>
        </div>

        {/* Auth Form Side */}
        <div className="col-span-1 lg:col-span-7 bg-surface-container-lowest p-8 md:p-16 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <header className="mb-10 text-center lg:text-left">
              <h2 className="font-headline text-3xl font-extrabold text-on-surface mb-2">Welcome Back</h2>
              <p className="text-on-surface-variant">Access your warehouse dashboard to manage stock levels.</p>
            </header>

            <form className="space-y-6" onSubmit={handleSignIn}>
              <div>
                <label className="block text-sm font-semibold text-on-surface-variant mb-2" htmlFor="email">Work Email</label>
                <div className="relative">
                  <input
                    className="w-full no-border-input pt-4 pb-4 px-4"
                    id="email"
                    name="email"
                    placeholder="name@company.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-semibold text-on-surface-variant" htmlFor="password">Password</label>
                  <Link className="text-xs font-semibold text-primary hover:text-on-secondary-container transition-colors" to="/forgot-password">Forgot Password?</Link>
                </div>
                <div className="relative">
                  <input
                    className="w-full no-border-input pt-4 pb-4 px-4"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 py-2">
                <input className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" id="remember" type="checkbox" />
                <label className="text-sm text-on-surface-variant font-medium" htmlFor="remember">Remember this device</label>
              </div>

              <button type="submit" className="w-full bg-primary hover:bg-on-secondary-fixed-variant text-on-primary font-headline font-bold py-4 rounded-lg transition-all transform hover:-translate-y-0.5 ambient-shadow flex items-center justify-center gap-2">
                {isLoading ? 'Signing In...' : 'Sign In'}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
              {error && (
                <p className="mt-4 text-sm text-red-500 font-semibold bg-red-50 p-3 rounded-lg border border-red-100 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">error</span>
                  {error}
                </p>
              )}
            </form>

            {/* Demo Credentials Section */}
            <div className="mt-8 p-6 bg-surface-container-high rounded-xl border border-outline-variant/10">
              <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg text-primary">info</span>
                Demo Credentials
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button 
                  onClick={() => { setEmail('admin@example.com'); setPassword('admin123'); }}
                  className="text-left p-3 rounded-lg bg-surface-container-low hover:bg-surface-container-lowest transition-colors border border-outline-variant/10 group"
                >
                  <p className="text-xs font-bold text-primary mb-1">Admin Access</p>
                  <p className="text-[10px] text-on-surface-variant group-hover:text-on-surface">admin@example.com</p>
                </button>
                <button 
                  onClick={() => { setEmail('staff@example.com'); setPassword('staff123'); }}
                  className="text-left p-3 rounded-lg bg-surface-container-low hover:bg-surface-container-lowest transition-colors border border-outline-variant/10 group"
                >
                  <p className="text-xs font-bold text-secondary mb-1">Staff Access</p>
                  <p className="text-[10px] text-on-surface-variant group-hover:text-on-surface">staff@example.com</p>
                </button>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-surface-container-high text-center">
              <p className="text-on-surface-variant text-sm font-medium">
                New to the system?
                <button className="ml-1 text-primary font-bold hover:underline" onClick={() => setShowSignup(true)}>
                  Create a free account
                </button>
              </p>
            </div>

            <footer className="mt-12 flex justify-center lg:justify-start gap-6 text-[10px] text-outline tracking-widest uppercase font-bold">
              <a className="hover:text-on-surface transition-colors" href="#">Privacy Policy</a>
              <a className="hover:text-on-surface transition-colors" href="#">Terms of Service</a>
              <a className="hover:text-on-surface transition-colors" href="#">Support</a>
            </footer>
          </div>
        </div>
      </main>

      {/* Sign Up Modal */}
      {showSignup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" id="signup-modal">
          <div className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-sm" onClick={() => setShowSignup(false)}></div>
          <div className="relative z-10 w-full max-w-lg bg-surface-container-lowest rounded-xl ambient-shadow overflow-hidden flex flex-col">
            <div className="brand-gradient h-2 w-full"></div>
            <div className="p-8 md:p-12">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="font-headline text-2xl font-extrabold text-on-surface">Start Curating</h3>
                  <p className="text-on-surface-variant mt-1">Set up your warehouse profile in minutes.</p>
                </div>
                <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors" onClick={() => setShowSignup(false)}>
                  <span className="material-symbols-outlined text-on-surface-variant">close</span>
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-outline tracking-wider uppercase mb-2">First Name</label>
                    <input className="w-full no-border-input py-3 px-4" placeholder="Jane" type="text" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-outline tracking-wider uppercase mb-2">Last Name</label>
                    <input className="w-full no-border-input py-3 px-4" placeholder="Doe" type="text" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-outline tracking-wider uppercase mb-2">Warehouse Name</label>
                  <input className="w-full no-border-input py-3 px-4" placeholder="Global Logistics Hub" type="text" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-outline tracking-wider uppercase mb-2">Role</label>
                  <select className="w-full no-border-input py-3 px-4 appearance-none">
                    <option>Warehouse Manager</option>
                    <option>Inventory Specialist</option>
                    <option>Operations Director</option>
                    <option>Owner</option>
                  </select>
                </div>
                <div className="pt-4">
                  <Link to="/dashboard" className="block text-center w-full bg-secondary text-on-secondary font-headline font-bold py-4 rounded-lg hover:bg-on-secondary-fixed-variant transition-all ambient-shadow">
                    Create Workspace
                  </Link>
                  <p className="text-center text-[11px] text-on-surface-variant mt-4 px-6">
                    By clicking "Create Workspace," you agree to our Terms of Use and Privacy Policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
