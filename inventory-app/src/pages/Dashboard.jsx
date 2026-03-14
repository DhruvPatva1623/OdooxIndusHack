import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <Layout>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-headline font-extrabold text-on-surface">Operations Dashboard</h2>
          <p className="text-on-surface-variant font-medium mt-1">Real-time overview of inventory movements.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-surface-container-highest rounded-xl text-sm font-semibold text-on-surface hover:bg-outline-variant transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">filter_list</span>
            Filters
          </button>
          <button className="px-5 py-2 brand-gradient text-on-primary rounded-xl font-bold shadow-md hover:scale-[1.02] transition-transform">
            New Operation
          </button>
        </div>
      </div>

      {/* Dashboard KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface-container-low p-6 rounded-[2rem] border border-outline-variant/20 shadow-sm relative overflow-hidden group hover:-translate-y-1 transition-transform">
          <div className="flex items-start justify-between relative z-10">
             <div className="w-12 h-12 bg-primary-container text-primary rounded-2xl flex items-center justify-center">
               <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>inventory_2</span>
             </div>
             <span className="text-tertiary-container px-3 py-1 rounded-full text-[10px] font-bold bg-tertiary/10 tracking-wider">IN STOCK</span>
          </div>
          <div className="mt-6 relative z-10">
            <div className="text-3xl font-headline font-extrabold text-on-surface">14,204</div>
            <div className="text-sm font-medium text-on-surface-variant mt-1">Total Products</div>
          </div>
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
        </div>

        <div className="bg-error-container/20 p-6 rounded-[2rem] border border-error/10 shadow-sm relative overflow-hidden group hover:-translate-y-1 transition-transform">
          <div className="flex items-start justify-between relative z-10">
             <div className="w-12 h-12 bg-error/10 text-error rounded-2xl flex items-center justify-center">
               <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>warning</span>
             </div>
             <span className="text-error px-3 py-1 rounded-full text-[10px] font-bold bg-error/10 tracking-wider">ACTION REQ</span>
          </div>
          <div className="mt-6 relative z-10">
            <div className="text-3xl font-headline font-extrabold text-on-surface">23</div>
            <div className="text-sm font-medium text-error mt-1">Low / Out of Stock</div>
          </div>
        </div>

        <div className="bg-surface-container-low p-6 rounded-[2rem] border border-outline-variant/20 shadow-sm relative overflow-hidden group hover:-translate-y-1 transition-transform">
          <div className="flex items-start justify-between relative z-10">
             <div className="w-12 h-12 bg-secondary-container text-on-secondary-container rounded-2xl flex items-center justify-center">
               <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>call_received</span>
             </div>
             <span className="text-secondary px-3 py-1 rounded-full text-[10px] font-bold bg-secondary/10 tracking-wider">INCOMING</span>
          </div>
          <div className="mt-6 relative z-10">
            <div className="text-3xl font-headline font-extrabold text-on-surface">12</div>
            <div className="text-sm font-medium text-on-surface-variant mt-1">Pending Receipts</div>
          </div>
        </div>

        <div className="brand-gradient p-6 rounded-[2rem] shadow-lg relative overflow-hidden group hover:-translate-y-1 transition-transform">
          <div className="flex items-start justify-between relative z-10">
             <div className="w-12 h-12 bg-white/20 text-white rounded-2xl flex items-center justify-center">
               <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>local_shipping</span>
             </div>
             <span className="text-white px-3 py-1 rounded-full text-[10px] font-bold bg-white/20 tracking-wider">OUTGOING</span>
          </div>
          <div className="mt-6 relative z-10">
            <div className="text-3xl font-headline font-extrabold text-white">45</div>
            <div className="text-sm font-medium text-white/80 mt-1">Pending Deliveries</div>
          </div>
          <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* Active Operations & Pending Transfers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-[2.5rem] shadow-sm border border-outline-variant/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-headline font-bold text-xl">Recent Operations</h3>
            <Link to="/transfers" className="text-primary text-sm font-bold hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-on-surface-variant/70 font-bold text-[10px] uppercase tracking-[0.1em] border-b border-outline-variant/20">
                  <th className="pb-4">Reference</th>
                  <th className="pb-4">Type</th>
                  <th className="pb-4">Contact / Location</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                <tr className="group hover:bg-surface-container-highest/50 transition-colors">
                  <td className="py-4 font-bold text-primary">WH/IN/00021</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm text-secondary">call_received</span>
                      <span className="text-sm font-medium">Receipt</span>
                    </div>
                  </td>
                  <td className="py-4 text-sm font-medium">Vendor A</td>
                  <td className="py-4">
                     <span className="inline-flex items-center px-2.5 py-1 bg-tertiary-container/50 text-tertiary-fixed-dim rounded-full text-[10px] font-bold uppercase tracking-wider">Ready</span>
                  </td>
                  <td className="py-4 text-right text-sm text-on-surface-variant">Today, 10:45 AM</td>
                </tr>
                <tr className="group hover:bg-surface-container-highest/50 transition-colors">
                  <td className="py-4 font-bold text-primary">WH/OUT/00045</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm text-primary">local_shipping</span>
                      <span className="text-sm font-medium">Delivery</span>
                    </div>
                  </td>
                  <td className="py-4 text-sm font-medium">Client B</td>
                  <td className="py-4">
                     <span className="inline-flex items-center px-2.5 py-1 bg-error-container/50 text-error rounded-full text-[10px] font-bold uppercase tracking-wider">Waiting</span>
                  </td>
                  <td className="py-4 text-right text-sm text-on-surface-variant">Yesterday, 14:20</td>
                </tr>
                <tr className="group hover:bg-surface-container-highest/50 transition-colors">
                  <td className="py-4 font-bold text-primary">WH/INT/00012</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm text-tertiary">swap_horiz</span>
                      <span className="text-sm font-medium">Internal</span>
                    </div>
                  </td>
                  <td className="py-4 text-sm font-medium">Zone A → Zone B</td>
                  <td className="py-4">
                     <span className="inline-flex items-center px-2.5 py-1 bg-surface-container-highest text-on-surface-variant rounded-full text-[10px] font-bold uppercase tracking-wider">Draft</span>
                  </td>
                  <td className="py-4 text-right text-sm text-on-surface-variant">Oct 24, 2024</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-surface-container-low rounded-[2.5rem] p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-headline font-bold text-xl mb-6">Internal Transfers Scheduled</h3>
            <div className="space-y-4">
              <div className="bg-surface-container-lowest p-4 rounded-2xl flex items-center justify-between border border-outline-variant/20 group hover:border-primary/30 transition-colors cursor-pointer">
                <div>
                  <div className="font-bold text-sm">Zone A → Assembly</div>
                  <div className="text-xs text-on-surface-variant mt-1">Steel Rods (50 units)</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-4 rounded-2xl flex items-center justify-between border border-outline-variant/20 group hover:border-primary/30 transition-colors cursor-pointer">
                <div>
                  <div className="font-bold text-sm">Main Store → Rack B</div>
                  <div className="text-xs text-on-surface-variant mt-1">Office Chairs (10 units)</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full mt-6 py-3 border-2 border-primary/20 text-primary font-bold rounded-xl hover:bg-primary/5 transition-colors">
            Schedule Transfer
          </button>
        </div>
      </div>
    </Layout>
  );
}
