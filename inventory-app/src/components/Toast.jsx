import React, { useEffect, useState } from 'react';

const TOAST_ICONS = {
  success: { icon: 'check_circle', color: 'text-tertiary', bg: 'bg-tertiary-container/30' },
  error:   { icon: 'error',        color: 'text-error',    bg: 'bg-error-container/30' },
  info:    { icon: 'info',         color: 'text-primary',  bg: 'bg-primary-container/30' },
  warning: { icon: 'warning',      color: 'text-tertiary', bg: 'bg-tertiary-container/20' },
};

export function Toast({ toasts, removeToast }) {
  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
      {toasts.map((t) => {
        const style = TOAST_ICONS[t.type] || TOAST_ICONS.info;
        return (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-start gap-3 min-w-[300px] max-w-sm px-5 py-4 rounded-2xl shadow-2xl border border-outline-variant/20 bg-surface-container-lowest backdrop-blur-md animate-slide-up`}
          >
            <div className={`${style.bg} p-1.5 rounded-full shrink-0`}>
              <span className={`material-symbols-outlined text-[18px] ${style.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                {style.icon}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              {t.title && <p className="font-bold text-sm text-on-surface">{t.title}</p>}
              <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">{t.message}</p>
            </div>
            <button onClick={() => removeToast(t.id)} className="text-outline hover:text-on-surface transition-colors shrink-0">
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}

let toastListeners = [];
let toastQueue = [];
let toastIdCounter = 0;

export function showToast({ title, message, type = 'success', duration = 3500 }) {
  const id = ++toastIdCounter;
  const toast = { id, title, message, type };
  toastQueue = [...toastQueue, toast];
  toastListeners.forEach(fn => fn([...toastQueue]));
  setTimeout(() => {
    toastQueue = toastQueue.filter(t => t.id !== id);
    toastListeners.forEach(fn => fn([...toastQueue]));
  }, duration);
}

export function useToasts() {
  const [toasts, setToasts] = useState(toastQueue);
  useEffect(() => {
    toastListeners.push(setToasts);
    return () => { toastListeners = toastListeners.filter(fn => fn !== setToasts); };
  }, []);
  const removeToast = (id) => {
    toastQueue = toastQueue.filter(t => t.id !== id);
    toastListeners.forEach(fn => fn([...toastQueue]));
  };
  return { toasts, removeToast };
}
