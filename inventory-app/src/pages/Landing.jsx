import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="bg-background text-on-surface">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-b border-outline-variant/15">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 brand-gradient rounded-xl flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined">inventory_2</span>
            </div>
            <span className="font-headline font-extrabold text-xl tracking-tight text-on-surface">Inventory System</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a className="text-on-surface-variant font-medium hover:text-primary transition-colors" href="#">Platform</a>
            <a className="text-on-surface-variant font-medium hover:text-primary transition-colors" href="#">Solutions</a>
            <a className="text-on-surface-variant font-medium hover:text-primary transition-colors" href="#">Enterprise</a>
            <div className="h-6 w-px bg-outline-variant/30"></div>
            <Link to="/signin" className="text-on-surface font-semibold hover:text-primary transition-colors">Login</Link>
            <Link to="/dashboard" className="px-6 py-2.5 brand-gradient text-on-primary font-bold rounded-lg shadow-lg hover:opacity-90 transition-all">
              Get Started
            </Link>
          </div>

          <div className="md:hidden">
            <span className="material-symbols-outlined text-on-surface">menu</span>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 lg:py-32" style={{background: 'radial-gradient(ellipse 80% 60% at 70% 40%, rgba(115,69,182,0.08) 0%, transparent 70%), radial-gradient(ellipse 40% 50% at 20% 80%, rgba(183,142,254,0.1) 0%, transparent 60%)'}}>
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="relative z-10">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-container text-on-primary-container text-xs font-bold uppercase tracking-widest mb-6">
                System Version 4.0 Now Live
              </span>
              <h1 className="font-headline text-5xl lg:text-7xl font-extrabold text-on-surface leading-[1.1] mb-8">
                Precision in <br/><span className="text-primary italic">Every Palette</span>
              </h1>
              <p className="text-lg text-on-surface-variant max-w-lg leading-relaxed mb-10">
                The Digital Curator for modern logistics. Elevate your warehouse operations from spreadsheets to a high-end management experience with editorial clarity.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/dashboard" className="px-8 py-4 brand-gradient text-on-primary font-bold rounded-xl shadow-xl hover:scale-[1.02] transition-transform flex items-center gap-2">
                  Deploy Now <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
                <button className="px-8 py-4 bg-surface-container-low text-primary font-bold rounded-xl hover:bg-surface-container-high transition-colors">
                  Request Demo
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary-container/10 rounded-full blur-3xl"></div>
              
              {/* Bento Grid-style Visual Component */}
              <div className="grid grid-cols-12 gap-4 relative z-10">
                <div className="col-span-8 h-64 rounded-3xl bg-surface-container-lowest custom-shadow p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-2xl bg-primary-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>analytics</span>
                    </div>
                    <span className="text-tertiary-container px-3 py-1 rounded-full text-[10px] font-bold bg-tertiary/10">LIVE UPDATES</span>
                  </div>
                  <div>
                    <div className="text-4xl font-headline font-bold text-on-surface">14,204</div>
                    <div className="text-sm text-on-surface-variant font-medium">Items in Stock - Zone A</div>
                  </div>
                </div>

                <div className="col-span-4 h-64 rounded-3xl brand-gradient p-6 flex flex-col justify-end">
                  <span className="material-symbols-outlined text-on-primary text-4xl mb-4">local_shipping</span>
                  <div className="text-on-primary/80 text-xs font-bold uppercase tracking-wider">Outbound</div>
                  <div className="text-on-primary font-headline font-bold text-xl">42 Deliveries</div>
                </div>

                <div className="col-span-12 h-48 rounded-3xl bg-surface-container-high p-8 flex items-center gap-8 border border-white/40">
                  <div className="flex -space-x-3">
                    <img className="w-12 h-12 rounded-full border-2 border-surface-container-high object-cover" alt="Team member" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-jf0tqhYUPK2nwAh4PH6-i_Ws5nDejpdpjJnsJMX5jUG7Y2gnDctDpxmJGiTquLvOZJH6VdNqUU5zGRB6ESdRm6FUdmGD3KaTo-QdONi5EYtHk9vSC2Hucba-LvYoNg-pxG2lXEN6PMZO3Wy_U07SEUQzGC0OWZ-7uI1SyMmcpqmCfynLM7eSPSbbDZltZNET4XVKJmB8Y-iYVcEB9Z0pGE0M4lrCYrbgbzOFxetiPr8oFoUQjqM5EoEobEjclxiWlKutO0wn14m4"/>
                    <img className="w-12 h-12 rounded-full border-2 border-surface-container-high object-cover" alt="Logistics manager" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBr8fD35qp6liwNMXTMpdviIMBZbR5BRzA2ZvVg_klxg9IJ4bFccgMoYfaHoDdGz0OFf1uqQM1MWS1EH3x3ToZWgnnBfGtvXuw0WecUXh8QPZ-9PwjTV5810paEYtMC4cK3C1D1WP6QM7rt9uOB5dGRp2MJTLY5JJpb_ijgpPdGigOSFTGTrEGyuiliCjOaRKShKSbpstvs8YnwWrphUGHYym3x6DkGYYthgBjYR9n-WpzXmLenaZJHoJzzElqLYIyRfDS5mSPWSuf_"/>
                    <div className="w-12 h-12 rounded-full border-2 border-surface-container-high bg-secondary-container flex items-center justify-center text-[10px] font-bold text-on-secondary-container">+12</div>
                  </div>
                  <div>
                    <div className="text-on-surface font-bold text-lg leading-tight">Expert Logistics Support</div>
                    <div className="text-on-surface-variant text-sm">Join over 500+ global warehouses</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Value Propositions Group */}
        <section className="bg-surface-container-low py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
              <h2 className="font-headline text-3xl lg:text-4xl font-bold text-on-surface mb-4">Core Ecosystem</h2>
              <p className="text-on-surface-variant font-medium">Unified management for the modern operator.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="group bg-surface-container-lowest p-10 rounded-[2rem] custom-shadow hover:-translate-y-2 transition-transform duration-300">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary transition-colors">
                  <span className="material-symbols-outlined text-primary group-hover:text-on-primary">warehouse</span>
                </div>
                <h3 className="font-headline text-xl font-bold mb-4 text-on-surface">Warehouse Management</h3>
                <p className="text-on-surface-variant leading-relaxed text-sm">
                  Real-time spatial visualization of your storage capacity. Optimize paths and minimize handling times with AI-driven placement logic.
                </p>
              </div>

              <div className="group bg-surface-container-lowest p-10 rounded-[2rem] custom-shadow hover:-translate-y-2 transition-transform duration-300">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary transition-colors">
                  <span className="material-symbols-outlined text-primary group-hover:text-on-primary">inventory</span>
                </div>
                <h3 className="font-headline text-xl font-bold mb-4 text-on-surface">Stock Control</h3>
                <p className="text-on-surface-variant leading-relaxed text-sm">
                  Intelligent low-stock forecasting and automated reordering. Maintain the perfect balance between liquidity and availability.
                </p>
              </div>

              <div className="group bg-surface-container-lowest p-10 rounded-[2rem] custom-shadow hover:-translate-y-2 transition-transform duration-300">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary transition-colors">
                  <span className="material-symbols-outlined text-primary group-hover:text-on-primary">monitoring</span>
                </div>
                <h3 className="font-headline text-xl font-bold mb-4 text-on-surface">Logistics Tracking</h3>
                <p className="text-on-surface-variant leading-relaxed text-sm">
                  End-to-end visibility from receipt to delivery. Integrated move history with granular timestamping and digital proof-of-delivery.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Editorial Content Section */}
        <section className="py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
              <div className="lg:w-1/2 order-2 lg:order-1">
                <div className="relative rounded-[3rem] overflow-hidden custom-shadow">
                  <img className="w-full h-[600px] object-cover" alt="Warehouse setup" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6h43leave_kix4vlDnEmUu0pXwiXRNGepZnbWMjSaKj-9og1Hlk31wJmjXVHJjEoTBeifrm4QdkVZn7JKFZjRCdBks4FWbq9gMYvvOSixKRuiDj1m2Zhmmm0Qrk1DbQ2jduRDPaCOLS2Z5DbgJMVsXifjZcYqJr7jcFsg4zDi9HVxjR_FxmAv7fjFKTHBKbYDcqzd7qXO_lyCdGDt3SMpgsA3CV0D9rdFWTh_2xueCCCoV4XedrS4Z69PqBnPFjvRyb-a6-bZbbn3"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
                  <div className="absolute bottom-10 left-10 right-10 p-8 glass-panel rounded-3xl border border-white/20">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full brand-gradient flex items-center justify-center text-on-primary">
                        <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
                      </div>
                      <div>
                        <div className="font-headline font-bold text-on-surface">Compliance Ready</div>
                        <div className="text-on-surface-variant text-sm">Audit-ready logs for every single movement.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2 order-1 lg:order-2">
                <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase mb-6 block">The Digital Curator Approach</span>
                <h2 className="font-headline text-4xl lg:text-5xl font-extrabold text-on-surface leading-tight mb-8">
                  Transforming Raw Data into <span className="text-primary italic">Operational Art</span>
                </h2>
                
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-primary/20 flex items-center justify-center text-primary font-bold">01</div>
                    <div>
                      <h4 className="font-bold text-lg text-on-surface mb-2">Tonal Layering Interface</h4>
                      <p className="text-on-surface-variant text-sm leading-relaxed">Our interface uses soft shadows and background shifts instead of rigid lines, reducing cognitive load for long shifts.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-primary/20 flex items-center justify-center text-primary font-bold">02</div>
                    <div>
                      <h4 className="font-bold text-lg text-on-surface mb-2">Contextual Actions</h4>
                      <p className="text-on-surface-variant text-sm leading-relaxed">Tools only appear when you need them. Hover actions keep your inventory list clean and editorial.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-primary/20 flex items-center justify-center text-primary font-bold">03</div>
                    <div>
                      <h4 className="font-bold text-lg text-on-surface mb-2">High-Fidelity Reporting</h4>
                      <p className="text-on-surface-variant text-sm leading-relaxed">Export summaries that look as good as a financial journal. Impress stakeholders with presentation-ready data.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="brand-gradient rounded-[3rem] p-12 lg:p-24 text-center relative overflow-hidden custom-shadow">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full -ml-32 -mb-32 blur-3xl"></div>
              
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="font-headline text-4xl lg:text-6xl font-extrabold text-on-primary mb-8">Ready to curate your inventory?</h2>
                <p className="text-on-primary/90 text-lg mb-12 font-medium">Join Inventory Pro today and experience the future of warehouse management with our 14-day premium trial.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/dashboard" className="px-10 py-5 bg-white text-primary font-extrabold rounded-2xl shadow-2xl hover:bg-surface-container-low transition-colors">
                    Create Your Free Account
                  </Link>
                  <button className="px-10 py-5 bg-primary-container/20 text-on-primary font-bold border border-white/30 rounded-2xl hover:bg-white/10 transition-colors">
                    Contact Sales Team
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-high py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 brand-gradient rounded-lg flex items-center justify-center text-on-primary">
                  <span className="material-symbols-outlined text-sm">inventory_2</span>
                </div>
                <span className="font-headline font-bold text-lg tracking-tight text-on-surface">Inventory Pro</span>
              </div>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                Crafting professional tools for the next generation of logistics specialists. Precision in every palette.
              </p>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-primary cursor-pointer hover:bg-primary hover:text-on-primary transition-all">
                  <span className="material-symbols-outlined text-sm">share</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-primary cursor-pointer hover:bg-primary hover:text-on-primary transition-all">
                  <span className="material-symbols-outlined text-sm">public</span>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-headline font-bold text-on-surface mb-6 uppercase text-xs tracking-widest">Platform</h5>
              <ul className="space-y-4 text-on-surface-variant text-sm">
                <li><a className="hover:text-primary transition-colors" href="#">Warehouse Management</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Stock Control</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Logistics Tracking</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">API &amp; Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-headline font-bold text-on-surface mb-6 uppercase text-xs tracking-widest">Company</h5>
              <ul className="space-y-4 text-on-surface-variant text-sm">
                <li><a className="hover:text-primary transition-colors" href="#">About Iris Logistics</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Press Kit</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-headline font-bold text-on-surface mb-6 uppercase text-xs tracking-widest">Newsletter</h5>
              <p className="text-on-surface-variant text-xs mb-4">Stay curated with weekly industry insights.</p>
              <div className="flex gap-2">
                <input className="bg-surface-container-lowest border-none rounded-lg text-sm w-full focus:ring-2 focus:ring-primary" placeholder="Email address" type="email" />
                <button className="p-2 brand-gradient text-on-primary rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-10 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-on-surface-variant text-xs font-medium">© 2024 Inventory Pro. A division of Iris Logistics.</span>
            <div className="flex items-center gap-6 text-xs text-on-surface-variant font-medium">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></span> Systems Operational</span>
              <a className="hover:text-primary transition-colors" href="#">Status Page</a>
              <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
