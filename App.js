import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [ipAddress, setIpAddress] = useState('');
  const [ipData, setIpData] = useState(null);
  const [error, setError] = useState(null);

  const handleIpChange = (e) => {
    setIpAddress(e.target.value);
  };

  const fetchIpData = () => {
    if (!ipAddress) {
      setError('Please enter an IP address.');
      return;
    }

    // Set the error state to null before making the API request
    setError(null);

    axios
      .get(`https://ipinfo.io/${ipAddress}/json?token=46791078166e31`)
      .then((response) => {
        setIpData(response.data);
        // Automatically scroll to the result section
        window.scrollTo({
          top: document.getElementById('result-section').offsetTop,
          behavior: 'smooth',
        });
      })
      .catch((error) => {
        setError('Failed to fetch IP data. Please try again later.');
      });
  };

  return (
    <div className="app-container">
      {/* Project Heading */}
      <h1 className="project-heading">IP Address Information Finder</h1>

      {/* Input Section */}
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter IP Address"
          value={ipAddress}
          onChange={handleIpChange}
        />
        <button onClick={fetchIpData}>Search</button>
      </div>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* IP Data Result */}
      {ipData && (
        <div className="result-container" id="result-section">
          <h2>IP Address Information</h2>
          <p><strong>IP Address:</strong> {ipData.ip}</p>
          <p><strong>Location:</strong> {ipData.city}, {ipData.region}, {ipData.country}</p>
          <p><strong>Hostname:</strong> {ipData.hostname}</p>
          <p><strong>Organization:</strong> {ipData.org}</p>
        </div>
      )}
    </div>
  );
}

export default App;
