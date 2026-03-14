import React, { useState } from 'react';
import Layout from '../components/Layout';

export default function Products() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <Layout>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-headline font-extrabold text-on-surface">Products</h2>
          <p className="text-on-surface-variant font-medium mt-1">Manage your catalog, stock availability, and categories.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-surface-container-highest rounded-xl text-sm font-semibold text-on-surface hover:bg-outline-variant transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">file_download</span>
            Export
          </button>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="px-5 py-2 brand-gradient text-on-primary rounded-xl font-bold shadow-md hover:scale-[1.02] transition-transform flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Create Product
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-surface-container-lowest rounded-[2.5rem] shadow-sm border border-outline-variant/20 p-4">
        <div className="flex items-center justify-between px-6 py-6 border-b border-outline-variant/10">
          <div className="relative w-72">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
            <input className="bg-surface-container-low border-none rounded-full pl-12 pr-6 py-2.5 text-sm w-full focus:ring-2 focus:ring-primary transition-all" placeholder="Search by name, SKU..." type="text" />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest rounded-xl text-sm font-semibold text-on-surface hover:bg-outline-variant transition-colors">
              <span className="material-symbols-outlined text-sm">filter_alt</span>
              Filter by Category
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-on-surface-variant/70 font-bold text-[10px] uppercase tracking-[0.1em] border-b border-outline-variant/10">
                <th className="px-8 py-4">Product Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">UoM</th>
                <th className="px-6 py-4 text-right">In Stock</th>
                <th className="px-8 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              <tr className="group hover:bg-surface-container-highest/30 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">chair</span>
                    </div>
                    <div>
                      <p className="font-bold text-on-surface">Ergonomic Office Chair</p>
                      <p className="text-xs text-on-surface-variant font-medium">SKU: FURN-00129</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <span className="inline-flex items-center px-3 py-1 bg-surface-container-high rounded-lg text-xs font-semibold">Furniture</span>
                </td>
                <td className="px-6 py-6 text-sm font-medium">Units</td>
                <td className="px-6 py-6 text-right font-bold text-primary">1,240</td>
                <td className="px-8 py-6 text-center">
                  <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-sm">more_horiz</span>
                  </button>
                </td>
              </tr>
              <tr className="group hover:bg-surface-container-highest/30 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined">construction</span>
                    </div>
                    <div>
                      <p className="font-bold text-on-surface">Steel Rods 10mm</p>
                      <p className="text-xs text-on-surface-variant font-medium">SKU: RAW-STL-10</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <span className="inline-flex items-center px-3 py-1 bg-surface-container-high rounded-lg text-xs font-semibold">Raw Materials</span>
                </td>
                <td className="px-6 py-6 text-sm font-medium">kg</td>
                <td className="px-6 py-6 text-right font-bold text-on-surface">8,500</td>
                <td className="px-8 py-6 text-center">
                  <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-sm">more_horiz</span>
                  </button>
                </td>
              </tr>
              <tr className="group hover:bg-surface-container-highest/30 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">inventory</span>
                    </div>
                    <div>
                      <p className="font-bold text-on-surface">Standing Desk V2</p>
                      <p className="text-xs text-on-surface-variant font-medium">SKU: FURN-00445</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <span className="inline-flex items-center px-3 py-1 bg-surface-container-high rounded-lg text-xs font-semibold">Furniture</span>
                </td>
                <td className="px-6 py-6 text-sm font-medium">Units</td>
                <td className="px-6 py-6 text-right font-bold text-error">12</td>
                <td className="px-8 py-6 text-center">
                  <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-sm">more_horiz</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal overlay */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-surface-container-lowest w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-outline-variant/20 flex items-center justify-between bg-surface-container-low">
              <h3 className="font-headline font-bold text-xl">Create New Product</h3>
              <button onClick={() => setShowCreateModal(false)} className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center hover:bg-error/10 hover:text-error transition-colors">
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Product Name *</label>
                  <input type="text" className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="e.g. Ergonomic Keyboard" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">SKU / Code *</label>
                  <input type="text" className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="e.g. TECH-001" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Category</label>
                  <select className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none">
                    <option>Select Category...</option>
                    <option>Furniture</option>
                    <option>Raw Materials</option>
                    <option>Electronics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Unit of Measure</label>
                  <select className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none">
                    <option>Units</option>
                    <option>kg</option>
                    <option>Liters</option>
                    <option>Meters</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Initial Stock</label>
                  <input type="number" className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="0" />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-outline-variant/20 bg-surface-container-low flex justify-end gap-3">
              <button onClick={() => setShowCreateModal(false)} className="px-6 py-2.5 bg-surface-container-highest text-on-surface font-bold rounded-xl hover:bg-outline-variant/30 transition-colors">
                Cancel
              </button>
              <button onClick={() => setShowCreateModal(false)} className="px-6 py-2.5 brand-gradient text-on-primary font-bold rounded-xl shadow-md hover:scale-[1.02] transition-transform">
                Save Product
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
