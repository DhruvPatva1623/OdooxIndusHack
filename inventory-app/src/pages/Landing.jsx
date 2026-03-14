import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    title: "One-Click Quick Inbound",
    description: "Scan, verify, and shelf stock in seconds. Our new 'Quick Inbound' system eliminates manual data entry, cutting receiving time by 70%.",
    icon: "bolt",
    color: "bg-primary/10 text-primary",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 2,
    title: "Smart Inventory Audits",
    description: "Keep your digital and physical stock in perfect sync. The 'Audit' module flags discrepancies instantly and generates auto-adjustment ledgers.",
    icon: "fact_check",
    color: "bg-tertiary/10 text-tertiary",
    image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 3,
    title: "Rupee-First Analytics",
    description: "Manage assets in ₹ with localized reports. Track valuation, tax implications, and regional shipping costs with custom currency support.",
    icon: "currency_rupee",
    color: "bg-secondary/10 text-secondary",
    image: "https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&q=80&w=1000"
  }
];

export default function Landing() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-background text-on-surface min-h-screen font-sans selection:bg-primary/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/60 backdrop-blur-xl border-b border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-12 h-12 rounded-2xl brand-gradient flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
              <img src="/logo.png" alt="Logo" className="w-7 h-7 object-contain" />
            </div>
            <span className="font-headline font-extrabold text-2xl tracking-tight">Inventory Pro</span>
          </div>

          <div className="flex items-center gap-10">
            <Link to="/signin" className="text-sm font-bold hover:text-primary transition-colors">Sign In</Link>
            <Link to="/signup" className="px-8 py-3 brand-gradient text-on-primary font-extrabold rounded-2xl shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all active:scale-95 text-sm">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-24 lg:py-40 px-8 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none"></div>
          
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-high border border-outline-variant/20 mb-8 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">The Future of Logistics is Here</span>
            </div>
            
            <h1 className="font-headline text-5xl lg:text-8xl font-black text-on-surface leading-[1.05] mb-10 tracking-tight animate-fade-in-up" style={{animationDelay: '100ms'}}>
              Manage Your Warehouse <br/><span className="brand-text-gradient italic">With Absolute Clarity.</span>
            </h1>
            
            <p className="text-xl text-on-surface-variant max-w-3xl mx-auto font-medium leading-relaxed mb-12 animate-fade-in-up" style={{animationDelay: '200ms'}}>
              From high-speed inbound shipments to precision stock audits. <br/>
              Inventory Pro is the ultimate operating system for modern warehouse teams.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up" style={{animationDelay: '300ms'}}>
              <Link to="/dashboard" className="w-full sm:w-auto px-12 py-5 brand-gradient text-on-primary font-black rounded-[2rem] shadow-2xl shadow-primary/30 hover:scale-105 transition-transform flex items-center justify-center gap-3">
                Experience the Dashboard <span className="material-symbols-outlined">rocket_launch</span>
              </Link>
              <button className="w-full sm:w-auto px-12 py-5 bg-surface-container-lowest text-on-surface font-bold rounded-[2rem] border-2 border-outline-variant/10 hover:bg-surface-container-high transition-all">
                The Product Journey
              </button>
            </div>
          </div>
        </section>

        {/* Feature Slider - Explaining the 'Idea' */}
        <section className="py-24 bg-surface-container-low/50 relative">
          <div className="max-w-7xl mx-auto px-8">
            <div className="mb-16 text-center">
                <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Key Pillars</span>
                <h2 className="font-headline text-4xl font-black text-on-surface tracking-tight">Powerful Features, Simplified.</h2>
            </div>

            <div className="relative h-[650px] lg:h-[500px] w-full rounded-[4rem] overflow-hidden shadow-2xl bg-surface-container-lowest border border-outline-variant/10">
              {slides.map((slide, index) => (
                <div 
                  key={slide.id}
                  className={`absolute inset-0 transition-all duration-1000 flex flex-col lg:flex-row items-center overflow-hidden ${index === activeSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20 pointer-events-none'}`}
                >
                  <div className="lg:w-1/2 p-12 lg:px-24 flex flex-col justify-center">
                    <div className={`w-16 h-16 ${slide.color} rounded-2xl flex items-center justify-center mb-10 shadow-sm`}>
                      <span className="material-symbols-outlined text-3xl font-bold">{slide.icon}</span>
                    </div>
                    <h3 className="font-headline text-4xl lg:text-5xl font-black text-on-surface mb-8 tracking-tight">
                      {slide.title}
                    </h3>
                    <p className="text-xl text-on-surface-variant leading-relaxed font-medium">
                      {slide.description}
                    </p>
                    <div className="mt-12">
                      <Link to="/signup" className="text-primary font-black text-sm flex items-center gap-2 group decoration-2 underline-offset-8 hover:underline italic">
                        Start using {slide.title.split(' ')[2]} 
                        <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                      </Link>
                    </div>
                  </div>

                  <div className="lg:w-1/2 h-full relative">
                    <img src={slide.image} alt={slide.title} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-transparent to-transparent hidden lg:block"></div>
                  </div>
                </div>
              ))}

              <div className="absolute bottom-12 left-12 lg:left-24 flex items-center gap-4 z-20">
                {slides.map((_, index) => (
                  <button key={index} onClick={() => setActiveSlide(index)} className={`h-2.5 rounded-full transition-all duration-500 ${index === activeSlide ? 'w-16 bg-primary' : 'w-2.5 bg-on-surface-variant/20'}`} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* The Workflow - How it works */}
        <section className="py-32 px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">The Workflow</span>
                        <h2 className="font-headline text-5xl font-black text-on-surface leading-tight mb-8">How to transform your <br/>Logistics in <span className="text-primary">3 Simple Steps.</span></h2>
                        <div className="space-y-12 mt-12">
                            {[
                                { step: '01', title: 'Digitize your Products', desc: 'Import your bulk CSV or add products manually. Set SKU codes and safe stock thresholds for automated alerts.' },
                                { step: '02', title: 'Route Incoming Shipments', desc: 'Use the Quick Inbound tool to receive stock from vendors. One-click verification updates your ledger instantly.' },
                                { step: '03', title: 'Audit and Scale', desc: 'Run weekly audits and track your growth with real-time Rupees valuation reports and move history.' }
                            ].map(item => (
                                <div key={item.step} className="flex gap-8 group">
                                    <div className="w-16 h-16 rounded-3xl bg-surface-container-high flex items-center justify-center text-primary font-black text-2xl group-hover:bg-primary group-hover:text-on-primary transition-all duration-500 shrink-0 shadow-sm border border-outline-variant/10">{item.step}</div>
                                    <div>
                                        <h4 className="font-bold text-xl text-on-surface mb-3">{item.title}</h4>
                                        <p className="text-on-surface-variant font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="bg-surface-container-highest rounded-[3rem] p-4 shadow-2xl relative z-10 border border-outline-variant/10">
                            <img src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=1000" alt="App Preview" className="rounded-[2.5rem] w-full h-[600px] object-cover" />
                            <div className="absolute -bottom-10 -right-10 bg-primary-container p-8 rounded-3xl shadow-xl border border-white/20 hidden lg:block">
                                <div className="text-primary font-black text-3xl mb-1">99.9%</div>
                                <div className="text-on-primary-container text-xs font-bold uppercase tracking-widest">Inventory Accuracy</div>
                            </div>
                        </div>
                        <div className="absolute -top-10 -left-10 w-40 h-40 brand-gradient opacity-20 blur-3xl"></div>
                    </div>
                </div>
            </div>
        </section>

        {/* The Modules Grid - Idea of the website */}
        <section className="py-32 bg-surface-container-lowest border-y border-outline-variant/10">
            <div className="max-w-7xl mx-auto px-8">
                <div className="max-w-3xl mb-20">
                    <h2 className="font-headline text-4xl lg:text-5xl font-black text-on-surface mb-6">A Unified System for <br/>Every Operations Role.</h2>
                    <p className="text-xl text-on-surface-variant font-medium">From floor managers to financial directors, Inventory Pro provides the essential toolkit.</p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { title: 'Operations Dashboard', icon: 'dashboard', desc: 'Real-time overview of pending receipts, low stock alerts, and team performance.' },
                        { title: 'Inbound Management', icon: 'call_received', desc: 'Manage vendor shipments, verify incoming goods, and map them to warehouse zones.' },
                        { title: 'Outbound Logistics', icon: 'local_shipping', desc: 'Process delivery orders, track regional shipments, and optimize delivery paths.' },
                        { title: 'Live Stock Levels', icon: 'analytics', desc: 'The heart of your warehouse. Real-time ₹ valuation and free/reserved stock tracking.' },
                        { title: 'Internal Transfers', icon: 'swap_horiz', desc: 'Move stock between zones with full chain-of-custody tracking and move history.' },
                        { title: 'Inventory Auditing', icon: 'fact_check', desc: 'Perform physical count checks and resolve discrepancies with audit trails.' }
                    ].map(mod => (
                        <div key={mod.title} className="bg-surface-container-low p-10 rounded-[2.5rem] border border-outline-variant/10 hover:-translate-y-2 transition-transform duration-500 group">
                            <div className="w-14 h-14 rounded-[1.25rem] bg-white flex items-center justify-center mb-8 shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined font-bold">{mod.icon}</span>
                            </div>
                            <h4 className="font-black text-xl text-on-surface mb-4">{mod.title}</h4>
                            <p className="text-on-surface-variant font-medium text-sm leading-relaxed">{mod.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Global Performance Section */}
        <section className="py-32 px-8 text-center bg-surface-container-low/20">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-headline text-4xl font-black mb-20 tracking-tight">Enterprise Infrastructure. Localized Experience.</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-16">
              {[
                { label: 'Cloud Resilience', value: '99.9%' },
                { label: 'Active Ledgers', value: '14,000+' },
                { label: 'Audit Accuracy', value: '100%' },
                { label: 'Daily Transfers', value: '85k+' }
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-5xl font-headline font-black text-primary mb-3">{stat.value}</div>
                  <div className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.25em]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 px-8">
            <div className="max-w-7xl mx-auto">
                <div className="brand-gradient rounded-[4rem] p-16 lg:p-32 text-center relative overflow-hidden shadow-3xl">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                    <div className="max-w-3xl mx-auto relative z-10">
                        <h2 className="font-headline text-4xl lg:text-7xl font-black text-on-primary mb-10 leading-tight">Ready to Audit Your <br/>Operations?</h2>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link to="/signup" className="w-full sm:w-auto px-12 py-5 bg-white text-primary font-black rounded-2xl shadow-xl hover:scale-105 transition-transform flex items-center justify-center gap-3">
                                Start Your Trial
                            </Link>
                            <button className="w-full sm:w-auto px-12 py-5 bg-primary-container/20 text-on-primary font-bold border-2 border-white/20 rounded-2xl hover:bg-white/10 transition-all">
                                Request Enterprise Demo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Minimal Footer */}
        <footer className="py-24 border-t border-outline-variant/20">
          <div className="max-w-7xl mx-auto px-8 flex flex-col lg:flex-row justify-between items-center gap-12 text-center lg:text-left">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl brand-gradient flex items-center justify-center">
                <img src="/logo.png" alt="Logo" className="w-6 h-6 object-contain" />
              </div>
              <span className="font-headline font-extrabold text-xl tracking-tight">Inventory Pro</span>
            </div>

            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-sm font-bold text-on-surface-variant">
              <a href="#" className="hover:text-primary transition-colors">Platform</a>
              <a href="#" className="hover:text-primary transition-colors">Enterprise</a>
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Status</a>
            </div>

            <div className="flex flex-col items-center lg:items-end gap-2">
              <div className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.3em]">
                © 2024 Iris Logistics Solutions
              </div>
              <div className="text-[9px] font-bold text-on-surface-variant/30 uppercase tracking-[0.1em]">
                Dhruv Patva | Yash Sharma | Sanidhya Roy | Vishwa Singh
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
