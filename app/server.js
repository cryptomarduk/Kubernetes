const http = require('http');
const fs = require('fs');
const path = require('path');

// Read environment variables (for ConfigMap and Secrets)
const PORT = process.env.PORT || 3000;
const APP_COLOR = process.env.APP_COLOR || 'lightblue';
const API_KEY = process.env.API_KEY || 'default-api-key';

// Update HTML content
const updateHtml = () => {
  let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  
  // Replace background color with value from ConfigMap
  html = html.replace('{{APP_COLOR}}', APP_COLOR);
  
  // Show the last 4 characters of the secret API key
  const maskedKey = API_KEY.slice(0, -4).replace(/./g, '*') + API_KEY.slice(-4);
  html = html.replace('{{API_KEY}}', maskedKey);
  
  return html;
};

// Create server
const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  
  if (req.url === '/health') {
    // For Kubernetes liveness and readiness probes
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'healthy' }));
    return;
  }
  
  // Main page
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(updateHtml());
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Environment variables: APP_COLOR=${APP_COLOR}`);
  console.log(`API KEY (masked): ${API_KEY.slice(0, -4).replace(/./g, '*') + API_KEY.slice(-4)}`);
});
