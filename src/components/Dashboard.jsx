
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import BusinessTabs from "./BusinessTabs"
import '../App.css'
import image1 from '../assets/images/Screenshot 2026-04-18 194456.png'
import image2 from '../assets/images/Screenshot 2026-04-18 194514.png'
import image3 from '../assets/images/Screenshot 2026-04-18 194633.png'
import image4 from '../assets/images/Screenshot 2026-04-18 194637.png'
import image5 from '../assets/images/Screenshot 2026-04-18 194700.png'

const scenarios = [
  {
    title: 'Baseline Routing',
    subtitle: 'Current live operations',
    metrics: {
      distance: '294 km',
      time: '6h 12m',
      resilience: '72%',
    },
    heatData: [
      [0.8, 0.9, 0.7, 0.6, 0.8],
      [0.7, 0.8, 0.5, 0.6, 0.9],
      [0.6, 0.4, 0.2, 0.3, 0.5],
      [0.8, 0.7, 0.6, 0.4, 0.6],
      [0.9, 0.8, 0.7, 0.5, 0.4],
    ],
    markers: [
      { left: '18%', top: '30%', color: 'green' },
      { left: '42%', top: '50%', color: 'red' },
      { left: '72%', top: '26%', color: 'green' },
    ],
    feed: 'Live routing is stable. No agent interventions yet.',
    narrative: 'No disruptions detected. Operations running at baseline efficiency.',
    radarData: {
      distance: 80,
      time: 70,
      load: 60,
      risk: 50,
    },
    confidence: [0.7, 0.75, 0.8, 0.85, 0.9],
  },
  {
    title: 'Optimized Routes',
    subtitle: 'AI-adjusted delivery plan',
    metrics: {
      distance: '228 km',
      time: '4h 55m',
      resilience: '86%',
    },
    heatData: [
      [0.6, 0.7, 0.4, 0.4, 0.5],
      [0.5, 0.6, 0.3, 0.4, 0.7],
      [0.4, 0.2, 0.1, 0.2, 0.3],
      [0.6, 0.5, 0.4, 0.2, 0.3],
      [0.7, 0.6, 0.5, 0.3, 0.2],
    ],
    markers: [
      { left: '24%', top: '22%', color: 'green' },
      { left: '55%', top: '38%', color: 'green' },
      { left: '80%', top: '55%', color: 'red' },
    ],
    feed: 'Optimization finished. Route efficiency improved by 18%.',
    narrative: 'Distance decreased by -66km, time reduced by -1h 17m. 2 vehicles rerouted.',
    radarData: {
      distance: 60,
      time: 50,
      load: 70,
      risk: 40,
    },
    confidence: [0.8, 0.82, 0.85, 0.88, 0.9],
  },
  {
    title: 'Disruption Simulation',
    subtitle: 'Traffic and delivery delay modeling',
    metrics: {
      distance: '245 km',
      time: '5h 40m',
      resilience: '78%',
    },
    heatData: [
      [0.9, 0.8, 0.7, 0.8, 0.9],
      [0.8, 0.7, 0.6, 0.7, 0.8],
      [0.7, 0.6, 0.5, 0.6, 0.7],
      [0.8, 0.7, 0.6, 0.5, 0.6],
      [0.9, 0.8, 0.7, 0.6, 0.5],
    ],
    markers: [
      { left: '18%', top: '32%', color: 'red' },
      { left: '40%', top: '60%', color: 'green' },
      { left: '72%', top: '28%', color: 'red' },
    ],
    feed: 'Disruption mode active. Agent recommends rerouting through lower-risk corridors.',
    narrative: 'Distance increased by +17km, time increased by +45m due to traffic disruption.',
    radarData: {
      distance: 90,
      time: 80,
      load: 50,
      risk: 90,
    },
    confidence: [0.6, 0.65, 0.7, 0.75, 0.8],
  },
  {
    title: 'Adaptive AI Forecast',
    subtitle: 'Predictive disruption analysis',
    metrics: {
      distance: '232 km',
      time: '5h 05m',
      resilience: '82%',
    },
    heatData: [
      [0.7, 0.6, 0.5, 0.5, 0.6],
      [0.6, 0.5, 0.3, 0.4, 0.6],
      [0.5, 0.3, 0.2, 0.3, 0.4],
      [0.6, 0.4, 0.3, 0.2, 0.3],
      [0.7, 0.5, 0.4, 0.3, 0.2],
    ],
    markers: [
      { left: '22%', top: '38%', color: 'green' },
      { left: '50%', top: '32%', color: 'red' },
      { left: '76%', top: '48%', color: 'green' },
    ],
    feed: 'Forecast suggests best inbound windows and minimal disruption risk.',
    narrative: 'Predicted distance +4km, time +10m if disruption occurs. Mitigation applied.',
    radarData: {
      distance: 75,
      time: 65,
      load: 55,
      risk: 60,
    },
    confidence: [0.75, 0.78, 0.82, 0.85, 0.88],
  },
  {
    title: 'Resilience Check',
    subtitle: 'Agent intelligence summary',
    metrics: {
      distance: '238 km',
      time: '5h 20m',
      resilience: '89%',
    },
    heatData: [
      [0.5, 0.4, 0.3, 0.3, 0.4],
      [0.4, 0.3, 0.2, 0.2, 0.4],
      [0.3, 0.2, 0.1, 0.2, 0.3],
      [0.4, 0.3, 0.2, 0.1, 0.2],
      [0.5, 0.4, 0.3, 0.2, 0.1],
    ],
    markers: [
      { left: '20%', top: '26%', color: 'green' },
      { left: '48%', top: '46%', color: 'red' },
      { left: '72%', top: '36%', color: 'green' },
    ],
    feed: 'Resilience metrics are strong. Agent recommends maintaining current route mix.',
    narrative: 'Overall resilience improved by +17%. System is robust to disruptions.',
    radarData: {
      distance: 70,
      time: 60,
      load: 80,
      risk: 30,
    },
    confidence: [0.85, 0.87, 0.89, 0.91, 0.93],
  },
]

const screenshots = [image1, image2, image3, image4, image5]

function Dashboard() {
  const navigate = useNavigate()
  const location = useLocation()
  const formData = location.state || {}
  const [activeIndex, setActiveIndex] = useState(0)
  const [fleetSize, setFleetSize] = useState(10)
  const [vehicleCapacity, setVehicleCapacity] = useState(500)
  const [disruption, setDisruption] = useState('None')
  const [showGeotag, setShowGeotag] = useState(false)
  const [showQR, setShowQR] = useState(false)
  const [qrData, setQRData] = useState(null)
  const active = scenarios[activeIndex]

  // Sample shipment data for QR codes
  const shipments = [
    { id: 'SHP-0384', origin: 'Nagpur', dest: 'Mumbai DC', carrier: 'BlueDart', units: 98, eta: 'Delivered', status: 'Delivered', tag: 'NT-0310' },
    { id: 'SHP-0391', origin: 'Pune', dest: 'Hyderabad', carrier: 'DTDC', units: 240, eta: 'Apr 28', status: 'In Transit', tag: 'NT-0401' },
    { id: 'SHP-0292', origin: 'Mumbai', dest: 'Delhi', carrier: 'FedEx', units: 500, eta: 'Apr 29', status: 'In Transit', tag: 'NT-0111' },
    { id: 'SHP-0291', origin: 'Nagpur', dest: 'Wardha', carrier: 'IndiaMart Logi', units: 80, eta: 'Apr 28 +delay', status: 'Delayed', tag: 'NT-0112' },
    { id: 'SHP-0288', origin: 'Surat', dest: 'Pune', carrier: 'Delhivery', units: 1200, eta: 'Apr 27', status: 'Processing', tag: '—' },
  ]

  const handleShowQR = (shipment) => {
    const qrContent = `SmartChain AI
Shipment: ${shipment.id}
From: ${shipment.origin}
To: ${shipment.dest}
Carrier: ${shipment.carrier}
Units: ${shipment.units}
ETA: ${shipment.eta}
Status: ${shipment.status}
Tag: ${shipment.tag}`
    setQRData({ ...shipment, qrContent })
    setShowQR(true)
  }

  const handleRunOptimization = () => {
    setActiveIndex(1)
  }

  const handleTriggerAgent = () => {
    setActiveIndex(2)
  }

  const downloadQR = () => {
    const svg = document.getElementById('qr-svg')
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg)
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
      const url = URL.createObjectURL(svgBlob)
      
      img.onload = () => {
        canvas.width = 200
        canvas.height = 200
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0)
        const pngUrl = canvas.toDataURL('image/png')
        const downloadLink = document.createElement('a')
        downloadLink.href = pngUrl
        downloadLink.download = `QR-${qrData?.id || 'Code'}.png`
        downloadLink.click()
        URL.revokeObjectURL(url)
      }
      img.src = url
    }
  }

  return (
    <div className="app">
      <div className="sidebar">
        <button className="secondary-button" onClick={() => navigate('/')}>
          Back to Input Form
        </button>
        <div className="sidebar-section">
          <label>Fleet Size</label>
          <input
            type="range"
            min="1"
            max="20"
            value={fleetSize}
            onChange={(e) => setFleetSize(Number(e.target.value))}
          />
          <div className="range-value">{fleetSize} trucks</div>
        </div>

        <div className="sidebar-section">
          <label>Vehicle Capacity</label>
          <input
            type="range"
            min="100"
            max="1200"
            value={vehicleCapacity}
            onChange={(e) => setVehicleCapacity(Number(e.target.value))}
          />
          <div className="range-value">{vehicleCapacity} units</div>
        </div>

        <div className="sidebar-section">
          <label>Simulate Disruption</label>
          <select value={disruption} onChange={(e) => setDisruption(e.target.value)}>
            <option>None</option>
            <option>Weather</option>
            <option>Traffic</option>
            <option>Fuel shortage</option>
          </select>
        </div>

        <button className="primary-button" onClick={handleRunOptimization}>Run Optimization</button>
        <button className="secondary-button" onClick={handleTriggerAgent}>Trigger Agent Analysis</button>
        <button className="secondary-button" onClick={() => setActiveIndex((activeIndex + 1) % scenarios.length)}>Rerouting</button>
        <button className="qr-button" onClick={() => setShowQR(true)}>Show QR Code</button>
      </div>

      <div className="main-canvas">
        <div className="column">
          <h3>Spatial & Topological Layer</h3>
          <div className="map-container">
            <img src={screenshots[activeIndex]} alt={active.title} className="map-image" onClick={() => setShowGeotag(!showGeotag)} />
            {active.markers.map((marker, index) => (
              <div
                key={index}
                className={`marker ${marker.color}`}
                style={{ left: marker.left, top: marker.top }}
              />
            ))}
          </div>
          {showGeotag && (
            <div className="geotag-info">
              <h4>Geotag Information</h4>
              <p><strong>Live Location:</strong> Latitude: 40.7128, Longitude: -74.0060</p>
              <p><strong>Vehicle Current Time:</strong> {new Date().toLocaleTimeString()}</p>
              <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
              <p><strong>Destination:</strong> {formData.destination || 'Not specified'}</p>
              <p><strong>Boarding Point:</strong> {formData.source || 'Not specified'}</p>
            </div>
          )}
          <div className="heatmap-summary">
            <h4>Dynamic Risk Heatmap</h4>
            <div className="heatmap-grid">
              {active.heatData.map((row, rowIndex) => (
                <div className="heatmap-row" key={rowIndex}>
                  {row.map((value, cellIndex) => (
                    <div
                      className="heat-cell"
                      key={cellIndex}
                      style={{
                        background:
                          value > 0.75
                            ? '#ef4444'
                            : value > 0.5
                            ? '#f97316'
                            : value > 0.3
                            ? '#facc15'
                            : '#22c55e',
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="column">
          <h3>Quantitative Optimization Layer</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="metric-card">
              <div className="metric-value">{active.metrics.distance}</div>
              <div className="metric-label">Total Distance</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">{active.metrics.time}</div>
              <div className="metric-label">Total Time</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">{active.metrics.resilience}</div>
              <div className="metric-label">Resilience Score</div>
            </div>
          </div>
          <div className="narrative">
            <strong>Counterfactual Narrative:</strong> {active.narrative}
          </div>
          <div className="radar-chart">
            <h4>Truck Utilization Snapshot</h4>
            {Object.entries(active.radarData).map(([key, value]) => (
              <div className="radar-row" key={key}>
                <span>{key}</span>
                <div className="radar-bar-track">
                  <div className="radar-bar" style={{ width: `${value}%` }} />
                </div>
                <span>{value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="column">
          <h3>Cognitive & Reasoning Layer</h3>
          <div className="terminal">
            {active.feed}
          </div>
          <div className="confidence-section">
            <div className="confidence-header">
              <h4>Confidence Timeline</h4>
              <span>{Math.round(active.confidence[active.confidence.length - 1] * 100)}%</span>
            </div>
            <div className="confidence-chart">
              {active.confidence.map((score, index) => (
                <div
                  key={index}
                  className="confidence-point"
                  style={{
                    height: `${score * 120 + 20}px`,
                    backgroundColor: score < 0.7 ? 'var(--color-red)' : 'var(--color-teal)',
                  }}
                />
              ))}
            </div>
            <div className="confidence-labels">
              {active.confidence.map((_, index) => (
                <span key={index}>{index + 1}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQR && (
        <div className="qr-modal-overlay" onClick={() => setShowQR(false)}>
          <div className="qr-modal" onClick={(e) => e.stopPropagation()}>
            <button className="qr-modal-close" onClick={() => setShowQR(false)}>✕</button>
            <h3 className="qr-modal-title">QR Code Generator</h3>
            <p className="qr-modal-subtitle">Select a shipment to generate QR code</p>
            
            <div className="qr-shipment-list">
              {shipments.map((shipment) => (
                <div 
                  key={shipment.id} 
                  className="qr-shipment-item"
                  onClick={() => handleShowQR(shipment)}
                >
                  <div className="qr-shipment-id">{shipment.id}</div>
                  <div className="qr-shipment-route">{shipment.origin} → {shipment.dest}</div>
                  <div className={`qr-shipment-status ${shipment.status.toLowerCase().replace(' ', '-')}`}>
                    {shipment.status}
                  </div>
                </div>
              ))}
            </div>

                 {qrData && (
            <div className="qr-display">
              <h4>QR Code for {qrData.id}</h4>

              <div className="qr-code-container">
                <QRCodeSVG
                  id="qr-svg"
                  value={qrData.qrContent}
                  size={180}
                  level={"H"}
                  includeMargin={true}
                />
              </div>

              <p className="qr-hint">Scan QR to view live tracking</p>

              <button
                className="qr-download-btn"
                onClick={downloadQR}
              >
                Download QR Code
              </button>
            </div>
          )}
        </div>
      </div>
    )}

    {/* NEW UI BELOW CURRENT DASHBOARD */}
    <div className="mt-10">
      <BusinessTabs />
    </div>

  </div>
)
}

export default Dashboard