import React, { useState } from "react";
import { FaBoxes, FaTruck, FaMicrochip, FaChartBar, FaBell, FaDatabase } from "react-icons/fa";
import DashboardTab from "./DashboardTab";
import InventoryTab from "./InventoryTab";
import ShipmentsTab from "./ShipmentsTab";
import NanoTagsTab from "./NanoTagsTab";
import AnalyticsTab from "./AnalyticsTab";
import AlertsTab from "./AlertsTab";

const tabs = [
  { label: "Dashboard", icon: <FaDatabase /> },
  { label: "Inventory", icon: <FaBoxes /> },
  { label: "Shipments", icon: <FaTruck /> },
  { label: "NanoTags", icon: <FaMicrochip /> },
  { label: "AI Analytics", icon: <FaChartBar /> },
  { label: "Alerts", icon: <FaBell /> },
];

export default function BusinessTabs() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full mt-12">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(idx)}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl border font-semibold transition-all
              ${activeTab === idx
                ? "bg-white text-slate-900 border-teal-400 shadow-sm"
                : "bg-white text-slate-500 border-gray-200 hover:bg-slate-50 hover:text-slate-900"}
            `}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="w-full">
        {activeTab === 0 && <DashboardTab />}
        {activeTab === 1 && <InventoryTab />}
        {activeTab === 2 && <ShipmentsTab />}
        {activeTab === 3 && <NanoTagsTab />}
        {activeTab === 4 && <AnalyticsTab />}
        {activeTab === 5 && <AlertsTab />}
      </div>
    </div>
  );
}