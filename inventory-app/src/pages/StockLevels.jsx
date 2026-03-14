import React, { useState } from 'react';
import Layout from '../components/Layout';
import { showToast } from '../components/Toast';
import { useNavigate } from 'react-router-dom';

const stockData = [
  { name: 'Ergonomic Office Chair V2', sku: 'FURN-00129', icon: 'package_2', cost: '₹189.50', onHand: 1240, free: 1118, status: 'Ready', statusColor: 'bg-tertiary-container text-on-tertiary-container' },
  { name: 'Standing Desk Converter', sku: 'FURN-00130', icon: 'inventory', cost: '₹295.00', onHand: 430, free: 400, status: 'Transit', statusColor: 'bg-surface-container-highest text-on-surface-variant' },
  { name: 'Monitor Arm Array', sku: 'TECH-99120', icon: 'warning', cost: '₹120.00', onHand: 12, free: 12, status: 'Low Stock', statusColor: 'bg-error-container text-on-error-container', alert: true },
];

export default function StockLevels() {
  const navigate = useNavigate();
  const [view, setView] = useState('list');
  const [activeFilter, setActiveFilter] = useState('All Stock');

  function handleQuickInbound() {
    navigate('/quick-inbound');
  }

  function handleAudit() {
    navigate('/inventory-audit');
  }

  function handleEdit(name) {
    showToast({ title: 'Editing: ' + name, message: 'Stock level editor — update on-hand quantity, unit cost, and reorder point.', type: 'info' });
  }

  function handleFilter() {
    showToast({ title: 'Filter Stock', message: 'Filter by category, location, or threshold level.', type: 'info' });
  }

  const filters = ['All Stock', 'In-House', 'Transit'];

  return (
    <Layout>
      {/* Hero Stats / Bento Section */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8 brand-gradient p-8 rounded-[2rem] text-on-primary relative overflow-hidden flex flex-col justify-between h-64">
          <div className="relative z-10">
            <span className="text-sm font-medium opacity-80 uppercase tracking-widest">Global Overview</span>
            <h2 className="text-4xl font-headline font-extrabold mt-2">Active Stock Control</h2>
            <p className="mt-4 max-w-md opacity-90 text-sm leading-relaxed">
              Manage your warehouse floor with surgical precision. Update SKU availability, track unit costs, and verify "Free to Use" quantities in real-time.
            </p>
          </div>
          <div className="relative z-10 flex gap-4">
            <button onClick={handleQuickInbound} className="bg-on-primary text-primary px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary-fixed transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">add_circle</span>
              Quick Inbound
            </button>
            <button onClick={handleAudit} className="bg-primary-container/20 text-on-primary border border-on-primary/20 px-6 py-3 rounded-xl font-bold text-sm hover:bg-on-primary/10 transition-colors">
              Inventory Audit
            </button>
          </div>
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-on-primary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="col-span-4 grid grid-rows-2 gap-6">
          <button onClick={() => showToast({ title: '12 Low Stock SKUs', message: 'Monitor Arm Array, Standing Desk V2 and 10 others need reordering.', type: 'warning' })} className="bg-tertiary-container p-6 rounded-[2rem] flex flex-col justify-center text-left hover:ring-2 hover:ring-tertiary/30 transition-all">
            <span className="text-xs font-bold text-on-tertiary-container/60 uppercase">Low Stock Alerts</span>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-3xl font-headline font-extrabold text-on-tertiary-container leading-none">12</span>
              <span className="text-xs font-bold text-on-tertiary-container mb-1">SKUs</span>
            </div>
          </button>
          <button onClick={() => showToast({ title: 'Total Asset Value', message: 'Current inventory valued at ₹142,840 across all warehouses.', type: 'info' })} className="bg-surface-container-high p-6 rounded-[2rem] flex flex-col justify-center text-left hover:ring-2 hover:ring-primary/20 transition-all">
            <span className="text-xs font-bold text-on-surface-variant/60 uppercase">Total Asset Value</span>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-3xl font-headline font-extrabold text-on-surface leading-none">₹142.8k</span>
            </div>
          </button>
        </div>
      </div>

      {/* Main Stock Management Card */}
      <div className="bg-surface-container-low rounded-[2.5rem] p-4">
        <div className="flex items-center justify-between px-6 py-6">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-headline font-bold">Stock Inventory</h3>
            <div className="flex gap-2 ml-4">
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${activeFilter === f ? 'bg-surface-container-highest text-primary' : 'hover:bg-surface-container-highest text-on-surface-variant'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* List / Grid view toggle */}
            <div className="flex bg-surface-container-highest p-1 rounded-xl">
              <button onClick={() => setView('list')} className={`p-2 rounded-lg transition-all ${view === 'list' ? 'bg-surface-container-lowest shadow-sm text-primary' : 'text-on-surface-variant'}`}>
                <span className="material-symbols-outlined">list</span>
              </button>
              <button onClick={() => setView('grid')} className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-surface-container-lowest shadow-sm text-primary' : 'text-on-surface-variant'}`}>
                <span className="material-symbols-outlined">grid_view</span>
              </button>
            </div>
            <button onClick={handleFilter} className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest rounded-xl text-sm font-semibold text-on-surface hover:bg-outline-variant transition-colors">
              <span className="material-symbols-outlined text-sm">filter_list</span>
              Filter
            </button>
          </div>
        </div>

        {view === 'list' ? (
          <div className="overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-on-surface-variant/70 font-bold text-[10px] uppercase tracking-[0.15em]">
                  <th className="px-8 py-4">Product Details</th>
                  <th className="px-6 py-4">Unit Cost</th>
                  <th className="px-6 py-4">On Hand</th>
                  <th className="px-6 py-4">Free to Use</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-transparent">
                {stockData.map((row) => (
                  <tr key={row.sku} className="group hover:bg-surface-container-highest transition-all duration-300">
                    <td className="px-8 py-6 first:rounded-l-[1.5rem]">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 bg-surface-container-high rounded-xl flex items-center justify-center ${row.alert ? 'text-error' : 'text-primary'}`}>
                          <span className="material-symbols-outlined">{row.icon}</span>
                        </div>
                        <div>
                          <p className="font-bold text-on-surface">{row.name}</p>
                          <p className="text-xs text-on-surface-variant font-medium">SKU: {row.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6"><span className="font-medium text-sm">{row.cost}</span></td>
                    <td className={`px-6 py-6 font-bold ${row.alert ? 'text-error' : 'text-on-surface'}`}>{row.onHand.toLocaleString()}</td>
                    <td className={`px-6 py-6 font-bold ${row.alert ? 'text-error' : 'text-primary'}`}>{row.free.toLocaleString()}</td>
                    <td className="px-6 py-6">
                      <span className={`inline-flex items-center px-3 py-1 ${row.statusColor} rounded-full text-[10px] font-bold uppercase tracking-wider`}>{row.status}</span>
                    </td>
                    <td className="px-8 py-6 text-right last:rounded-r-[1.5rem]">
                      <button onClick={() => handleEdit(row.name)} className="p-2 bg-primary-container text-on-primary-container rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:shadow-lg flex items-center gap-1 ml-auto">
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 p-4">
            {stockData.map(row => (
              <div key={row.sku} className={`p-6 rounded-[1.5rem] border ${row.alert ? 'border-error/20 bg-error-container/10' : 'border-outline-variant/20 bg-surface-container-lowest'} group hover:shadow-md transition-all`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${row.alert ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'}`}>
                  <span className="material-symbols-outlined">{row.icon}</span>
                </div>
                <p className="font-bold text-on-surface truncate">{row.name}</p>
                <p className="text-xs text-on-surface-variant mb-4">SKU: {row.sku}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-on-surface-variant">On Hand</p>
                    <p className={`text-xl font-headline font-extrabold ${row.alert ? 'text-error' : 'text-on-surface'}`}>{row.onHand.toLocaleString()}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${row.statusColor}`}>{row.status}</span>
                </div>
                <button onClick={() => handleEdit(row.name)} className="mt-4 w-full py-2 rounded-xl font-bold text-xs text-primary border border-primary/20 hover:bg-primary/10 transition-colors opacity-0 group-hover:opacity-100">
                  Edit Stock
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
