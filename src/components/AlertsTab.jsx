import React from "react";

const summary = [
  { label: "Critical", value: 3, color: "bg-red-700" },
  { label: "Warning", value: 4, color: "bg-yellow-700" },
  { label: "Info", value: 12, color: "bg-blue-700" },
  { label: "Resolved Today", value: 8, color: "bg-green-700" },
];

const alerts = [
  { type: "Critical", title: "Temperature excursion — NT-0892 (Paracetamol Batch)", desc: "Temp: 29.1°C (threshold: 25°C) - WH-3 Nagpur - Detected 2 hrs ago" },
  { type: "Critical", title: "Stock critical — SKU-IND-0088 (Hydraulic Seals)", desc: "15 units remaining - Lead time: 7 days" },
  { type: "Critical", title: "Shipment SHP-0291 significantly delayed", desc: "Route blocked near Wardha - ETA extended by 6 hrs" },
  { type: "Warning", title: "Low stock — SKU-ELC-0221 (Resistors 10kΩ)", desc: "42 units - Reorder threshold: 100" },
  { type: "Warning", title: "Carrier SLA breach risk — SHP-0279", desc: "Current ETA 6:00 PM - SLA deadline 5:00 PM" },
  { type: "Warning", title: "Supplier delivery delay — Tata Components", desc: "PO-2891 delayed 2 days" },
  { type: "Warning", title: "Humidity high — Cold WH-2", desc: "Humidity: 78% (threshold: 70%)" },
  { type: "Info", title: "Demand forecast: spike expected for SKU-NAG-0442", desc: "AI predicts 340% demand increase in 72hrs" },
  { type: "Info", title: "New supplier onboarded — Reliance Industries", desc: "3 SKUs mapped" },
];

const typeColors = {
  "Critical": "bg-red-800",
  "Warning": "bg-yellow-800",
  "Info": "bg-blue-800",
};

export default function AlertsTab() {
  return (
    <div className="w-full">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {summary.map((s) => (
          <div key={s.label} className={`rounded-xl p-4 flex flex-col items-center ${s.color}`}>
            <span className="text-gray-100 text-xs">{s.label}</span>
            <span className="text-2xl font-bold text-white mt-1">{s.value}</span>
          </div>
        ))}
      </div>
      {/* Alerts List */}
      <div className="space-y-3">
        {alerts.map((alert, i) => (
          <div key={i} className={`rounded-xl p-4 text-white ${typeColors[alert.type]}`}>
            <div className="font-bold">{alert.title}</div>
            <div className="text-slate-100 text-xs">{alert.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}