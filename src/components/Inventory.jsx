import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import '../App.css';

const inventoryData = [
  {sku:'SKU-ELC-0221',name:'Resistors 10kΩ',cat:'Electronics',stock:42,max:500,loc:'WH-1 Nagpur',status:'Low Stock',tag:'NT-0110'},
  {sku:'SKU-ELC-0442',name:'Capacitors 100µF',cat:'Electronics',stock:380,max:500,loc:'WH-1 Nagpur',status:'In Stock',tag:'NT-0111'},
  {sku:'SKU-PHA-0031',name:'Paracetamol 500mg',cat:'Pharma',stock:8420,max:10000,loc:'WH-3 Nagpur',status:'In Stock',tag:'NT-0892'},
  {sku:'SKU-PHA-0089',name:'Insulin Vials',cat:'Pharma',stock:192,max:1000,loc:'Cold WH-2',status:'Low Stock',tag:'NT-0201'},
  {sku:'SKU-FMG-0012',name:'Biscuit Pack 200g',cat:'FMCG',stock:15200,max:20000,loc:'WH-4 Mumbai',status:'In Stock',tag:'NT-0310'},
  {sku:'SKU-FMG-0033',name:'Shampoo 200ml',cat:'FMCG',stock:4100,max:5000,loc:'WH-4 Mumbai',status:'In Stock',tag:'NT-0312'},
  {sku:'SKU-IND-0055',name:'Steel Bolts M8',cat:'Industrial',stock:22000,max:25000,loc:'WH-5 Pune',status:'In Stock',tag:'NT-0401'},
  {sku:'SKU-IND-0088',name:'Hydraulic Seals',cat:'Industrial',stock:15,max:200,loc:'WH-5 Pune',status:'Critical',tag:'NT-0402'},
  {sku:'SKU-TEX-0021',name:'Cotton Fabric 40s',cat:'Textiles',stock:820,max:1000,loc:'WH-6 Surat',status:'In Stock',tag:'NT-0501'},
  {sku:'SKU-TEX-0044',name:'Polyester Blend',cat:'Textiles',stock:0,max:800,loc:'WH-6 Surat',status:'Out of Stock',tag:'—'},
  {sku:'SKU-ELC-0380',name:'Arduino Nano',cat:'Electronics',stock:234,max:300,loc:'WH-1 Nagpur',status:'In Stock',tag:'NT-1101'},
  {sku:'SKU-PHA-0120',name:'Vitamin D3 Strips',cat:'Pharma',stock:6200,max:8000,loc:'WH-3 Nagpur',status:'In Stock',tag:'NT-1203'},
];

const categories = ["All Categories", "Electronics", "Pharma", "FMCG", "Industrial", "Textiles"];

function statusBadge(status) {
  const m = {
    'In Stock': 'badge-green',
    'Low Stock': 'badge-amber',
    'Critical': 'badge-red',
    'Out of Stock': 'badge-red',
  };
  return <span className={`badge ${m[status] || 'badge-blue'}`}>{status}</span>;
}

export default function Inventory() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [qr, setQR] = useState(null);

  const filtered = inventoryData.filter(i =>
    (!filter || filter === 'All Categories' || i.cat === filter) &&
    (!search || i.sku.toLowerCase().includes(search.toLowerCase()) || i.name.toLowerCase().includes(search.toLowerCase()) || i.cat.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="app">
      <div className="card">
        <div className="card-title">Inventory Register <span style={{float:'right'}}>{filtered.length} items</span></div>
        <div className="search-bar">
          <input className="search-input" placeholder="Search SKU, product name, category..." value={search} onChange={e=>setSearch(e.target.value)} />
          <select className="filter-sel" value={filter} onChange={e=>setFilter(e.target.value)}>
            {categories.map(c=><option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>SKU</th><th>Product</th><th>Category</th><th>Stock</th><th>Location</th><th>Status</th><th>NanoTag</th></tr></thead>
            <tbody>
              {filtered.map(i => {
                const pct = Math.round(i.stock / i.max * 100);
                return <tr key={i.sku}>
                  <td style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--c-teal)'}}>{i.sku}</td>
                  <td style={{fontWeight:500}}>{i.name}</td>
                  <td><span className="chip">{i.cat}</span></td>
                  <td>
                    <div style={{fontWeight:500,fontSize:13}}>{i.stock.toLocaleString()}</div>
                    <div className="progress-bar" style={{width:80,marginTop:4}}><div className="progress-fill" style={{width:`${pct}%`,background:pct<20?'var(--c-red)':pct<40?'var(--c-amber)':'var(--c-teal)'}}></div></div>
                  </td>
                  <td style={{fontSize:12}}>{i.loc}</td>
                  <td>{statusBadge(i.status)}</td>
                  <td>{i.tag !== '—' ? <button className="qr-btn" onClick={()=>setQR(i)}>QR</button> : <span style={{color:'var(--c-mid)',fontSize:11}}>—</span>}</td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
      {qr && (
        <div className="qr-modal-overlay" onClick={()=>setQR(null)}>
          <div className="qr-modal" onClick={e=>e.stopPropagation()}>
            <button className="qr-modal-close" onClick={()=>setQR(null)}>✕</button>
            <h3 className="qr-modal-title">NanoTag QR</h3>
            <div className="qr-code-container">
              <QRCodeSVG value={`NanoTag: ${qr.tag}\nSKU: ${qr.sku}\nProduct: ${qr.name}\nLocation: ${qr.loc}\nStatus: ${qr.status}`} size={180} level="H" includeMargin={true} />
            </div>
            <div style={{fontSize:12,color:'var(--c-mid)',marginBottom:8,fontFamily:'var(--font-mono)'}}>Scan QR to view live tracking</div>
            <button className="qr-download-btn" onClick={()=>{
              const svg = document.querySelector('.qr-code-container svg');
              const svgData = new XMLSerializer().serializeToString(svg);
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              const img = new window.Image();
              const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
              const url = URL.createObjectURL(svgBlob);
              img.onload = () => {
                canvas.width = 200;
                canvas.height = 200;
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
                const pngUrl = canvas.toDataURL('image/png');
                const downloadLink = document.createElement('a');
                downloadLink.href = pngUrl;
                downloadLink.download = `NanoTag-${qr.tag||'QR'}.png`;
                downloadLink.click();
                URL.revokeObjectURL(url);
              };
              img.src = url;
            }}>Download QR Code</button>
          </div>
        </div>
      )}
    </div>
  );
}
