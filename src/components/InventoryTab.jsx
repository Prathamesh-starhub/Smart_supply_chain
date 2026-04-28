import React, { useState } from "react";
import { FaQrcode } from "react-icons/fa";

const categories = ["All", "Electronics", "Pharma", "FMCG", "Industrial", "Textiles"];
const statusColors = {
  "In Stock": "bg-[#00c2b2]",
  "Low Stock": "bg-yellow-500",
  "Critical": "bg-red-600",
  "Out of Stock": "bg-gray-700",
};

const inventoryData = [
  { sku: "SKU-ELC-0221", product: "Resistors 10kΩ", category: "Electronics", stock: 42, location: "WH-1 Nagpur", status: "Low Stock", nanotag: "QR" },
  { sku: "SKU-ELC-0442", product: "Capacitors 100μF", category: "Electronics", stock: 380, location: "WH-1 Nagpur", status: "In Stock", nanotag: "QR" },
  { sku: "SKU-PHA-0831", product: "Paracetamol 500mg", category: "Pharma", stock: 8420, location: "WH-3 Nagpur", status: "In Stock", nanotag: "QR" },
  { sku: "SKU-PHA-0889", product: "Insulin Vials", category: "Pharma", stock: 192, location: "Cold WH-2", status: "Low Stock", nanotag: "QR" },
  { sku: "SKU-FMG-0012", product: "Biscuit Pack 200g", category: "FMCG", stock: 15200, location: "WH-4 Mumbai", status: "In Stock", nanotag: "QR" },
  { sku: "SKU-FMG-0631", product: "Shampoo 200ml", category: "FMCG", stock: 4100, location: "WH-4 Mumbai", status: "In Stock", nanotag: "QR" },
  { sku: "SKU-IND-0855", product: "Steel Bolts M8", category: "Industrial", stock: 22000, location: "WH-5 Pune", status: "In Stock", nanotag: "QR" },
  { sku: "SKU-IND-0088", product: "Hydraulic Seals", category: "Industrial", stock: 15, location: "WH-5 Pune", status: "Critical", nanotag: "QR" },
  { sku: "SKU-TEX-0221", product: "Cotton Fabric 40s", category: "Textiles", stock: 820, location: "WH-6 Surat", status: "In Stock", nanotag: "QR" },
  { sku: "SKU-TEX-0084", product: "Polyester Blend", category: "Textiles", stock: 0, location: "WH-6 Surat", status: "Out of Stock", nanotag: "QR" },
  { sku: "SKU-ELC-0380", product: "Arduino Nano", category: "Electronics", stock: 234, location: "WH-1 Nagpur", status: "In Stock", nanotag: "QR" },
  { sku: "SKU-PHA-0129", product: "Vitamin D3 Strips", category: "Pharma", stock: 6200, location: "WH-3 Nagpur", status: "In Stock", nanotag: "QR" },
];

export default function InventoryTab() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [qrModal, setQrModal] = useState(null);

  const filtered = inventoryData.filter(
    (row) =>
      (category === "All" || row.category === category) &&
      (row.sku.toLowerCase().includes(search.toLowerCase()) ||
        row.product.toLowerCase().includes(search.toLowerCase()) ||
        row.category.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="w-full">
      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <input
          className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2 text-slate-900 shadow-sm"
          placeholder="Search SKU, product name, category..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-slate-900 shadow-sm"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          {categories.map(cat => <option key={cat}>{cat}</option>)}
        </select>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-slate-100 text-slate-500">
              <th className="p-3 text-left">SKU</th>
              <th className="p-3 text-left">PRODUCT</th>
              <th className="p-3 text-left">CATEGORY</th>
              <th className="p-3 text-left">STOCK</th>
              <th className="p-3 text-left">LOCATION</th>
              <th className="p-3 text-left">STATUS</th>
              <th className="p-3 text-left">NANOTAG</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={row.sku} className="border-b border-gray-200 hover:bg-slate-50 transition">
                <td className="p-3 text-teal-600 font-mono">{row.sku}</td>
                <td className="p-3 text-slate-900">{row.product}</td>
                <td className="p-3 text-slate-700">{row.category}</td>
                <td className="p-3 text-slate-700">{row.stock}</td>
                <td className="p-3 text-slate-700">{row.location}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[row.status]} text-white`}>
                    {row.status}
                  </span>
                </td>
                <td className="p-3">
                  <button
                    className="bg-[#00c2b2] hover:bg-[#089e8e] text-white px-3 py-1 rounded flex items-center gap-1"
                    onClick={() => setQrModal(row)}
                  >
                    <FaQrcode /> QR
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* QR Modal */}
      {qrModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white border border-gray-200 rounded-xl p-8 min-w-[300px] flex flex-col items-center shadow-lg">
            <FaQrcode className="text-5xl text-[#00c2b2] mb-4" />
            <div className="text-slate-900 font-bold mb-2">{qrModal.product}</div>
            <div className="text-slate-500 mb-4">{qrModal.sku}</div>
            <button
              className="mt-2 px-4 py-2 bg-[#00c2b2] rounded text-white hover:bg-[#089e8e]"
              onClick={() => setQrModal(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}