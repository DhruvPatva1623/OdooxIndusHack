import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { showToast } from '../components/Toast';

export default function Otp() {
  const [resent, setResent] = useState(false);

  function handleResend() {
    setResent(true);
    showToast({ title: 'OTP Resent', message: 'A new 6-digit code has been sent to your email.', type: 'success' });
    setTimeout(() => setResent(false), 30000);
  }
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col items-center justify-center p-6 selection:bg-primary-container selection:text-on-primary-container">
      <main className="w-full max-w-lg">
        <div className="flex flex-col items-center mb-12">
          <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-xl shadow-primary/10 overflow-hidden">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface mb-2">Inventory Pro</h1>
          <p className="text-on-surface-variant font-label text-sm uppercase tracking-widest">Warehouse Management</p>
        </div>

        <div className="bg-surface-container-lowest glass-panel rounded-xl p-8 md:p-12 shadow-[0px_10px_40px_rgba(115,69,182,0.06)] relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-container opacity-20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="mb-8">
              <h2 className="font-headline text-2xl font-bold text-on-surface mb-3">Two-Step Verification</h2>
              <p className="text-on-surface-variant text-body-md leading-relaxed">
                We've sent a 6-digit verification code to your registered email address. Please enter it below to continue.
              </p>
            </div>

            <form action="#" className="space-y-10" method="POST">
              <div className="flex justify-between gap-2 md:gap-4">
                <input className="w-12 h-16 md:w-16 md:h-20 text-center text-2xl font-headline font-bold no-border-input" maxLength="1" placeholder="•" type="text" />
                <input className="w-12 h-16 md:w-16 md:h-20 text-center text-2xl font-headline font-bold no-border-input" maxLength="1" placeholder="•" type="text" />
                <input className="w-12 h-16 md:w-16 md:h-20 text-center text-2xl font-headline font-bold no-border-input" maxLength="1" placeholder="•" type="text" />
                <input className="w-12 h-16 md:w-16 md:h-20 text-center text-2xl font-headline font-bold no-border-input" maxLength="1" placeholder="•" type="text" />
                <input className="w-12 h-16 md:w-16 md:h-20 text-center text-2xl font-headline font-bold no-border-input" maxLength="1" placeholder="•" type="text" />
                <input className="w-12 h-16 md:w-16 md:h-20 text-center text-2xl font-headline font-bold no-border-input" maxLength="1" placeholder="•" type="text" />
              </div>

              <div className="space-y-6">
                <Link to="/reset-password" className="block text-center w-full brand-gradient text-on-primary font-headline font-bold py-4 rounded-lg shadow-lg hover:shadow-primary/20 transition-all">
                  <span className="flex items-center justify-center gap-2">
                    Verify OTP
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </span>
                </Link>

                <div className="flex flex-col items-center gap-4">
                  <p className="text-on-surface-variant text-sm">
                    Didn't receive the code? 
                    <button onClick={handleResend} disabled={resent} className={`ml-1 font-semibold hover:underline decoration-2 underline-offset-4 ${resent ? 'text-on-surface-variant cursor-not-allowed' : 'text-primary'}`}>
                      {resent ? 'Code Sent ✓' : 'Resend code'}
                    </button>
                  </p>
                  <Link className="flex items-center gap-2 text-on-surface-variant text-sm hover:text-primary transition-colors" to="/signin">
                    <span className="material-symbols-outlined text-sm">keyboard_backspace</span>
                    Back to login
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-surface-container-low p-6 rounded-xl flex items-start gap-4">
            <div className="bg-secondary-container/30 p-2 rounded-lg">
              <span className="material-symbols-outlined text-on-secondary-container">help</span>
            </div>
            <div>
              <p className="text-sm font-bold text-on-surface mb-1">Need Help?</p>
              <p className="text-xs text-on-surface-variant">Contact our support desk for manual verification.</p>
            </div>
          </div>
          
          <div className="bg-surface-container-low p-6 rounded-xl flex items-start gap-4">
            <div className="bg-tertiary-container/30 p-2 rounded-lg">
              <span className="material-symbols-outlined text-on-tertiary-container">security</span>
            </div>
            <div>
              <p className="text-sm font-bold text-on-surface mb-1">Secure Session</p>
              <p className="text-xs text-on-surface-variant">This verification link expires in 10 minutes.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto py-8 text-on-surface-variant text-xs opacity-50 font-label tracking-widest">
        © 2024 INVENTORY PRO SYSTEM. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}
