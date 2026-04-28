import { Navigate, Route, Routes } from 'react-router-dom'
import InputPage from './components/InputPage'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<InputPage />} />
      <Route path="/input" element={<InputPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/home" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App