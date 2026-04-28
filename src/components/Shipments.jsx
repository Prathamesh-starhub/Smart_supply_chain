import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import '../App.css';

const shipmentsData = [
  {id:'SHP-0384',origin:'Nagpur',dest:'Mumbai DC',carrier:'BlueDart',units:98,eta:'Delivered',status:'Delivered',tag:'NT-0310'},
  {id:'SHP-0391',origin:'Pune',dest:'Hyderabad',carrier:'DTDC',units:240,eta:'Apr 28',status:'In Transit',tag:'NT-0401'},
  {id:'SHP-0292',origin:'Mumbai',dest:'Delhi',carrier:'FedEx',units:500,eta:'Apr 29',status:'In Transit',tag:'NT-0111'},
  {id:'SHP-0291',origin:'Nagpur',dest:'Wardha',carrier:'IndiaMart Logi',units:80,eta:'Apr 28 +delay',status:'Delayed',tag:'NT-0112'},
  {id:'SHP-0288',origin:'Surat',dest:'Pune',carrier:'Delhivery',units:1200,eta:'Apr 27',status:'Processing',tag:'—'},
  {id:'SHP-0281',origin:'Delhi',dest:'Kolkata',carrier:'BlueDart',units:340,eta:'Delivered',status:'Delivered',tag:'NT-0501'},
  {id:'SHP-0279',origin:'Bengaluru',dest:'Chennai',carrier:'Ekart',units:600,eta:'Apr 27',status:'In Transit',tag:'NT-0312'},
  {id:'SHP-0271',origin:'Mumbai',dest:'Nagpur',carrier:'DTDC',units:192,eta:'Apr 27',status:'In Transit',tag:'NT-0201'},
  {id:'SHP-0265',origin:'Hyderabad',dest:'Visakhapatnam',carrier:'FedEx',units:90,eta:'Delivered',status:'Delivered',tag:'NT-0402'},
  {id:'SHP-0260',origin:'Nagpur',dest:'Bhopal',carrier:'Delhivery',units:420,eta:'Apr 29',status:'Processing',tag:'NT-1101'},
];

const statusBadge = (status) => {
  const m = {
    'In Transit': 'badge-teal',
    'Delivered': 'badge-green',
    'Processing': 'badge-blue',
    'Delayed': 'badge-red',
  };
  return <span className={`badge ${m[status] || 'badge-blue'}`}>{status}</span>;
};

export default function Shipments() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [qr, setQR] = useState(null);

  const filtered = shipmentsData.filter(s =>
    (!filter || s.status === filter) &&
    (!search || s.id.toLowerCase().includes(search.toLowerCase()) || s.dest.toLowerCase().includes(search.toLowerCase()) || s.carrier.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="app">
      <div className="card">
        <div className="card-title">Shipment Tracker <span style={{float:'right'}}>{filtered.length} records</span></div>
        <div className="search-bar">
          <input className="search-input" placeholder="Search shipment ID, destination, carrier..." value={search} onChange={e=>setSearch(e.target.value)} />
          <select className="filter-sel" value={filter} onChange={e=>setFilter(e.target.value)}>
            <option value="">All Status</option>
            <option>In Transit</option>
            <option>Delivered</option>
            <option>Processing</option>
            <option>Delayed</option>
          </select>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>ID</th><th>Origin → Dest</th><th>Carrier</th><th>Units</th><th>ETA</th><th>Status</th><th>NanoTag</th><th>QR</th></tr></thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id}>
                  <td style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--c-blue)'}}>{s.id}</td>
                  <td style={{fontSize:12}}>{s.origin} → {s.dest}</td>
                  <td style={{fontSize:12}}>{s.carrier}</td>
                  <td style={{fontWeight:500}}>{s.units}</td>
                  <td style={{fontSize:12,color:s.status==='Delayed'?'var(--c-red)':'var(--c-mid)'}}>{s.eta}</td>
                  <td>{statusBadge(s.status)}</td>
                  <td style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--c-teal)'}}>{s.tag}</td>
                  <td>{s.tag !== '—' ? <button className="qr-btn" onClick={()=>setQR(s)}>QR</button> : <span style={{color:'var(--c-mid)',fontSize:11}}>—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {qr && (
        <div className="qr-modal-overlay" onClick={()=>setQR(null)}>
          <div className="qr-modal" onClick={e=>e.stopPropagation()}>
            <button className="qr-modal-close" onClick={()=>setQR(null)}>✕</button>
            <h3 className="qr-modal-title">Shipment QR</h3>
            <div className="qr-code-container">
              <QRCodeSVG value={`Shipment: ${qr.id}\nFrom: ${qr.origin}\nTo: ${qr.dest}\nCarrier: ${qr.carrier}\nUnits: ${qr.units}\nStatus: ${qr.status}`} size={180} level="H" includeMargin={true} />
            </div>
            <div style={{fontSize:12,color:'var(--c-mid)',marginBottom:8,fontFamily:'var(--font-mono)'}}>Scan QR to view shipment</div>
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
                downloadLink.download = `Shipment-${qr.id||'QR'}.png`;
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
