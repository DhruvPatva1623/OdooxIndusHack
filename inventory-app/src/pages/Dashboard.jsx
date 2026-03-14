import React from 'react';
import Layout from '../components/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { showToast } from '../components/Toast';

export default function Dashboard() {
  const navigate = useNavigate();

  const kpiCards = [
    { label: 'Total Products', value: '14,204', badge: 'IN STOCK', badgeColor: 'text-tertiary bg-tertiary/10', icon: 'inventory_2', iconBg: 'bg-primary-container text-primary', link: '/products', bg: 'bg-surface-container-low border-outline-variant/20' },
    { label: 'Low / Out of Stock', value: '23', badge: 'ACTION REQ', badgeColor: 'text-error bg-error/10', icon: 'warning', iconBg: 'bg-error/10 text-error', link: '/stock-levels', bg: 'bg-error-container/20 border-error/10', valueColor: 'text-error' },
    { label: 'Pending Receipts', value: '12', badge: 'INCOMING', badgeColor: 'text-secondary bg-secondary/10', icon: 'call_received', iconBg: 'bg-secondary-container text-on-secondary-container', link: '/receipts', bg: 'bg-surface-container-low border-outline-variant/20' },
    { label: 'Pending Deliveries', value: '45', badge: 'OUTGOING', badgeColor: 'text-white bg-white/20', icon: 'local_shipping', iconBg: 'bg-white/20 text-white', link: '/deliveries', bg: 'brand-gradient border-transparent', white: true },
  ];

  return (
    <Layout>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-headline font-extrabold text-on-surface">Operations Dashboard</h2>
          <p className="text-on-surface-variant font-medium mt-1">Real-time overview of inventory movements.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => showToast({ title: 'Filters', message: 'Filter by date range, warehouse, or operation type.', type: 'info' })}
            className="px-4 py-2 bg-surface-container-highest rounded-xl text-sm font-semibold text-on-surface hover:bg-outline-variant transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">filter_list</span>
            Filters
          </button>
          {/* New Operation — quick-access dropdown to main operations */}
          <div className="relative group">
            <button className="px-5 py-2 brand-gradient text-on-primary rounded-xl font-bold shadow-md hover:scale-[1.02] transition-transform flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">add</span>
              New Operation
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>
            <div className="absolute right-0 top-full mt-2 w-52 bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/20 overflow-hidden z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 translate-y-1 group-hover:translate-y-0">
              {[
                { label: 'New Receipt', icon: 'call_received', path: '/receipts' },
                { label: 'New Delivery', icon: 'local_shipping', path: '/deliveries' },
                { label: 'New Transfer', icon: 'swap_horiz', path: '/transfers' },
                { label: 'Stock Adjustment', icon: 'tune', path: '/adjustments' },
              ].map(item => (
                <Link key={item.path} to={item.path} className="flex items-center gap-3 px-4 py-3 hover:bg-surface-container-high transition-colors text-sm font-medium text-on-surface">
                  <span className="material-symbols-outlined text-primary text-[18px]">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard KPIs Grid — all clickable */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((card) => (
          <Link
            key={card.label}
            to={card.link}
            className={`${card.bg} p-6 rounded-[2rem] border shadow-sm relative overflow-hidden group hover:-translate-y-1 transition-transform block`}
          >
            <div className="flex items-start justify-between relative z-10">
              <div className={`w-12 h-12 ${card.iconBg} rounded-2xl flex items-center justify-center`}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{card.icon}</span>
              </div>
              <span className={`${card.badgeColor} px-3 py-1 rounded-full text-[10px] font-bold tracking-wider`}>{card.badge}</span>
            </div>
            <div className="mt-6 relative z-10">
              <div className={`text-3xl font-headline font-extrabold ${card.white ? 'text-white' : card.valueColor || 'text-on-surface'}`}>{card.value}</div>
              <div className={`text-sm font-medium mt-1 ${card.white ? 'text-white/80' : card.valueColor ? card.valueColor : 'text-on-surface-variant'}`}>{card.label}</div>
            </div>
            {!card.white && <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>}
            {card.white && <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>}
          </Link>
        ))}
      </div>

      {/* Active Operations & Pending Transfers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-[2.5rem] shadow-sm border border-outline-variant/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-headline font-bold text-xl">Recent Operations</h3>
            <Link to="/history" className="text-primary text-sm font-bold hover:underline">View All</Link>
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
                {[
                  { ref: 'WH/IN/00021', icon: 'call_received', iconColor: 'text-secondary', type: 'Receipt', contact: 'Vendor A', status: 'Ready', statusColor: 'bg-tertiary-container/50 text-tertiary-fixed-dim', date: 'Today, 10:45 AM', path: '/receipts' },
                  { ref: 'WH/OUT/00045', icon: 'local_shipping', iconColor: 'text-primary', type: 'Delivery', contact: 'Client B', status: 'Waiting', statusColor: 'bg-error-container/50 text-error', date: 'Yesterday, 14:20', path: '/deliveries' },
                  { ref: 'WH/INT/00012', icon: 'swap_horiz', iconColor: 'text-tertiary', type: 'Internal', contact: 'Zone A → Zone B', status: 'Draft', statusColor: 'bg-surface-container-highest text-on-surface-variant', date: 'Oct 24, 2024', path: '/transfers' },
                ].map(row => (
                  <tr key={row.ref} onClick={() => navigate(row.path)} className="group hover:bg-surface-container-highest/50 transition-colors cursor-pointer">
                    <td className="py-4 font-bold text-primary">{row.ref}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <span className={`material-symbols-outlined text-sm ${row.iconColor}`}>{row.icon}</span>
                        <span className="text-sm font-medium">{row.type}</span>
                      </div>
                    </td>
                    <td className="py-4 text-sm font-medium">{row.contact}</td>
                    <td className="py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 ${row.statusColor} rounded-full text-[10px] font-bold uppercase tracking-wider`}>{row.status}</span>
                    </td>
                    <td className="py-4 text-right text-sm text-on-surface-variant">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-surface-container-low rounded-[2.5rem] p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-headline font-bold text-xl mb-6">Internal Transfers Scheduled</h3>
            <div className="space-y-4">
              {[
                { label: 'Zone A → Assembly', sub: 'Steel Rods (50 units)' },
                { label: 'Main Store → Rack B', sub: 'Office Chairs (10 units)' },
              ].map((t) => (
                <button
                  key={t.label}
                  onClick={() => navigate('/transfers')}
                  className="w-full bg-surface-container-lowest p-4 rounded-2xl flex items-center justify-between border border-outline-variant/20 group hover:border-primary/30 transition-colors text-left"
                >
                  <div>
                    <div className="font-bold text-sm">{t.label}</div>
                    <div className="text-xs text-on-surface-variant mt-1">{t.sub}</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors shrink-0">
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <Link to="/transfers" className="w-full mt-6 py-3 border-2 border-primary/20 text-primary font-bold rounded-xl hover:bg-primary/5 transition-colors block text-center">
            Schedule Transfer
          </Link>
        </div>
      </div>
    </Layout>
  );
}
