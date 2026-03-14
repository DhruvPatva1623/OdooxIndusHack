import React from 'react';
import { Link } from 'react-router-dom';

export default function UserProfile() {
  return (
    <div className="flex min-h-screen bg-surface">
      {/* SideNavBar */}
      <aside className="w-72 bg-surface-container-low flex flex-col h-screen sticky top-0 border-r border-outline-variant/15">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-container rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary" style={{fontVariationSettings: "'FILL' 1"}}>inventory_2</span>
            </div>
            <div>
              <h1 className="font-headline font-extrabold text-on-surface text-xl leading-none">Inventory Pro</h1>
              <p className="text-on-surface-variant text-xs mt-1">Warehouse Management</p>
            </div>
          </div>
          <nav className="space-y-1">
            <Link className="flex items-center gap-4 px-4 py-3 rounded-xl transition-colors text-on-surface-variant hover:bg-surface-container-highest" to="/">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-medium">Dashboard</span>
            </Link>
            <Link className="flex items-center gap-4 px-4 py-3 rounded-xl transition-colors text-on-surface-variant hover:bg-surface-container-highest" to="/warehouse">
              <span className="material-symbols-outlined">inventory_2</span>
              <span className="font-medium">Warehouse</span>
            </Link>
            <Link className="flex items-center gap-4 px-4 py-3 rounded-xl transition-colors text-on-surface-variant hover:bg-surface-container-highest" to="/stock-levels">
              <span className="material-symbols-outlined">analytics</span>
              <span className="font-medium">Stock Levels</span>
            </Link>
            <Link className="flex items-center gap-4 px-4 py-3 rounded-xl transition-colors text-on-surface-variant hover:bg-surface-container-highest" to="/warehouse">
              <span className="material-symbols-outlined">location_on</span>
              <span className="font-medium">Locations</span>
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-8">
          <div className="bg-primary-container/30 p-4 rounded-xl flex items-center gap-3">
            <img alt="User Profile" className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-8uQk8bi6gi2_tdKtjAeDPuB5UOQsFzENywF1PcE3Npf6as9Odw8myXcKjB6i0kEpaBUhOoCiyQ5Jsew7SOfz5JycRiiyKz6xvM_f-4IR15Hsx_0a013uq_3lXm6ecL_6Y7ea1AyQSNkPiVLIs6s5IlcjPUMjVkkztLB4-8F7IY24eIYmC8OjS1j80MmtfdtydeI0rU9sXfOA3jc8Ki8wm7JY7HL1VuGNYRLh01kpk_NsupP3YSGSgBJKvbFLB_F3EvCTIiJvPNes"/>
            <div className="overflow-hidden">
              <p className="text-on-primary-container font-semibold text-sm truncate">Alex Rivera</p>
              <p className="text-on-primary-container/70 text-xs truncate">Logistics Manager</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 bg-surface">
        {/* TopNavBar */}
        <header className="h-20 flex items-center justify-between px-8 bg-surface-container-lowest/50 backdrop-blur-md sticky top-0 z-10 border-b border-outline-variant/15">
          <div className="flex items-center gap-2">
            <span className="text-on-surface-variant text-sm font-medium">Pages</span>
            <span className="material-symbols-outlined text-on-surface-variant text-xs">chevron_right</span>
            <span className="text-on-surface text-sm font-semibold">User Profile</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative w-72">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
              <input className="w-full bg-surface-container-highest/50 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 placeholder:text-on-surface-variant/50" placeholder="Search inventory system..." type="text" />
            </div>
            <div className="flex items-center gap-4 text-on-surface-variant">
              <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">notifications</span>
              <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">settings</span>
              <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">help</span>
            </div>
            <div className="h-8 w-px bg-outline-variant/30"></div>
            <img alt="User Avatar" className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDldFu85R239KBkPeF5fKbGR024K3S9CqeAZFaAXqll4X-p9ZQyAa8kNro6RAq-Nyy9nDtmZGxnqYDGXQ4Hs_DTbD_OsLkJgQFDFtVR6d5R6MKaTPTR3KPgvBOSNaqsRs9t7z1aFB54GSdJo4-mJuXl7EBsTrHE8CjyvfXxTHY5-rk0Fddke_hMe_EaoU-9vqeJQdG2RJC-4Ipd0sJn2jEOgJchLqHdrT5M8GY-vHBr3ZEuucoL5o6H7BDTpj-QxAy9QadQsEaj6BJa"/>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-8 max-w-6xl mx-auto w-full pb-20">
          <div className="mb-12">
            <h2 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface mb-2">My Profile</h2>
            <p className="text-on-surface-variant">Update your photo and personal details here to manage your warehouse access.</p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Profile Picture Card */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <div className="bg-surface-container-lowest rounded-xl p-8 flex flex-col items-center text-center shadow-[0px_10px_40px_rgba(115,69,182,0.06)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-12 translate-x-12"></div>
                
                <div className="relative mb-6">
                  <div className="w-40 h-40 rounded-full overflow-hidden ring-4 ring-primary-container p-1">
                    <img alt="User Portrait" className="w-full h-full rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQVwRWPmUZoINbYP5yElW57GsFgTze1f8NCSdPE_TMxMb-lQYmiT0RMocwBku3Tn4yrhcuk6XFh-OIarDRC5vol9Ursm6bIpcStTYvBwkTSbJBQGc4XvAAYckLBb2eV7xuO9oMzwek73xrxQZM405JmLQ2bGUqFNiEHXrCoppsgaJ0mDOWrpdrXHxUnVSwu1-wEeYE942Fb1jUsebfT0N3HnGa2LhyY7aD4QS_ZEYTZMZS4ZZLC_m-lEfsLcXAjwIbkkFdx0_aOPF3"/>
                  </div>
                  <button className="absolute bottom-2 right-2 bg-primary text-on-primary p-2 rounded-full shadow-lg hover:bg-primary-fixed-dim transition-colors group">
                    <span className="material-symbols-outlined text-sm leading-none" style={{fontVariationSettings: "'FILL' 1"}}>edit</span>
                  </button>
                </div>
                
                <h3 className="font-headline text-2xl font-bold text-on-surface">Alex Rivera</h3>
                <p className="text-on-surface-variant font-medium mb-6">Inventory Specialist • Warehouse A</p>
                
                <div className="w-full pt-6 border-t border-outline-variant/10 flex justify-center gap-4">
                  <div className="text-center">
                    <p className="text-xl font-bold text-primary">124</p>
                    <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Transfers</p>
                  </div>
                  <div className="w-px h-8 bg-outline-variant/20"></div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-primary">12</p>
                    <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Workshops</p>
                  </div>
                </div>
              </div>

              <div className="bg-primary-container/20 rounded-xl p-6 border border-primary/5">
                <div className="flex items-center gap-3 mb-3 text-on-primary-container">
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>verified_user</span>
                  <p className="font-bold">Account Security</p>
                </div>
                <p className="text-sm text-on-primary-container/70 mb-4 leading-relaxed">Your account is secured with two-factor authentication.</p>
                <button className="w-full py-2 px-4 rounded-lg bg-white text-primary text-xs font-bold uppercase tracking-wider hover:bg-primary-container transition-colors">Manage Security</button>
              </div>
            </div>

            {/* Form Section */}
            <div className="col-span-12 lg:col-span-8">
              <div className="bg-surface-container-lowest rounded-xl p-10 shadow-[0px_10px_40px_rgba(115,69,182,0.06)]">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h4 className="font-headline text-xl font-bold text-on-surface">Personal Information</h4>
                    <p className="text-on-surface-variant text-sm">Update your contact information and identity.</p>
                  </div>
                  <span className="material-symbols-outlined text-outline-variant">info</span>
                </div>
                
                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Full Name</label>
                      <div className="relative group">
                        <input className="w-full no-border-input py-4 px-4 text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all" type="text" defaultValue="Alex Rivera" />
                        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary group-focus-within:w-full transition-all duration-300"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Job Role</label>
                      <div className="relative group">
                        <input className="w-full no-border-input py-4 px-4 text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all" type="text" defaultValue="Logistics Manager" />
                        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary group-focus-within:w-full transition-all duration-300"></div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Email Address</label>
                      <div className="relative group">
                        <input className="w-full no-border-input py-4 px-4 text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all" type="email" defaultValue="alex.rivera@inventorypro.com" />
                        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary group-focus-within:w-full transition-all duration-300"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Phone Number</label>
                      <div className="relative group">
                        <input className="w-full no-border-input py-4 px-4 text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all" type="tel" defaultValue="+1 (555) 892-0291" />
                        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary group-focus-within:w-full transition-all duration-300"></div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Bio / Notes</label>
                    <div className="relative group">
                      <textarea className="w-full no-border-input py-4 px-4 text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all resize-none" rows="4" defaultValue="Managing the West Wing Logistics hub since 2021. Specialized in pharmaceutical inventory controls and temperature-sensitive storage protocols."></textarea>
                      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary group-focus-within:w-full transition-all duration-300"></div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-outline-variant/10 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <span className="material-symbols-outlined text-sm">update</span>
                      <span className="text-xs italic">Last updated 2 days ago</span>
                    </div>
                    <div className="flex gap-4">
                      <button className="px-6 py-3 rounded-lg text-primary font-bold hover:bg-primary/5 transition-colors" type="button">Cancel</button>
                      <button className="bg-gradient-to-br from-primary to-secondary px-10 py-3 rounded-lg text-on-primary font-bold shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all" type="submit">Save Changes</button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Notification Settings Row */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-surface-container-low rounded-xl p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                      <span className="material-symbols-outlined">mail</span>
                    </div>
                    <div>
                      <p className="font-bold text-on-surface">Email Notifications</p>
                      <p className="text-xs text-on-surface-variant">Receive weekly inventory reports</p>
                    </div>
                  </div>
                  <div className="w-12 h-6 bg-primary rounded-full relative p-1 cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                  </div>
                </div>

                <div className="bg-surface-container-low rounded-xl p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-tertiary shadow-sm">
                      <span className="material-symbols-outlined">sms</span>
                    </div>
                    <div>
                      <p className="font-bold text-on-surface">SMS Alerts</p>
                      <p className="text-xs text-on-surface-variant">Low stock critical alerts</p>
                    </div>
                  </div>
                  <div className="w-12 h-6 bg-outline-variant rounded-full relative p-1 cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1 shadow-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
