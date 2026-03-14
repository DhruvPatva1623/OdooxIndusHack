import React, { useState } from 'react';
import Layout from '../components/Layout';
import { showToast } from '../components/Toast';

const historyData = [
  { ref: 'WH/IN/00021', type: 'Receipt', product: 'Steel Rods 10mm', sku: 'RAW-STL-10', from: 'Vendor', to: 'Main Store', qty: '+100', date: 'Today, 10:45 AM', status: 'Done' },
  { ref: 'WH/INT/00012', type: 'Internal', product: 'Steel Rods 10mm', sku: 'RAW-STL-10', from: 'Main Store', to: 'Production Rack', qty: '−50', date: 'Today, 11:00 AM', status: 'Draft' },
  { ref: 'WH/OUT/00046', type: 'Delivery', product: 'Ergonomic Office Chair', sku: 'FURN-00129', from: 'Rack A', to: 'Customer', qty: '−10', date: 'Yesterday', status: 'Done' },
  { ref: 'WH/ADJ/00021', type: 'Adjustment', product: 'Steel Rods 10mm', sku: 'RAW-STL-10', from: 'Main Store', to: 'Main Store', qty: '−3', date: 'Today, 08:30 AM', status: 'Done' },
  { ref: 'WH/OUT/00045', type: 'Delivery', product: 'Standing Desk V2', sku: 'FURN-00445', from: 'Rack B', to: 'Customer', qty: '−5', date: 'Oct 23, 2024', status: 'Waiting' },
  { ref: 'WH/INT/00011', type: 'Internal', product: 'Steel Rods 10mm', sku: 'RAW-STL-10', from: 'Warehouse 1', to: 'Warehouse 2', qty: '−0', date: 'Oct 22, 2024', status: 'Done' },
];

const typeStyles = {
  Receipt:    { icon: 'call_received', bg: 'bg-secondary/10 text-secondary' },
  Delivery:   { icon: 'local_shipping', bg: 'bg-primary/10 text-primary' },
  Internal:   { icon: 'swap_horiz', bg: 'bg-tertiary/10 text-tertiary' },
  Adjustment: { icon: 'tune', bg: 'bg-error/10 text-error' },
};

const statusBadge = {
  Done:    'bg-tertiary-container text-on-tertiary-container',
  Draft:   'bg-surface-container-highest text-on-surface-variant',
  Waiting: 'bg-error-container text-on-error-container',
};

const FILTERS = ['All', 'Receipts', 'Deliveries', 'Internal', 'Adjustments'];
const FILTER_MAP = { All: null, Receipts: 'Receipt', Deliveries: 'Delivery', Internal: 'Internal', Adjustments: 'Adjustment' };

export default function MoveHistory() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = historyData.filter(row => {
    const typeMatch = !FILTER_MAP[activeFilter] || row.type === FILTER_MAP[activeFilter];
    const searchMatch = !search || row.ref.toLowerCase().includes(search.toLowerCase()) || row.product.toLowerCase().includes(search.toLowerCase());
    return typeMatch && searchMatch;
  });

  function handleExport() {
    showToast({ title: 'Ledger Export', message: 'Generating full stock movement report as CSV...', type: 'info' });
  }

  function handleRowClick(row) {
    showToast({ title: row.ref, message: `${row.type}: ${row.product} (${row.qty} units) — ${row.from} → ${row.to}`, type: 'info' });
  }

  return (
    <Layout>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-headline font-extrabold text-on-surface">Move History</h2>
          <p className="text-on-surface-variant font-medium mt-1">Complete audit trail for all stock movements.</p>
        </div>
        <button onClick={handleExport} className="px-4 py-2 bg-surface-container-highest rounded-xl text-sm font-semibold text-on-surface hover:bg-outline-variant transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">file_download</span>
          Export Ledger
        </button>
      </div>

      {/* Filter pills */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {FILTERS.map((f, i) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
              activeFilter === f
                ? 'brand-gradient text-on-primary shadow-md'
                : 'bg-surface-container-lowest border border-outline-variant/20 text-on-surface-variant hover:border-primary/30 hover:text-primary'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Main Table */}
      <div className="bg-surface-container-lowest rounded-[2.5rem] shadow-sm border border-outline-variant/20 overflow-hidden">
        <div className="px-8 py-5 border-b border-outline-variant/10 flex items-center justify-between">
          <div className="relative w-72">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-surface-container-low border-none rounded-full pl-12 pr-6 py-2.5 text-sm w-full focus:ring-2 focus:ring-primary transition-all"
              placeholder="Search product, reference..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
            <span className="material-symbols-outlined text-sm">info</span>
            {filtered.length} of {historyData.length} records
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-on-surface-variant/70 font-bold text-[10px] uppercase tracking-[0.1em] border-b border-outline-variant/10 bg-surface-container-low/60">
                <th className="px-8 py-4">Reference</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">From → To</th>
                <th className="px-6 py-4 text-center">Qty Change</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-8 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-8 py-16 text-center text-on-surface-variant text-sm">
                    <span className="material-symbols-outlined text-4xl mb-3 block opacity-30">search_off</span>
                    No records match your filter.
                  </td>
                </tr>
              )}
              {filtered.map((row, i) => {
                const t = typeStyles[row.type];
                const s = statusBadge[row.status] || statusBadge.Draft;
                const isPlus = row.qty.startsWith('+');
                const isMinus = row.qty.startsWith('−');
                return (
                  <tr key={i} onClick={() => handleRowClick(row)} className="group hover:bg-surface-container-highest/30 transition-colors cursor-pointer">
                    <td className="px-8 py-4 font-bold text-primary">{row.ref}</td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg ${t.bg} text-xs font-semibold`}>
                        <span className="material-symbols-outlined text-sm">{t.icon}</span>
                        {row.type}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-sm">{row.product}</p>
                      <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">{row.sku}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant font-medium">{row.from} → {row.to}</td>
                    <td className="px-6 py-4 text-center font-bold text-lg">
                      <span className={isPlus ? 'text-primary' : isMinus ? 'text-error' : 'text-on-surface-variant'}>{row.qty}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">{row.date}</td>
                    <td className="px-8 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${s}`}>{row.status}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
