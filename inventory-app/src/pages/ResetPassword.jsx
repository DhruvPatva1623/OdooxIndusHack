import React from 'react';
import { Link } from 'react-router-dom';

export default function ResetPassword() {
  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-container opacity-20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary-container opacity-20 blur-[120px] rounded-full"></div>

      <main className="w-full max-w-lg z-10">
        <div className="flex flex-col items-center mb-12">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-4 shadow-lg">
            <span className="material-symbols-outlined text-on-primary text-4xl">inventory_2</span>
          </div>
          <h1 className="text-2xl font-extrabold text-on-surface tracking-tight">Inventory Pro</h1>
          <p className="text-on-surface-variant font-medium text-sm">Warehouse Management</p>
        </div>

        <div className="glass-panel bg-surface-container-lowest rounded-xl p-8 md:p-10 shadow-[0px_10px_40px_rgba(115,69,182,0.06)]">
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Step 3 of 3</span>
              <div className="h-[2px] flex-grow bg-surface-container-high rounded-full overflow-hidden">
                <div className="h-full bg-primary w-full"></div>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-on-surface mb-2">Reset Password</h2>
            <p className="text-on-surface-variant text-body-md">Create a strong password to secure your warehouse account.</p>
          </header>

          <form className="space-y-6">
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-on-surface-variant px-1" htmlFor="new_password">New Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
                  <span className="material-symbols-outlined text-[20px]">lock</span>
                </div>
                <input className="w-full no-border-input py-4 pl-12 pr-4 text-on-surface placeholder:text-outline" id="new_password" placeholder="Min. 8 characters" type="password" />
              </div>
              <div className="flex gap-1 px-1 mt-2">
                <div className="h-1 flex-1 bg-tertiary-container rounded-full"></div>
                <div className="h-1 flex-1 bg-tertiary-container rounded-full"></div>
                <div className="h-1 flex-1 bg-surface-container-high rounded-full"></div>
                <div className="h-1 flex-1 bg-surface-container-high rounded-full"></div>
              </div>
              <p className="text-[11px] text-on-surface-variant mt-1 px-1">Password strength: <span className="text-tertiary font-bold">Medium</span></p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-on-surface-variant px-1" htmlFor="confirm_password">Confirm New Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
                  <span className="material-symbols-outlined text-[20px]">lock_reset</span>
                </div>
                <input className="w-full no-border-input py-4 pl-12 pr-4 text-on-surface placeholder:text-outline" id="confirm_password" placeholder="Repeat new password" type="password" />
              </div>
            </div>

            <div className="pt-4">
              <Link to="/signin" className="block text-center w-full py-4 px-6 bg-gradient-to-br from-primary to-secondary text-on-primary font-bold rounded-lg shadow-lg hover:shadow-primary/20 transition-all group">
                <span className="flex items-center justify-center gap-2">
                  Change Password
                  <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </span>
              </Link>
            </div>
          </form>

          <div className="mt-8 p-4 bg-surface-container-low rounded-lg flex gap-3 items-start border border-primary/5">
            <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">security</span>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Changing your password will sign you out of all active sessions on other devices for security reasons.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link className="text-on-surface-variant hover:text-primary text-sm font-medium flex items-center justify-center gap-2 transition-colors" to="/signin">
            <span className="material-symbols-outlined text-[18px]">keyboard_backspace</span>
            Back to Login
          </Link>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 p-12 opacity-10 pointer-events-none">
        <div className="grid grid-cols-3 gap-4">
          <div className="w-8 h-8 rounded-full bg-primary"></div>
          <div className="w-8 h-8 rounded-lg bg-secondary"></div>
          <div className="w-8 h-8 rounded-full bg-tertiary"></div>
          <div className="w-8 h-8 rounded-lg bg-primary-container"></div>
          <div className="w-8 h-8 rounded-full bg-secondary-container"></div>
          <div className="w-8 h-8 rounded-lg bg-tertiary-container"></div>
        </div>
      </div>
    </div>
  );
}
