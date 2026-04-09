import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import CreateListing from './pages/CreateListing';
import Marketplace from './pages/Marketplace';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <Navbar />
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route path="/marketplace" element={<Marketplace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
