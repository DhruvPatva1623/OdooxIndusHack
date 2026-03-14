import React, { useState } from 'react';
import Layout from '../components/Layout';

export default function DeliveryOrders() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <Layout>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-headline font-extrabold text-on-surface">Delivery Orders</h2>
          <p className="text-on-surface-variant font-medium mt-1">Manage outgoing stock shipments to customers.</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-2 brand-gradient text-on-primary rounded-xl font-bold shadow-md hover:scale-[1.02] transition-transform flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          New Delivery
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-surface-container-lowest p-6 rounded-[2rem] border border-outline-variant/20 shadow-sm flex items-center justify-between">
          <div>
             <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">To Deliver</span>
             <h3 className="text-2xl font-headline font-extrabold mt-1">45</h3>
          </div>
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
             <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>local_shipping</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-[2rem] border border-outline-variant/20 shadow-sm flex items-center justify-between">
          <div>
             <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Late Shipments</span>
             <h3 className="text-2xl font-headline font-extrabold mt-1 text-error">2</h3>
          </div>
          <div className="w-12 h-12 bg-error-container text-error rounded-2xl flex items-center justify-center">
             <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>error</span>
          </div>
        </div>
        <div className="bg-primary/5 p-6 rounded-[2rem] border border-primary/20 shadow-sm flex items-center justify-between">
          <div>
             <span className="text-xs font-bold text-primary uppercase tracking-wider">Shipped Today</span>
             <h3 className="text-2xl font-headline font-extrabold text-primary mt-1">14</h3>
          </div>
          <div className="w-12 h-12 bg-primary text-on-primary rounded-2xl flex items-center justify-center">
             <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-surface-container-lowest rounded-[2.5rem] shadow-sm border border-outline-variant/20 p-4">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex gap-2">
            <span className="px-4 py-1.5 bg-surface-container-highest rounded-full text-xs font-semibold text-primary cursor-pointer hover:bg-outline-variant/30 transition-colors">All Deliveries</span>
            <span className="px-4 py-1.5 hover:bg-surface-container-highest transition-colors rounded-full text-xs font-semibold text-on-surface-variant cursor-pointer">Ready</span>
            <span className="px-4 py-1.5 hover:bg-surface-container-highest transition-colors rounded-full text-xs font-semibold text-on-surface-variant cursor-pointer">Waiting</span>
            <span className="px-4 py-1.5 hover:bg-surface-container-highest transition-colors rounded-full text-xs font-semibold text-on-surface-variant cursor-pointer">Done</span>
          </div>
          <div className="relative w-64">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
            <input className="bg-surface-container-low border-none rounded-full pl-10 pr-6 py-2 text-sm w-full focus:ring-2 focus:ring-primary transition-all" placeholder="Search reference..." type="text" />
          </div>
        </div>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-on-surface-variant/70 font-bold text-[10px] uppercase tracking-[0.1em] border-y border-outline-variant/10 bg-surface-container-low/50">
                <th className="px-8 py-4">Reference</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Scheduled Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              <tr className="group hover:bg-surface-container-highest/30 transition-colors">
                <td className="px-8 py-5">
                  <div className="font-bold text-primary">WH/OUT/00045</div>
                </td>
                <td className="px-6 py-5 font-medium text-sm">Client B - New York Hub</td>
                <td className="px-6 py-5 text-sm">Yesterday, 14:20</td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center px-3 py-1 bg-error-container text-on-error-container rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">Waiting</span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="px-4 py-1.5 bg-primary/10 text-primary font-bold rounded-lg text-xs hover:bg-primary hover:text-on-primary transition-colors">Review</button>
                </td>
              </tr>
              <tr className="group hover:bg-surface-container-highest/30 transition-colors">
                <td className="px-8 py-5">
                  <div className="font-bold text-primary">WH/OUT/00046</div>
                </td>
                <td className="px-6 py-5 font-medium text-sm">Design Studio LLC</td>
                <td className="px-6 py-5 text-sm">Today, 10:00</td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center px-3 py-1 bg-tertiary-container text-on-tertiary-container rounded-full text-[10px] font-bold uppercase tracking-wider">Ready</span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="px-4 py-1.5 bg-primary/10 text-primary font-bold rounded-lg text-xs hover:bg-primary hover:text-on-primary transition-colors">Validate</button>
                </td>
              </tr>
               <tr className="group hover:bg-surface-container-highest/30 transition-colors opacity-60 bg-surface-container-highest/20">
                <td className="px-8 py-5">
                  <div className="font-bold text-on-surface-variant line-through">WH/OUT/00044</div>
                </td>
                <td className="px-6 py-5 font-medium text-sm">Acme Corp</td>
                <td className="px-6 py-5 text-sm">Oct 23, 2024</td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-full text-[10px] font-bold uppercase tracking-wider">Canceled</span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="px-4 py-1.5 text-on-surface-variant font-bold rounded-lg text-xs hover:bg-surface-container-high transition-colors">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-surface-container-lowest w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-outline-variant/20 flex items-center justify-between bg-surface-container-low">
              <h3 className="font-headline font-bold text-xl">Create Delivery</h3>
              <button onClick={() => setShowCreateModal(false)} className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center hover:bg-error/10 hover:text-error transition-colors">
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto space-y-6">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Customer *</label>
                <select className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none cursor-pointer">
                  <option>Select / Add Customer...</option>
                  <option>Client B - New York Hub</option>
                  <option>Design Studio LLC</option>
                </select>
              </div>

              <div>
                <h4 className="font-bold text-sm mb-4">Operations / Items</h4>
                <div className="bg-surface-container-low rounded-xl border border-outline-variant/30 p-4">
                  <div className="grid grid-cols-12 gap-4 mb-3">
                    <div className="col-span-6 text-xs font-bold text-on-surface-variant uppercase px-2">Product</div>
                    <div className="col-span-3 text-xs font-bold text-on-surface-variant uppercase px-2">Demand</div>
                    <div className="col-span-3 text-xs font-bold text-on-surface-variant uppercase px-2">Done</div>
                  </div>
                  
                  {/* Item Row */}
                  <div className="grid grid-cols-12 gap-4 items-center mb-3">
                    <div className="col-span-6">
                      <select className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none appearance-none">
                        <option>Office Chair (FURN-001)</option>
                        <option>Steel Rods (RAW-STL-10)</option>
                      </select>
                    </div>
                    <div className="col-span-3">
                      <input type="number" defaultValue="10" className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none" />
                    </div>
                    <div className="col-span-3">
                      <input type="number" defaultValue="0" className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none" />
                    </div>
                  </div>

                  <button className="text-primary text-sm font-bold flex items-center gap-1 mt-4 px-2 hover:underline">
                    <span className="material-symbols-outlined text-sm">add</span> Add a line
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-outline-variant/20 bg-surface-container-low flex justify-between items-center">
              <span className="text-xs text-on-surface-variant">Status will be <strong className="text-primary">Draft</strong></span>
              <div className="flex gap-3">
                <button onClick={() => setShowCreateModal(false)} className="px-6 py-2.5 bg-surface-container-highest text-on-surface font-bold rounded-xl hover:bg-outline-variant/30 transition-colors">
                  Cancel
                </button>
                <button onClick={() => setShowCreateModal(false)} className="px-6 py-2.5 brand-gradient text-on-primary font-bold rounded-xl shadow-md hover:scale-[1.02] transition-transform">
                  Confirm Delivery
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
