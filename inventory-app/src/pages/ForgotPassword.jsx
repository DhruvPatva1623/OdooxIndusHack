import React from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* Ambient Texture Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-container opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-24 w-64 h-64 bg-secondary-container opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-tertiary-container opacity-15 rounded-full blur-3xl"></div>
      </div>

      <main className="relative z-10 w-full max-w-md px-6">
        <div className="flex flex-col items-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-container rounded-xl flex items-center justify-center shadow-lg mb-6">
            <span className="material-symbols-outlined text-on-primary text-4xl">inventory_2</span>
          </div>
          <h1 className="font-headline text-3xl font-bold tracking-tight text-on-surface mb-2">Inventory Pro</h1>
          <p className="text-on-surface-variant font-body text-sm uppercase tracking-widest">Warehouse Management</p>
        </div>

        <div className="bg-surface-container-lowest glass-panel p-8 rounded-xl shadow-[0px_10px_40px_rgba(115,69,182,0.06)] border-outline-variant/15 border border-solid">
          <div className="mb-8">
            <h2 className="font-headline text-2xl font-bold text-on-surface mb-2">Forgot Password</h2>
            <p className="text-on-surface-variant text-sm font-body leading-relaxed">
              Enter the email address associated with your account and we'll send you an OTP code to reset your password.
            </p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-primary font-label uppercase tracking-wider ml-1" htmlFor="email">
                Work Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-on-surface-variant text-xl group-focus-within:text-primary transition-colors">mail</span>
                </div>
                <input className="w-full pl-12 pr-4 py-4 no-border-input" id="email" placeholder="name@company.com" type="email" />
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 rounded-full"></div>
              </div>
            </div>

            <Link to="/otp" className="w-full block text-center group relative overflow-hidden bg-gradient-to-br from-primary to-primary-container py-4 rounded-lg shadow-md hover:shadow-primary/20 transition-all duration-300 active:scale-[0.98]">
              <div className="flex items-center justify-center space-x-2 relative z-10">
                <span className="font-headline font-bold text-on-primary tracking-wide">Send OTP</span>
                <span className="material-symbols-outlined text-on-primary text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
              </div>
            </Link>
          </form>

          <div className="mt-8 pt-6 border-t border-outline-variant/10 flex justify-center">
            <Link className="inline-flex items-center space-x-2 text-sm font-medium text-on-surface-variant hover:text-primary transition-colors duration-200" to="/signin">
              <span className="material-symbols-outlined text-lg">keyboard_backspace</span>
              <span>Back to Login</span>
            </Link>
          </div>
        </div>

        <div className="mt-8 flex justify-between items-center px-4">
          <span className="text-[10px] text-on-surface-variant/60 font-label uppercase tracking-tighter">System Version 4.2.0</span>
          <div className="flex space-x-4">
            <a className="text-[10px] text-on-surface-variant/60 font-label uppercase tracking-tighter hover:text-primary" href="#">Help</a>
            <a className="text-[10px] text-on-surface-variant/60 font-label uppercase tracking-tighter hover:text-primary" href="#">Privacy</a>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 right-0 p-12 opacity-5 lg:opacity-10 pointer-events-none select-none">
        <img alt="Warehouse Illustration" className="w-96 h-96 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjPYLadHTaxPVHflld7-QCmtEqb092tHxkjw5Hul4Aa-wRx2v6eueuMbS7NC8X9cHohz1jWHRC2nfU7u2AtNgwqUg1xXsZ-dlQIAqMGvzLjU_vkdtgR5mvhAVkpZWr5CpbUbioYBOreHcnmMOzLBHRtXg0utw4EETutECgaRbXGzdUuqmi5QTTNKtE7-cns-7KM7fJJE7w_2hlkbIkqLeEXK4lhHsXMw1vc5FBJgp_BXCb36m2oy7v2muQ-VIHw-t2At9E04hAwsk0"/>
      </div>
    </div>
  );
}
