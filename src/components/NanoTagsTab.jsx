import React from "react";

const stats = [
  { label: "Total Tags", value: "1,204" },
  { label: "Active Tags", value: "1,187" },
  { label: "Alerts", value: "17" },
  { label: "Last Sync", value: "2m ago" },
];

const nanoTags = [
  {
    id: "NT-0892",
    name: "Paracetamol Batch Q1-2026",
    location: "WH-3 Nagpur",
    temp: "22.4°C",
    humidity: "48%",
    status: "Warning",
  },
  {
    id: "NT-0201",
    name: "Insulin Vials — Cold Chain",
    location: "Cold WH-2",
    temp: "5.2°C",
    humidity: "62%",
    status: "Active",
  },
  {
    id: "NT-0310",
    name: "Biscuit Pack Batch-12",
    location: "WH-4 Mumbai",
    temp: "21°C",
    humidity: "55%",
    status: "Active",
  },
  {
    id: "NT-0411",
    name: "Capacitor Batch Q2-2026",
    location: "WH-1 Nagpur",
    temp: "24.1°C",
    humidity: "47%",
    status: "Active",
  },
  {
    id: "NT-0501",
    name: "Steel Bolts Batch-7",
    location: "WH-5 Pune",
    temp: "28.0°C",
    humidity: "40%",
    status: "Active",
  },
  {
    id: "NT-0402",
    name: "Vitamin D3 Strips Q2-2026",
    location: "WH-3 Nagpur",
    temp: "23.5°C",
    humidity: "50%",
    status: "Active",
  },
];

const statusColors = {
  "Active": "bg-[#00c2b2]",
  "Warning": "bg-yellow-600",
};

export default function NanoTagsTab() {
  return (
    <div className="w-full">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center shadow-sm">
            <span className="text-slate-500 text-xs">{stat.label}</span>
            <span className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</span>
          </div>
        ))}
      </div>
      {/* NanoTag Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {nanoTags.map((tag) => (
          <div key={tag.id} className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-2 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-teal-600 font-mono font-bold">{tag.id}</span>
              <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[tag.status]} text-white`}>
                {tag.status}
              </span>
            </div>
            <div className="text-slate-900 font-semibold">{tag.name}</div>
            <div className="text-slate-500 text-xs">{tag.location}</div>
            <div className="flex gap-4 mt-2 text-sm">
              <span>🌡️ {tag.temp}</span>
              <span>💧 {tag.humidity}</span>
            </div>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 bg-[#00c2b2] hover:bg-[#089e8e] text-white px-3 py-1 rounded font-semibold">View QR & Details</button>
              <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-900 px-3 py-1 rounded font-semibold">Track Live</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}