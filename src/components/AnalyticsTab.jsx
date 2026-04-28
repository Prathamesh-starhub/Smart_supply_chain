import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const demandForecast = [
  { day: "Mon", value: 850 },
  { day: "Tue", value: 950 },
  { day: "Wed", value: 1100 },
  { day: "Thu", value: 1200 },
  { day: "Fri", value: 1150 },
  { day: "Sat", value: 900 },
  { day: "Sun", value: 950 },
];

const supplierReliability = [
  { name: "Tata", value: 95 },
  { name: "Cipla", value: 93 },
  { name: "Parle", value: 90 },
  { name: "Reliance", value: 87 },
  { name: "Biocon", value: 94 },
];

const healthScores = [
  { label: "Electronics", value: 78, color: "bg-blue-500" },
  { label: "Pharma", value: 91, color: "bg-teal-400" },
  { label: "FMCG", value: 85, color: "bg-green-500" },
  { label: "Industrial", value: 44, color: "bg-red-600" },
  { label: "Textiles", value: 67, color: "bg-yellow-500" },
];

const recommendations = [
  {
    title: "Reorder SKU-IND-0088 (Hydraulic Seals) immediately — stock at 7.5%, lead time 7 days. Stockout risk in 3 days.",
    priority: "Critical",
  },
  {
    title: "Increase safety stock for Paracetamol 500mg due to rising demand.",
    priority: "Warning",
  },
  {
    title: "Monitor humidity for Cold WH-2, sensor flagged 78%.",
    priority: "Info",
  },
];

const priorityColors = {
  "Critical": "bg-red-700",
  "Warning": "bg-yellow-700",
  "Info": "bg-blue-700",
};

export default function AnalyticsTab() {
  return (
    <div className="w-full">
      {/* Banner */}
      <div className="bg-[#f8f4ff] border border-[#c4b5fd] rounded-xl p-3 text-[#4c1d95] mb-6 font-semibold">
        Predictive Engine Active: LSTM model trained on 18 months of supply data. Accuracy: 94.2%. Next retraining scheduled in 6 days.
      </div>
      {/* Charts */}
      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        {/* Line Chart */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 flex-1 shadow-sm">
          <div className="font-semibold text-slate-900 mb-2">Demand Forecast</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={demandForecast}>
              <XAxis dataKey="day" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#00c2b2" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* Bar Chart */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 flex-1 shadow-sm">
          <div className="font-semibold text-slate-900 mb-2">Supplier Reliability <span className="text-xs text-slate-500">(Q2 2026)</span></div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={supplierReliability}>
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Bar dataKey="value" fill="#00c2b2" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Inventory Health */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
        <div className="font-semibold text-slate-900 mb-4">Inventory Health Score <span className="text-xs text-slate-500">(by category)</span></div>
        <div className="space-y-3">
          {healthScores.map((h) => (
            <div key={h.label}>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">{h.label}</span>
                <span className="text-slate-900 font-bold">{h.value}/100</span>
              </div>
              <div className="w-full h-3 bg-slate-200 rounded">
                <div className={`${h.color} h-3 rounded`} style={{ width: `${h.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recommendations */}
      <div className="space-y-3">
        {recommendations.map((rec, i) => (
          <div key={i} className={`rounded-xl p-4 ${priorityColors[rec.priority]} text-white`}>
            <span className="font-semibold">{rec.title}</span>
            <span className="ml-2 text-xs text-slate-200">Priority: {rec.priority}</span>
          </div>
        ))}
      </div>
    </div>
  );
}