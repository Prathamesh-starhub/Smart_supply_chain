import React from 'react';
import '../App.css';

const alertStats = [
  { label: 'Critical', value: 3, className: 'stat-card', color: 'var(--c-red)' },
  { label: 'Warning', value: 4, className: 'stat-card', color: 'var(--c-amber)' },
  { label: 'Info', value: 12, className: 'stat-card', color: 'var(--c-blue)' },
  { label: 'Resolved Today', value: 8, className: 'stat-card', color: 'var(--c-green)' },
];

const alerts = [
  {type:'danger',icon:'🔴',title:'Temperature excursion — NT-0892 (Paracetamol Batch)',sub:'Temp: 29.1°C (threshold: 25°C) · WH-3 Nagpur · Detected 2 hrs ago',time:'2 hr ago'},
  {type:'danger',icon:'🔴',title:'Stock critical — SKU-IND-0088 (Hydraulic Seals)',sub:'15 units remaining · Reorder point: 50 · Lead time: 7 days',time:'3 hr ago'},
  {type:'danger',icon:'🔴',title:'Shipment SHP-0291 significantly delayed',sub:'Route blocked near Wardha · ETA extended by 6 hrs · Customer notified',time:'4 hr ago'},
  {type:'warn',icon:'🟡',title:'Low stock — SKU-ELC-0221 (Resistors 10kΩ)',sub:'42 units · Reorder threshold: 100 · Auto-PO pending approval',time:'34 min ago'},
  {type:'warn',icon:'🟡',title:'Carrier SLA breach risk — SHP-0279',sub:'Current ETA 6:00 PM · SLA deadline 5:00 PM · Ekart logistics',time:'1 hr ago'},
  {type:'warn',icon:'🟡',title:'Supplier delivery delay — Tata Components',sub:'PO-2891 delayed 2 days · 500 units Capacitors affected',time:'6 hr ago'},
  {type:'warn',icon:'🟡',title:'Humidity high — Cold WH-2',sub:'Humidity: 78% (threshold: 70%) · Cooling unit check required',time:'8 hr ago'},
  {type:'info',icon:'🔵',title:'Demand forecast: spike expected for SKU-NAG-0442',sub:'AI predicts 340% demand increase in 72hrs based on market signals',time:'10 min ago'},
  {type:'info',icon:'🔵',title:'New supplier onboarded — Reliance Industries',sub:'3 SKUs mapped · First PO scheduled for May 2',time:'1 hr ago'},
];

export default function Alerts() {
  return (
    <div className="app">
      <div className="stats-grid" style={{marginBottom:12}}>
        {alertStats.map(stat => (
          <div className={stat.className} key={stat.label}>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-val" style={{color:stat.color}}>{stat.value}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="card-title">Active Alerts</div>
        <div id="alertsList">
          {alerts.map((a,i) => (
            <div className={`alert-row ${a.type}`} key={i}>
              <div className="alert-icon">{a.icon}</div>
              <div className="alert-body">
                <div className="alert-title">{a.title}</div>
                <div className="alert-sub">{a.sub} · {a.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
