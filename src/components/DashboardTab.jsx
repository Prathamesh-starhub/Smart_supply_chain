import React from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FaLightbulb, FaRoute } from "react-icons/fa";

const stats = [
  { label: "Active SKUs", value: "2,847" },
  { label: "In Transit", value: "384" },
  { label: "On-Time Rate", value: "96.4%" },
  { label: "Alerts", value: "7" },
  { label: "NanoTags", value: "1,204" },
  { label: "AI Savings", value: "₹4.2M" },
];

const shipmentStatusData = [
  { name: "In Transit", value: 42, color: "#00c2b2" },
  { name: "Delivered", value: 38, color: "#3b82f6" },
  { name: "Processing", value: 12, color: "#f59e42" },
  { name: "Delayed", value: 8, color: "#ef4444" },
];

const weeklyThroughput = [
  { day: "Mon", units: 900 },
  { day: "Tue", units: 1000 },
  { day: "Wed", units: 850 },
  { day: "Thu", units: 1100 },
  { day: "Fri", units: 1200 },
  { day: "Sat", units: 950 },
  { day: "Sun", units: 980 },
];

const timeline = [
  { time: "2 min ago", desc: "Shipment SHP-0291 rerouted via NH-6" },
  { time: "1 hr ago", desc: "NanoTag NT-0892 temp excursion detected" },
  { time: "3 hr ago", desc: "Stockout risk for SKU-IND-0088" },
  { time: "5 hr ago", desc: "200 units pre-positioned at Nagpur" },
];

export default function DashboardTab() {
  return (
    <div className="w-full">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {stats.map((stat, i) => (
          <div key={stat.label} className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center shadow-sm">
            <span className="text-slate-500 text-xs">{stat.label}</span>
            <span className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</span>
          </div>
        ))}
      </div>
      {/* Insight Banners */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2 bg-[#f8f4ff] border border-[#c4b5fd] rounded-xl p-3 text-[#4338ca]">
          <FaLightbulb className="text-[#7c3aed]" />
          <span className="font-semibold">AI Insight:</span>
          <span>Demand spike predicted for <span className="font-bold text-slate-900">SKU-NAG-0442</span> in 72 hrs. Recommend pre-positioning 200 units at Nagpur warehouse.</span>
        </div>
        <div className="flex items-center gap-2 bg-[#f8f4ff] border border-[#c4b5fd] rounded-xl p-3 text-[#4338ca]">
          <FaRoute className="text-[#7c3aed]" />
          <span className="font-semibold">Route Optimization:</span>
          <span>Rerouting <span className="font-bold text-slate-900">SHP-0291</span> via NH-6 saves 4.2 hrs.</span>
        </div>
      </div>
      {/* Charts */}
      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        {/* Doughnut Chart */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 flex-1 flex flex-col items-center shadow-sm">
          <div className="font-semibold text-slate-900 mb-2">Shipment Status</div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={shipmentStatusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
              >
                {shipmentStatusData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-4 text-xs text-gray-400">
            {shipmentStatusData.map((s) => (
              <span key={s.name} className="flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded-full" style={{ background: s.color }}></span>
                {s.name}
              </span>
            ))}
          </div>
        </div>
        {/* Bar Chart */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 flex-1 shadow-sm">
          <div className="font-semibold text-slate-900 mb-2">Weekly Throughput <span className="text-xs text-slate-500">(units/day)</span></div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyThroughput}>
              <XAxis dataKey="day" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Bar dataKey="units" fill="#00c2b2" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Timeline */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="font-semibold text-slate-900 mb-4">Recent Activity</div>
        <div className="space-y-3">
          {timeline.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#00c2b2]" />
              <div>
                <span className="text-slate-900">{item.desc}</span>
                <span className="ml-2 text-xs text-slate-500">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}