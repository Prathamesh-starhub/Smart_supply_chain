import React, { useState } from "react";
import { FaQrcode } from "react-icons/fa";

const statusColors = {
  "Delivered": "bg-[#00c2b2]",
  "In Transit": "bg-blue-500",
  "Processing": "bg-yellow-500",
  "Delayed": "bg-red-600",
};

const shipmentData = [
  { id: "SHP-8334", route: "Nagpur → Mumbai DC", carrier: "BlueDart", units: 98, eta: "Delivered", status: "Delivered", nanotag: "NT-0310" },
  { id: "SHP-8391", route: "Pune → Hyderabad", carrier: "DTDC", units: 240, eta: "Apr 28", status: "In Transit", nanotag: "NT-0401" },
  { id: "SHP-9292", route: "Mumbai → Delhi", carrier: "FedEx", units: 500, eta: "Apr 29", status: "In Transit", nanotag: "NT-0411" },
  { id: "SHP-0291", route: "Nagpur → Wardha", carrier: "IndiaMart Logi", units: 80, eta: "Apr 28 +delay", status: "Delayed", nanotag: "NT-0112" },
  { id: "SHP-9288", route: "Surat → Pune", carrier: "Delhivery", units: 1200, eta: "Apr 27", status: "Processing", nanotag: "" },
  { id: "SHP-0281", route: "Delhi → Kolkata", carrier: "BlueDart", units: 340, eta: "Delivered", status: "Delivered", nanotag: "NT-0501" },
  { id: "SHP-9279", route: "Bengaluru → Chennai", carrier: "Ekart", units: 600, eta: "Apr 27", status: "In Transit", nanotag: "NT-0312" },
  { id: "SHP-0271", route: "Mumbai → Nagpur", carrier: "DTDC", units: 192, eta: "Apr 27", status: "In Transit", nanotag: "NT-0421" },
  { id: "SHP-9265", route: "Hyderabad → Visakhapatnam", carrier: "FedEx", units: 90, eta: "Delivered", status: "Delivered", nanotag: "NT-0402" },
  { id: "SHP-0260", route: "Nagpur → Bhopal", carrier: "Delhivery", units: 420, eta: "Apr 27", status: "Processing", nanotag: "NT-1101" },
];

const statusOptions = ["All Status", "Delivered", "In Transit", "Processing", "Delayed"];

export default function ShipmentsTab() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [qrModal, setQrModal] = useState(null);

  const filtered = shipmentData.filter(
    (row) =>
      (status === "All Status" || row.status === status) &&
      (row.id.toLowerCase().includes(search.toLowerCase()) ||
        row.route.toLowerCase().includes(search.toLowerCase()) ||
        row.carrier.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="w-full">
      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <input
          className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2 text-slate-900 shadow-sm"
          placeholder="Search shipment ID, destination, carrier..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-slate-900 shadow-sm"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          {statusOptions.map(opt => <option key={opt}>{opt}</option>)}
        </select>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-slate-100 text-slate-500">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">ORIGIN → DEST</th>
              <th className="p-3 text-left">CARRIER</th>
              <th className="p-3 text-left">UNITS</th>
              <th className="p-3 text-left">ETA</th>
              <th className="p-3 text-left">STATUS</th>
              <th className="p-3 text-left">NANOTAG</th>
              <th className="p-3 text-left">QR</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={row.id} className="border-b border-gray-200 hover:bg-slate-50 transition">
                <td className="p-3 text-teal-600 font-mono">{row.id}</td>
                <td className="p-3 text-slate-900">{row.route}</td>
                <td className="p-3 text-slate-700">{row.carrier}</td>
                <td className="p-3 text-slate-700">{row.units}</td>
                <td className="p-3 text-slate-700">{row.eta}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[row.status]} text-white`}>
                    {row.status}
                  </span>
                </td>
                <td className="p-3">{row.nanotag}</td>
                <td className="p-3">
                  {row.nanotag && (
                    <button
                      className="bg-[#00c2b2] hover:bg-[#089e8e] text-white px-3 py-1 rounded flex items-center gap-1"
                      onClick={() => setQrModal(row)}
                    >
                      <FaQrcode /> QR
                    </button>
                  )}
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
            <div className="text-slate-900 font-bold mb-2">{qrModal.id}</div>
            <div className="text-slate-500 mb-4">{qrModal.nanotag}</div>
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